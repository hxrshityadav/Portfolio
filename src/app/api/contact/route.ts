import { NextRequest, NextResponse } from 'next/server';
import * as z from 'zod';

const rateLimitStore = new Map<string, { count: number; resetTime: number }>();

const RATE_LIMIT_WINDOW = 60 * 1000;
const RATE_LIMIT_MAX_REQUESTS = 5;

const contactSchema = z.object({
  name: z.string().min(2).max(100),
  email: z.string().email(),
  phone: z.string().max(20).optional().or(z.literal('')),
  subject: z.string().max(100).optional().or(z.literal('')),
  message: z.string().min(10).max(1000),
});

function getClientIP(request: NextRequest): string {
  // Get IP from various headers in order of preference
  const forwarded = request.headers.get('x-forwarded-for');
  const realIP = request.headers.get('x-real-ip');
  const cfConnectingIP = request.headers.get('cf-connecting-ip');

  if (forwarded) {
    return forwarded.split(',')[0].trim();
  }
  if (realIP) {
    return realIP;
  }
  if (cfConnectingIP) {
    return cfConnectingIP;
  }

  return 'unknown';
}

function checkRateLimit(clientIP: string): {
  allowed: boolean;
  remaining: number;
} {
  const now = Date.now();
  const clientData = rateLimitStore.get(clientIP);

  if (!clientData || now > clientData.resetTime) {
    // First request or window expired
    rateLimitStore.set(clientIP, {
      count: 1,
      resetTime: now + RATE_LIMIT_WINDOW,
    });
    return { allowed: true, remaining: RATE_LIMIT_MAX_REQUESTS - 1 };
  }

  if (clientData.count >= RATE_LIMIT_MAX_REQUESTS) {
    return { allowed: false, remaining: 0 };
  }

  // Increment count
  clientData.count++;
  rateLimitStore.set(clientIP, clientData);

  return {
    allowed: true,
    remaining: RATE_LIMIT_MAX_REQUESTS - clientData.count,
  };
}

export async function POST(request: NextRequest) {
  try {
    const clientIP = getClientIP(request);
    const rateLimit = checkRateLimit(clientIP);

    if (!rateLimit.allowed) {
      return NextResponse.json(
        {
          error: 'Too many requests. Please try again later.',
          retryAfter: RATE_LIMIT_WINDOW / 1000,
        },
        {
          status: 429,
          headers: {
            'X-RateLimit-Limit': RATE_LIMIT_MAX_REQUESTS.toString(),
            'X-RateLimit-Remaining': rateLimit.remaining.toString(),
            'X-RateLimit-Reset': (Date.now() + RATE_LIMIT_WINDOW).toString(),
          },
        },
      );
    }

    const body = await request.json();
    const validatedData = contactSchema.parse(body);

    console.log('New Contact Submission:', {
      ...validatedData,
      clientIP,
      submittedAt: new Date().toISOString(),
    });

    const web3formsAccessKey = process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY || process.env.WEB3FORMS_ACCESS_KEY;
    const telegramBotToken = process.env.TELEGRAM_BOT_TOKEN;
    const telegramChatId = process.env.TELEGRAM_CHAT_ID;

    let deliverySuccess = false;

    // 1. Deliver via Web3Forms (Email)
    if (web3formsAccessKey) {
      try {
        const responseWeb3 = await fetch('https://api.web3forms.com/submit', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
          },
          body: JSON.stringify({
            access_key: web3formsAccessKey,
            name: validatedData.name,
            email: validatedData.email,
            message: validatedData.message,
            subject: 'New Contact Form Submission from Portfolio',
            from_name: 'Portfolio Contact Form',
          }),
        });

        const responseText = await responseWeb3.text();
        let web3Result;
        try {
          web3Result = JSON.parse(responseText);
        } catch {
          console.error('Web3Forms returned non-JSON response:', responseText);
          throw new Error('Web3Forms response was not JSON');
        }

        if (web3Result.success) {
          deliverySuccess = true;
        } else {
          console.error('Web3Forms delivery failed:', web3Result);
        }
      } catch (err) {
        console.error('Error sending to Web3Forms:', err);
      }
    }

    // 2. Deliver via Telegram (Optional backup/alternative)
    if (telegramBotToken && telegramChatId) {
      try {
        const text = `📬 *New Contact Submission*\n\n*Name:* ${validatedData.name}\n*Email:* ${validatedData.email}\n*Message:* ${validatedData.message}`;
        const responseTG = await fetch(
          `https://api.telegram.org/bot${telegramBotToken}/sendMessage`,
          {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              chat_id: telegramChatId,
              text: text,
              parse_mode: 'Markdown',
            }),
          },
        );
        const tgResult = await responseTG.json();
        if (tgResult.ok) {
          deliverySuccess = true;
        } else {
          console.error('Telegram delivery failed:', tgResult);
        }
      } catch (err) {
        console.error('Error sending to Telegram:', err);
      }
    }

    if (!web3formsAccessKey && !telegramBotToken) {
      return NextResponse.json(
        {
          error:
            'Contact form is not configured yet. Please set WEB3FORMS_ACCESS_KEY in your environment to receive emails.',
          success: false,
        },
        { status: 501 },
      );
    }

    if (!deliverySuccess) {
      return NextResponse.json(
        {
          error: 'Failed to send message. Please try again.',
          success: false,
        },
        { status: 500 },
      );
    }

    return NextResponse.json(
      {
        message: 'Message sent successfully!',
        success: true,
      },
      {
        headers: {
          'X-RateLimit-Limit': RATE_LIMIT_MAX_REQUESTS.toString(),
          'X-RateLimit-Remaining': rateLimit.remaining.toString(),
        },
      },
    );
  } catch (error) {
    console.error('API Error:', error);

    if (error instanceof z.ZodError) {
      return NextResponse.json(
        {
          error: 'Invalid form data',
          details: error.errors,
        },
        { status: 400 },
      );
    }

    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 },
    );
  }
}

export async function GET() {
  return NextResponse.json({ error: 'Method not allowed' }, { status: 405 });
}
