
import Link from 'next/link';
import { Button } from '@/components/ui/button';

const Header = () => {
  return (
    <header className="bg-gray-800 p-4 shadow-md">
      <nav className="flex justify-between items-center max-w-7xl mx-auto">
        <div>
          <Link href="/" className="text-white text-3xl font-bold hover:text-gray-300 transition-colors">
            Blog Platform
          </Link>
        </div>
        <div>
          <Link href="/post/createpost" passHref>
            <Button variant="default" className="bg-blue-600 hover:bg-blue-700 text-white">
              Create New Post
            </Button>
          </Link>
        </div>
      </nav>
    </header>
  );
};

export default Header;