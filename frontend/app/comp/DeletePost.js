'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

export default function DeletePost({ postId }) {
  const [open, setOpen] = useState(false);
  const router = useRouter();

  require('dotenv').config();

  const deletePost = async () => {
    const res = await fetch(`https://nextjs-blog-hbrf.onrender.com/api/posts/${postId}`, { method: 'DELETE' });
    if (res.ok) {
      setOpen(false);
      router.refresh();
    } else {
      console.error('Failed to delete post');
    }
  };

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild>
        <Button variant="destructive">Delete</Button>
      </AlertDialogTrigger>
      <AlertDialogContent 
        className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 max-h-[90vh] overflow-y-auto bg-white text-gray-900 shadow-lg rounded-lg p-6"
        style={{
          backgroundColor: '#2c3e50',  // Darker background
          color: '#ecf0f1',            // Light text for contrast
          border: '1px solid #34495e', 
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)' // Shadow effect
        }}
      >
        <AlertDialogHeader>
          <AlertDialogTitle className="text-xl font-semibold">Are you sure?</AlertDialogTitle>
          <AlertDialogDescription className="text-sm text-gray-300">
            This action cannot be undone. This will permanently delete the post.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter className="mt-4">
          <AlertDialogCancel asChild>
            <Button className="bg-gray-500 hover:bg-gray-600 text-white">Cancel</Button>
          </AlertDialogCancel>
          <AlertDialogAction asChild>
            <Button onClick={deletePost} className="bg-red-600 hover:bg-red-700 text-white">
              Delete
            </Button>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
