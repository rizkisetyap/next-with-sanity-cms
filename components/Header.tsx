/* eslint-disable @next/next/no-img-element */
import Link from 'next/link';

const Header = () => {
  return (
    <header className="flex justify-between items-center max-w-5xl mx-auto py-5">
      <div className="flex items-center">
        <Link href="/" passHref>
          <img
            src="/medium-logo.png"
            className="w-44 object-contain cursor-pointer"
            alt="logo"
          />
        </Link>
        <div className="hidden space-x-5 md:inline-flex items-center">
          {/*Tobe hidden on mobile*/}
          <Link href="#">
            <a className="link hov">About</a>
          </Link>
          <Link href="#">
            <a className="link hov">Contact</a>
          </Link>
          <Link href="#">
            <a className="link px-4 py-1 rounded-full text-white bg-green-600 hover:bg-white hover:text-green-600 border hover:border-green-600">
              Follow
            </a>
          </Link>
        </div>
      </div>
      <div className="flex space-x-5">
        <Link href="#">
          <a className="link text-green-600">Sign In</a>
        </Link>
        <Link href="#">
          <a className="link hov px-4 py-1 rounded-full text-green-600 border bg-white border-green-600 hover:bg-green-600 hover:text-white">
            Get started
          </a>
        </Link>
      </div>
    </header>
  );
};

export default Header;
