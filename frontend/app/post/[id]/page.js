
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
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

export default async function ViewPost({ params }) {
  const post = await getPost(params.id);

  if (!post) {
    notFound();
  }

  return (
    <div className="container mx-auto p-4">
      <Card className="mb-4">
        <CardHeader>
          <CardTitle>{post.title}</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="whitespace-pre-wrap">{post.content}</p>
        </CardContent>
      </Card>
      <div className="flex justify-between">
        <Link href="/">
          <Button variant="outline">Back to Home</Button>
        </Link>
        <Link href={`/post/edit/${post.id}`}>
          <Button variant="default">Edit Post</Button>
        </Link>
      </div>
    </div>
  );
}