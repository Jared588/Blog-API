import { Link } from "react-router-dom";

function Header() {
  return (
    <header className="w-full border-b border-slate-600">
      <nav className="flex w-full p-6">
        <div className="flex gap-x-5">
          <Link className="text-2xl" to="/">
            Home
          </Link>
          <Link className="text-2xl" to="/posts">
            Posts
          </Link>
        </div>
      </nav>
    </header>
  );
}

export default Header;
