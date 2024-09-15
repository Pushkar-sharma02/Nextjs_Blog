import { Button } from '@/components/ui/button'; // ShadCN button component
import Link from 'next/link'; // For linking to individual blog post pages
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import DeletePost from './DeletePost';

export default function BlogCard({ post }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{post.title}</CardTitle>
      </CardHeader>
      <CardContent>
        <p>{post.content.substring(0, 100)}...</p>
        <div className="mt-4 flex justify-between">
          <Link href={`/post/${post.id}`}>
            <Button variant="outline">View</Button>
          </Link>
          <Link href={`/post/edit/${post.id}`}>
            <Button variant="default">Edit</Button>
          </Link>
          <DeletePost postId={post.id} />
        </div>
      </CardContent>
    </Card>
  );
}