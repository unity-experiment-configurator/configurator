import classNames from 'classnames';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useContext, useRef, useState } from 'react';
import { UserContext } from '../lib/Context';
import { auth } from '../lib/Firebase';
import { useOnClickOutside } from '../lib/Hooks';

// Top navbar
export default function Navbar() {
  const { user, username } = useContext(UserContext);

  const router = useRouter();

  const signOut =  () => {
    auth.signOut();
    router.reload();
  }

  router.events?.on("routeChangeStart", () => {
    setProfileMenuOpen(false);
  });

  const profileMenuRef = useRef();
  const [isProfileMenuOpen, setProfileMenuOpen] = useState(false);
  useOnClickOutside(profileMenuRef, () => setProfileMenuOpen(false));
  
  return (
    <nav className="container mx-auto shadow flex items-center justify-between bg-white py-2 px-4 mb-4 max-w-5xl">
      <Link href="/">
        <button className="text-3xl pl-2" style={{
          marginTop: "-4px"
        }}>
          <span className="block md:hidden">UXC</span>
          <span className="hidden md:block">Unity Experiment Configurator</span>
        </button>
      </Link>

      <div className="flex">
        {/* user is signed-in and has username */}
        {username && (
          <>
            <Link href="/admin">
              <button className="inline-block p-2 md:p-4 text-white bg-primary-500 mr-4">My Experiments</button>
            </Link>
            <div ref={profileMenuRef} className="inline-block relative">
              <div>
                <button type="button" className="flex text-sm focus:outline-none" id="user-menu-button" aria-expanded="false" aria-haspopup="true">
                  <span className="sr-only">Open user menu</span>
                  <img onClick={() => {
                    setProfileMenuOpen(!isProfileMenuOpen);
                  }} className="inline-block h-10 w-10 md:h-14 md:w-14 rounded-full" src={user?.photoURL || '/hacker.png'} /> 
                </button>
              </div>
              <div className={classNames("origin-top-right absolute right-0 mt-2 w-48 shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none", {
                "hidden": !isProfileMenuOpen
              })} role="menu" aria-orientation="vertical" aria-labelledby="user-menu-button" tabIndex={-1}>
                <Link href={`/${username}`}>
                  <a href="#" className="block px-4 py-2 text-sm text-gray-700" role="menuitem" tabIndex={-1} id="user-menu-item-0">Your Profile</a>
                </Link>
                <a href="#" onClick={signOut} className="block px-4 py-2 text-sm text-gray-700" role="menuitem" tabIndex={-1} id="user-menu-item-2">Sign out</a>
              </div>
            </div>
          </>
        )}

        {/* user is not signed OR has not created username */}
        {!username && (
          <Link href="/enter">
            <button className="p-4 text-white bg-primary-500">Sign in</button>
          </Link>
        )}
      </div>
    </nav>
  );
}