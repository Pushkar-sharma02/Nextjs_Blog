import { notFound } from 'next/navigation';
import EditPostForm from '@/app/comp/EditPostForm';
require('dotenv').config();

async function getPost(id) {
  try {
    const res = await fetch(`https://nextjs-blog-hbrf.onrender.com/api/posts/${id}`, { 
      cache: 'no-store',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!res.ok) {
      if (res.status === 404) {
        return null;
      }
      throw new Error(`HTTP error! status: ${res.status}`);
    }

    return await res.json();
  } catch (error) {
    console.error("Failed to fetch post:", error);
    return null;
  }
}

export default function EditPost({ params }) {
  return <EditPostContent params={params} />;
}

async function EditPostContent({ params }) {
  const post = await getPost(params.id);

  if (!post) {
    notFound();
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Edit Post</h1>
      <EditPostForm post={post} />
    </div>
  );
}