
import { Suspense } from 'react';
import BlogPosts from './comp/BlogPost';

export default function Home() {
  return (
    <main className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Recent Blog Posts</h1>
      <Suspense fallback={<div>Loading posts...</div>}>
        <BlogPosts />
      </Suspense>
    </main>
  );
}