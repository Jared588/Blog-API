import { Link } from "react-router-dom";

function Header() {
  return (
    <header className="w-full border-b border-slate-600 text-indigo-500">
      <nav className="flex w-full p-6">
        <div className="flex gap-x-5">
          <Link className="text-2xl" to="/posts">
            View Posts
          </Link>
          <Link className="text-2xl" to="/posts/new">
            Create Post
          </Link>
        </div>
      </nav>
    </header>
  );
}

export default Header;
