'use client';

import { githubConfig } from '@/config/Github';
import { useTheme } from 'next-themes';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';

import Container from '../common/Container';
import GithubIcon from '../svgs/Github';
import { Button } from '../ui/button';

type ContributionDay = { date: string; count: number; level: 0 | 1 | 2 | 3 | 4 };
type APIItem = { date: string; contributionCount: number; contributionLevel: string };

const LEVEL_MAP = { NONE: 0, FIRST_QUARTILE: 1, SECOND_QUARTILE: 2, THIRD_QUARTILE: 3, FOURTH_QUARTILE: 4 } as const;
const MONTHS = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
const DAY_LABELS: Record<number, string> = { 1: 'Mon', 3: 'Wed', 5: 'Fri' };

const DARK  = ['#161b22','#0e4429','#006d32','#26a641','#39d353'];
const LIGHT = ['#ebedf0','#9be9a8','#40c463','#30a14e','#216e39'];

/** Group a flat sorted array of days into week columns (Sun=0) */
function buildGrid(days: ContributionDay[]): (ContributionDay | null)[][] {
  if (!days.length) return [];
  const map = new Map(days.map(d => [d.date, d]));

  // Align to previous Sunday
  const start = new Date(days[0].date + 'T00:00:00');
  start.setDate(start.getDate() - start.getDay());

  const end = new Date(days[days.length - 1].date + 'T00:00:00');
  end.setDate(end.getDate() + (6 - end.getDay())); // align to Saturday

  const weeks: (ContributionDay | null)[][] = [];
  let week: (ContributionDay | null)[] = [];
  const cur = new Date(start);

  while (cur <= end) {
    const iso = cur.toISOString().split('T')[0];
    week.push(map.get(iso) ?? null);
    if (cur.getDay() === 6) { weeks.push(week); week = []; }
    cur.setDate(cur.getDate() + 1);
  }
  return weeks;
}

function filterLastYear(days: ContributionDay[]) {
  const cutoff = new Date();
  cutoff.setFullYear(cutoff.getFullYear() - 1);
  return days.filter(d => new Date(d.date + 'T00:00:00') >= cutoff);
}

