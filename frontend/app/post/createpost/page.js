
import CreatePostForm from '@/app/comp/CreatePostForm';

export default function CreatePost() {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Create New Post</h1>
      <CreatePostForm />
    </div>
  );
}