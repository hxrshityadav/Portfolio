import { getPublishedBlogPosts } from '@/lib/blog';
import { Link } from 'next-view-transitions';
import React from 'react';

import Container from '../common/Container';
import ArrowRight from '../svgs/ArrowRight';
import Calender from '../svgs/Calender';
import { Button } from '../ui/button';

export default function Blog() {
  const posts = getPublishedBlogPosts();

  return (
    <Container className="mt-16">
      <h2 className="text-lg font-bold tracking-tight">Blog</h2>
      <div className="mt-3 divide-y divide-border">
        {posts.slice(0, 3).map((post) => {
          const formattedDate = new Date(
            post.frontmatter.date,
          ).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          });

          return (
            <div
              key={post.slug}
              className="group flex flex-col gap-2 py-4 sm:flex-row sm:items-start sm:justify-between"
            >
              {/* Left: Title + Description + Date */}
              <div className="flex-1 min-w-0">
                <Link href={`/blog/${post.slug}`}>
                  <h3 className="text-sm font-semibold leading-snug group-hover:underline group-hover:underline-offset-4">
                    {post.frontmatter.title}
                  </h3>
                </Link>
                <p className="text-muted-foreground mt-1 line-clamp-1 text-sm">
                  {post.frontmatter.description}
                </p>
                <time
                  className="text-muted-foreground mt-1.5 flex items-center gap-1.5 text-xs"
                  dateTime={post.frontmatter.date}
                >
                  <Calender className="size-3" />
                  {formattedDate}
                </time>
              </div>

              {/* Right: Read more */}
              <Link
                href={`/blog/${post.slug}`}
                className="text-muted-foreground flex shrink-0 items-center gap-1 text-sm transition-colors hover:text-foreground sm:ml-4 sm:mt-0"
              >
                Read more <ArrowRight className="size-3.5" />
              </Link>
            </div>
          );
        })}
      </div>
      <div className="mt-4 flex justify-center">
        <Button variant="outline" size="sm" className="text-xs">
          <Link href="/blog">Show all blogs</Link>
        </Button>
      </div>
    </Container>
  );
}