export default function Github() {
  const [days, setDays]   = useState<ContributionDay[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError]     = useState(false);
  const { resolvedTheme } = useTheme();

  const [tip, setTip] = useState({ show: false, text: '', x: 0, y: 0 });
  const svgRef = useRef<SVGSVGElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);

  // Fetch
  useEffect(() => {
    (async () => {
      try {
        const res  = await fetch(`${githubConfig.apiUrl}/${githubConfig.username}.json`);
        const data = await res.json() as { contributions?: unknown[] };
        const flat = (data.contributions ?? []).flat() as APIItem[];
        const valid = flat.filter(i => i?.date && i?.contributionLevel).map(i => ({
          date:  i.date,
          count: i.contributionCount ?? 0,
          level: (LEVEL_MAP[i.contributionLevel as keyof typeof LEVEL_MAP] ?? 0) as ContributionDay['level'],
        }));
        if (!valid.length) { setError(true); return; }
        setTotal(valid.reduce((s, d) => s + d.count, 0));
        setDays(filterLastYear(valid));
      } catch { setError(true); }
      finally  { setLoading(false); }
    })();
  }, []);

  const grid   = buildGrid(days);
  const colors = resolvedTheme === 'dark' ? DARK : LIGHT;
  const label  = resolvedTheme === 'dark' ? 'rgba(255,255,255,0.4)' : 'rgba(0,0,0,0.45)';

  // SVG coordinate constants
  const GAP = 3;
  const CELL = 13;
  const DAY_W = 28;       // width reserved for Mon/Wed/Fri labels
  const MONTH_H = 18;     // height reserved for month labels
  const COLS = grid.length;
  const SVG_W = DAY_W + COLS * (CELL + GAP) - GAP;
  const SVG_H = MONTH_H + 7 * (CELL + GAP) - GAP;

  // Month label positions
  const monthLabels: { text: string; x: number }[] = [];
  let lastMonth = -1;
  grid.forEach((week, wi) => {
    const first = week.find(Boolean);
    if (!first) return;
    const m = new Date(first.date + 'T00:00:00').getMonth();
    if (m !== lastMonth) {
      monthLabels.push({ text: MONTHS[m], x: DAY_W + wi * (CELL + GAP) });
      lastMonth = m;
    }
  });

  function onEnter(e: React.MouseEvent<SVGRectElement>, day: ContributionDay) {
    const rect = (e.target as SVGRectElement).getBoundingClientRect();
    const wrap = wrapRef.current!.getBoundingClientRect();
    const d    = new Date(day.date + 'T00:00:00');
    const fmt  = d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
    setTip({
      show: true,
      text: `${day.count} contribution${day.count !== 1 ? 's' : ''} on ${fmt}`,
      x: rect.left - wrap.left + rect.width / 2,
      y: rect.top  - wrap.top,
    });
  }

  return (
    <Container className="mt-16">
      {loading ? (
        <div className="flex justify-center py-10">
          <div className="h-5 w-5 animate-spin rounded-full border-2 border-foreground/20 border-t-foreground" />
        </div>
      ) : error || !days.length ? (
        <div className="rounded-lg border border-dashed border-border p-8 text-center text-muted-foreground">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-muted">
            <GithubIcon className="h-7 w-7" />
          </div>
          <p className="mb-1 text-sm font-medium">{githubConfig.errorState.title}</p>
          <p className="mb-4 text-xs">{githubConfig.errorState.description}</p>
          <Button variant="outline" size="sm" asChild>
            <Link href={`https://github.com/${githubConfig.username}`} className="inline-flex items-center gap-2">
              <GithubIcon className="h-4 w-4" /> {githubConfig.errorState.buttonText}
            </Link>
          </Button>
        </div>
      ) : (
        /* Bordered card — matches Nikhil Bhima's layout */
        <div className="rounded-xl border border-border p-5">
          {/* Card header: label + count */}
          <div className="mb-4 flex flex-wrap items-baseline gap-x-2 gap-y-1">
            <span className="text-xs font-medium uppercase tracking-widest text-muted-foreground">
              GitHub Activity
            </span>
            <span className="text-muted-foreground/40">·</span>
            <span className="text-sm">
              <span className="font-bold text-foreground">{total.toLocaleString()}</span>{' '}
              <span className="text-muted-foreground">contributions in the last year</span>
            </span>
          </div>

          {/* Responsive SVG calendar */}
          <div ref={wrapRef} className="relative w-full">
            {tip.show && (
              <div
                className="pointer-events-none absolute z-50 whitespace-nowrap -translate-x-1/2 -translate-y-full rounded-md border border-border bg-popover px-2.5 py-1.5 text-xs font-medium text-popover-foreground shadow-md"
                style={{ left: tip.x, top: tip.y - 8 }}
              >
                {tip.text}
              </div>
            )}

            <svg
              ref={svgRef}
              width="100%"
              viewBox={`0 0 ${SVG_W} ${SVG_H}`}
              preserveAspectRatio="xMinYMid meet"
            >
              {/* Month labels */}
              {monthLabels.map(({ text, x }) => (
                <text key={`${text}-${x}`} x={x} y={12} fontSize={10} fill={label} fontFamily="inherit">
                  {text}
                </text>
              ))}

              {/* Day label column + cells */}
              {[0,1,2,3,4,5,6].map(dow => {
                const cy = MONTH_H + dow * (CELL + GAP);
                return (
                  <g key={dow}>
                    {DAY_LABELS[dow] && (
                      <text
                        x={DAY_W - 4}
                        y={cy + CELL / 2 + 3.5}
                        fontSize={10}
                        fill={label}
                        textAnchor="end"
                        fontFamily="inherit"
                      >
                        {DAY_LABELS[dow]}
                      </text>
                    )}
                    {grid.map((week, wi) => {
                      const day = week[dow];
                      const cx  = DAY_W + wi * (CELL + GAP);
                      return (
                        <rect
                          key={wi}
                          x={cx} y={cy}
                          width={CELL} height={CELL}
                          rx={2} ry={2}
                          fill={day ? colors[day.level] : colors[0]}
                          onMouseEnter={day ? e => onEnter(e, day) : undefined}
                          onMouseLeave={() => setTip(t => ({ ...t, show: false }))}
                          style={{ cursor: day?.count ? 'pointer' : 'default' }}
                        />
                      );
                    })}
                  </g>
                );
              })}
            </svg>
          </div>
        </div>
      )}
    </Container>
  );
}
