'use client';

import {
  SectionHeading,
  SectionHeadingBody,
  SectionHeadingTagline,
  SectionHeadingTitle,
} from "@/components/shadcncraft/pro-marketing/section-heading";
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { zodResolver } from '@hookform/resolvers/zod';
import { Loader2, Check, AlertCircle } from 'lucide-react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import * as z from 'zod';
import { motion, AnimatePresence } from 'motion/react';

const contactFormSchema = z.object({
  name: z.string().min(2, {
    message: 'Name must be at least 2 characters.',
  }),
  email: z.string().email({
    message: 'Please enter a valid email address.',
  }),
  message: z
    .string()
    .min(10, {
      message: 'Message must be at least 10 characters.',
    })
    .max(1000, {
      message: 'Message must not exceed 1000 characters.',
    }),
});

type ContactFormValues = z.infer<typeof contactFormSchema>;

export default function ContactForm() {
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: '',
      email: '',
      message: '',
    },
  });

  const onSubmit = async (data: ContactFormValues) => {
    setStatus('submitting');

    try {
      const accessKey = process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY;
      
      let response;
      if (accessKey) {
        // Send directly client-side to bypass server-side Cloudflare blocks
        response = await fetch('https://api.web3forms.com/submit', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
          },
          body: JSON.stringify({
            access_key: accessKey,
            name: data.name,
            email: data.email,
            message: data.message,
            subject: 'New Contact Form Submission from Portfolio',
            from_name: 'Portfolio Contact Form',
          }),
        });
      } else {
        // Fallback to local API route
        response = await fetch('/api/contact', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            name: data.name,
            email: data.email,
            message: data.message,
          }),
        });
      }

      const result = await response.json();

      if (response.ok && (result.success !== false)) {
        setStatus('success');
        toast.success('Message sent successfully!');
        form.reset();
        setTimeout(() => setStatus('idle'), 3000);
      } else {
        setStatus('error');
        toast.error(
          result.message || result.error || 'Failed to send message. Please try again.',
        );
        setTimeout(() => setStatus('idle'), 3000);
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      setStatus('error');
      toast.error('Something went wrong. Please try again later.');
      setTimeout(() => setStatus('idle'), 3000);
    }
  };

  return (
    <section className="py-12 lg:py-20">
      <div className="mx-auto flex max-w-7xl flex-col gap-12 px-5 lg:gap-16 lg:px-8">
        {/* Section Heading */}
        <div className="mx-auto w-full max-w-md">
          <SectionHeading alignment="center">
            <SectionHeadingTagline>Get In Touch</SectionHeadingTagline>
            <SectionHeadingTitle>Let&apos;s Build Something Together</SectionHeadingTitle>
            <SectionHeadingBody>
              Available for full-time roles, freelance projects, collaborations, or just helping you build something cool.
            </SectionHeadingBody>
          </SectionHeading>
        </div>

        {/* Contact Form */}
        <div className="mx-auto w-full max-w-md">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-3" aria-label="Contact form">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem className="flex w-full flex-col gap-1.5 space-y-0">
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Joe Smith" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem className="flex w-full flex-col gap-1.5 space-y-0">
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="joe@example.com" type="email" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="message"
                render={({ field }) => (
                  <FormItem className="flex w-full flex-col gap-1.5 space-y-0">
                    <FormLabel>Message</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Hi, this is my message"
                        className="h-16 resize-none"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button
                type="submit"
                disabled={status === 'submitting'}
                className={`w-full cursor-pointer flex items-center justify-center gap-2 mt-2 transition-all duration-300 ${
                  status === 'success'
                    ? 'bg-green-600 hover:bg-green-600 text-white'
                    : status === 'error'
                    ? 'bg-red-600 hover:bg-red-600 text-white'
                    : ''
                }`}
              >
                <AnimatePresence mode="wait">
                  {status === 'submitting' && (
                    <motion.div
                      key="submitting"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="flex items-center gap-2"
                    >
                      <Loader2 className="h-4 w-4 animate-spin" />
                      Sending...
                    </motion.div>
                  )}
                  {status === 'success' && (
                    <motion.div
                      key="success"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.8 }}
                      className="flex items-center gap-2"
                    >
                      <Check className="h-4 w-4" />
                      Message Sent!
                    </motion.div>
                  )}
                  {status === 'error' && (
                    <motion.div
                      key="error"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.8 }}
                      className="flex items-center gap-2"
                    >
                      <AlertCircle className="h-4 w-4" />
                      Failed to Send
                    </motion.div>
                  )}
                  {status === 'idle' && (
                    <motion.span
                      key="idle"
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                    >
                      Send message
                    </motion.span>
                  )}
                </AnimatePresence>
              </Button>
            </form>
          </Form>
        </div>
      </div>
    </section>
  );
}
