
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

require('dotenv').config();

export default function EditPostForm({ post }) {
  const [title, setTitle] = useState(post.title);
  const [content, setContent] = useState(post.content);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch(`https://nextjs-blog-hbrf.onrender.com/api/posts/${post.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title, content }),
    });
    if (response.ok) {
      router.push(`/post/${post.id}`);
      router.refresh();
    } else {
      console.error('Failed to update post');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-4">
        <label htmlFor="title" className="block mb-2">Title</label>
        <Input
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </div>
      <div className="mb-4">
        <label htmlFor="content" className="block mb-2">Content</label>
        <Textarea
          id="content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
        />
      </div>
      <Button type="submit">Update Post</Button>
    </form>
  );
}