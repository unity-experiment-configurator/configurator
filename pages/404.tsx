import Link from 'next/link';
import Message from '../components/Message';
import Footer from "../components/Footer";
import NavMenu from "../components/NavMenu";
import Metatags from "../components/Metatags";

export default function Custom404() {
  return (
    <>
      <Metatags title="404" description="Page not found" />

      <NavMenu />

      <section id="404" className="py-16">
        <div className="container mx-auto flex flex-wrap px-8 py-16">
          <Message>
            <h1>404</h1>
            <p className="pt-4">The page you requested does not exist.</p>
            <p className="pt-4">
              <Link href="/">
                <a>Home</a>
              </Link>
            </p>
          </Message>
          
        </div>
      </section>

      <Footer />
    </>
  );
}