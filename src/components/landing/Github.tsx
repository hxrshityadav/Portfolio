'use client';

import { githubConfig } from '@/config/Github';
import { useTheme } from 'next-themes';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { useEffect, useState } from 'react';

import Container from '../common/Container';
import GithubIcon from '../svgs/Github';
import { Button } from '../ui/button';

const ActivityCalendar = dynamic(
  () => import('react-activity-calendar').then((mod) => mod.default),
  { ssr: false },
);

type ContributionItem = {
  date: string;
  count: number;
  level: 0 | 1 | 2 | 3 | 4;
};

type GitHubContributionResponse = {
  date: string;
  contributionCount: number;
  contributionLevel:
    | 'NONE'
    | 'FIRST_QUARTILE'
    | 'SECOND_QUARTILE'
    | 'THIRD_QUARTILE'
    | 'FOURTH_QUARTILE';
};

// Helper function to filter contributions to past year
function filterLastYear(contributions: ContributionItem[]): ContributionItem[] {
  const oneYearAgo = new Date();
  oneYearAgo.setFullYear(oneYearAgo.getFullYear() - 1);

  return contributions.filter((item) => {
    const itemDate = new Date(item.date);
    return itemDate >= oneYearAgo;
  });
}

export default function Github() {
  const [contributions, setContributions] = useState<ContributionItem[]>([]);
  const [totalContributions, setTotalContributions] = useState<number>(0);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const { theme } = useTheme();

  useEffect(() => {
    async function fetchData() {
      try {
        setIsLoading(true);
        const response = await fetch(
          `${githubConfig.apiUrl}/${githubConfig.username}.json`,
        );
        const data: { contributions?: unknown[] } = await response.json();

        if (data?.contributions && Array.isArray(data.contributions)) {
          const flattenedContributions = data.contributions.flat();

          const contributionLevelMap = {
            NONE: 0,
            FIRST_QUARTILE: 1,
            SECOND_QUARTILE: 2,
            THIRD_QUARTILE: 3,
            FOURTH_QUARTILE: 4,
          };

          const validContributions = flattenedContributions
            .filter(
              (item: unknown): item is GitHubContributionResponse =>
                typeof item === 'object' &&
                item !== null &&
                'date' in item &&
                'contributionCount' in item &&
                'contributionLevel' in item,
            )
            .map((item: GitHubContributionResponse) => ({
              date: String(item.date),
              count: Number(item.contributionCount || 0),
              level: (contributionLevelMap[
                item.contributionLevel as keyof typeof contributionLevelMap
              ] || 0) as ContributionItem['level'],
            }));

          if (validContributions.length > 0) {
            const total = validContributions.reduce(
              (sum, item) => sum + item.count,
              0,
            );
            setTotalContributions(total);

            const filteredContributions = filterLastYear(validContributions);
            setContributions(filteredContributions);
          } else {
            setHasError(true);
          }
        } else {
          setHasError(true);
        }
      } catch (err) {
        console.error('Failed to fetch GitHub contributions:', err);
        setHasError(true);
      } finally {
        setIsLoading(false);
      }
    }

    fetchData();
  }, []);

  return (
    <Container className="mt-16">
      {/* Header — just the title */}
      <h2 className="text-lg font-bold tracking-tight">
        {githubConfig.title}
      </h2>

      {/* Content */}
      <div className="mt-4">
        {isLoading ? (
          <div className="flex items-center justify-center rounded-lg border border-border bg-card p-10">
            <div className="text-center">
              <div className="border-foreground/20 mx-auto mb-3 h-6 w-6 animate-spin rounded-full border-2 border-t-foreground"></div>
              <p className="text-muted-foreground text-sm">
                {githubConfig.loadingState.description}
              </p>
            </div>
          </div>
        ) : hasError || contributions.length === 0 ? (
          <div className="text-muted-foreground rounded-lg border border-dashed border-border p-8 text-center">
            <div className="bg-muted mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full">
              <GithubIcon className="h-7 w-7" />
            </div>
            <p className="mb-1 text-sm font-medium">
              {githubConfig.errorState.title}
            </p>
            <p className="mb-4 text-xs">
              {githubConfig.errorState.description}
            </p>
            <Button variant="outline" size="sm" asChild>
              <Link
                href={`https://github.com/${githubConfig.username}`}
                className="inline-flex items-center gap-2"
              >
                <GithubIcon className="h-4 w-4" />
                {githubConfig.errorState.buttonText}
              </Link>
            </Button>
          </div>
        ) : (
          <div className="rounded-lg border border-border bg-card p-5">
            <div className="w-full [&_svg]:w-full [&_svg]:h-auto">
              <ActivityCalendar
                data={contributions}
                blockSize={12}
                blockMargin={4}
                blockRadius={6}
                fontSize={githubConfig.fontSize}
                colorScheme={theme === 'dark' ? 'dark' : 'light'}
                maxLevel={githubConfig.maxLevel}
                hideTotalCount={false}
                hideColorLegend={false}
                hideMonthLabels={false}
                theme={{
                  dark: [
                    'rgb(22, 27, 34)',
                    'rgb(14, 68, 41)',
                    'rgb(0, 109, 50)',
                    'rgb(38, 166, 65)',
                    'rgb(57, 211, 83)',
                  ],
                  light: [
                    'rgb(235, 237, 240)',
                    'rgb(155, 233, 168)',
                    'rgb(64, 196, 99)',
                    'rgb(48, 161, 78)',
                    'rgb(33, 110, 57)',
                  ],
                }}
                labels={{
                  months: githubConfig.months,
                  weekdays: githubConfig.weekdays,
                  totalCount: `${totalContributions.toLocaleString()} contributions in the last year`,
                }}
                style={{
                  color: theme === 'dark' ? 'rgb(139, 148, 158)' : 'rgb(100, 100, 100)',
                }}
              />
            </div>
          </div>
        )}
      </div>
    </Container>
  );
}
