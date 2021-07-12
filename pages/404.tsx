import Link from 'next/link';
import Main from "../components/Main";
import Metatags from "../components/Metatags";

export default function Custom404() {
  return (
    <>
      <Metatags title="404" description="Page not found" />

      <Main>
        <h1 className="py-4 text-xl">404</h1>
        <p className="pt-4">The page you requested does not exist.</p>
        <p className="pt-4">
          <Link href="/">
            <a>Home</a>
          </Link>
        </p>
      </Main>
    </>
  );
}