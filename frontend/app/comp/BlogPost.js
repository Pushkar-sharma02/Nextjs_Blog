
import BlogCard from './BlogCard';
require('dotenv').config();
async function getPosts() {
  const res = await fetch('https://nextjs-blog-hbrf.onrender.com/api/posts', { cache: 'no-store' });
  if (!res.ok) {
    throw new Error('Failed to fetch posts');
  }
  return res.json();
}

export default async function BlogPosts() {
  const posts = await getPosts();

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {posts.map((post) => (
        <BlogCard key={post.id} post={post} />
      ))}
    </div>
  );
}