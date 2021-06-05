import Link from 'next/link';
import { useRouter } from 'next/router';
import { useContext } from 'react';
import { UserContext } from '../lib/Context';
import { auth } from '../lib/Firebase';

// Top navbar
export default function Navbar() {
  const { user, username } = useContext(UserContext);

  const router = useRouter();

  const signOut =  () => {
    auth.signOut();
    router.reload();
  }

  return (
    <nav className="container mx-auto shadow flex items-center justify-between bg-white py-2 px-4 mb-4 max-w-5xl">
      <Link href="/">
        <button className="text-3xl font-semibold pl-2" style={{
          marginTop: "-4px"
        }}>
          Experiment Configurator
        </button>
      </Link>

      <div>
        {/* user is signed-in and has username */}
        {username && (
          <>
            <button onClick={signOut} className="p-4 border border-black mr-4">Sign Out</button>
            <Link href="/admin">
              <button className="p-4 text-white bg-primary-500 mr-4">My Experiments</button>
            </Link>
            <Link href={`/${username}`}>
              <img className="inline-block h-12 w-12 rounded-full" src={user?.photoURL || '/hacker.png'} />
            </Link>
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