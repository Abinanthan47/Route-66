import { SignInButton, UserButton, useUser } from '@clerk/clerk-react';
import { useState } from "react";
import { Link } from 'react-router-dom';
import { Button } from './components/ui/button';

const Links = [
  { text: "Home", href: "/" },
  { text: "Listing", href: "/profile" },
  { text: "Collection", href: "/collection" },
  { text: "Profile", href: "/profile" },
];

const Logo = () => {
  return (
    <Link to="/" className="flex justify-center items-center gap-x-1 group">
      <img src="/logo1.png" alt="Route66" className="h-10" />
      <span className="text-lg sm:text-xl font-semibold text-black">
        Route-66
      </span>
    </Link>
  );
};

const NavBarLink = ({ text, link }) => {
  return (
    <Link
      to={link}
      className="px-6 font-medium text-md  hover:text-gray-600 transition-colors"
    >
      {text}
    </Link>
  );
};

const MobileMenu = ({ isOpen, setIsOpen, isSignedIn }) => {
  return (
    <div className="xl:hidden">
      <button onClick={() => setIsOpen(!isOpen)} className="text-black p-2">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d={isOpen
              ? "M6 18L18 6M6 6l12 12"
              : "M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
            }
          />
        </svg>
      </button>

      {isOpen && (
        <div className="absolute top-full left-0 p-4 right-0 bg-white shadow-lg rounded-b-lg  ">
          <div className="flex flex-col gap-4">
            {Links.map((item, index) => (
              <Link
                to={item.href}
                key={index}
                className="text-black hover:text-gray-600 transition-colors"
                onClick={() => setIsOpen(false)}
              >
                {item.text}
              </Link>
            ))}
            {isSignedIn ? (
              <Link to="/profile">
                <Button className="w-full bg-[#F4CB01] text-black hover:bg-[#F4CB01]/80">
                  Submit Listing
                </Button>
              </Link>
            ) : (
              <SignInButton mode="modal">
                <Button className="w-full">Sign In</Button>
              </SignInButton>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

function Header() {
  const { isSignedIn } = useUser();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className=" top-0 z-50 w-full p-3 items-center text-center  shadow-sm">
      <div className=" max-w-7xl mx-auto ">
        <div className="flex items-center justify-between">
          <Logo />

          <nav className="hidden xl:flex border border-black rounded-full py-2 items-center gap-x-2">
            {Links.map((item, index) => (
              <NavBarLink key={index} text={item.text} link={item.href} />
            ))}
          </nav>

          <div className="hidden xl:flex items-center gap-x-4">
            {isSignedIn ? (
              <>
                <UserButton />
                <Link to="/profile">
                  <Button className="bg-[#F4CB01] text-black hover:bg-[#F4CB01]/80">
                    Submit Listing
                  </Button>
                </Link>
              </>
            ) : (
              <SignInButton mode="modal">
                <Button variant="secondary "className='bg-amber-400 text-black border-black border'>Sign In</Button>
              </SignInButton>
            )}
          </div>

          <MobileMenu isOpen={isOpen} setIsOpen={setIsOpen} isSignedIn={isSignedIn} />
        </div>
      </div>
    </header>
  );
}

export default Header;