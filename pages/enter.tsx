// import { UserContext } from "../lib/Context";
import Metatags from "../components/Metatags";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Footer from "../components/Footer";
import NavMenu from "../components/NavMenu";
import GoogleButton from "react-google-button";
import { auth, googleAuthProvider } from "../lib/Firebase";

export default function Enter(props) {
  // const { user } = useContext(UserContext);
  const router = useRouter();

  // const [signingIn, setSigningIn] = useState<boolean>(false);

  // function loginWithGoogle() {
  //   return firebase
  //     .login({ provider: "google", type: "popup" })
  //     .then((_user) => {
  //       // @ts-ignore
  //       window.location.href = location.state.from.pathname;
  //     });
  // }

  const signInWithGoogle = async () => {
    await auth.signInWithPopup(googleAuthProvider);
  };

  // function loginAnonymously() {
  //   setSigningIn(true);
  //   return auth.signInAnonymously();
  // }

  auth.onAuthStateChanged(async (user) => {
    if (user) {
      router.push(router.query.from as string)
    }
  });

  // useEffect(() => {
  //   if (auth) {
  //     loginAnonymously();
  //   }
  // }, [auth]);

  return (
    <>
      <Metatags title="Enter" description="Sign in to Experiment" />

      <NavMenu />

      <section id="login" className="py-16">
        <div className="container mx-auto flex flex-wrap px-8 py-16">
          {/* <>
            <p className="w-full pb-4">
              Please sign in anonymously to proceed.
            </p>
            <Button text="Sign in" onClick={loginAnonymously} />
          </>
          */}
          <>
            <p className="w-full pb-4">
              Please sign in with your Google account to proceed.
            </p>
            <GoogleButton onClick={signInWithGoogle} />
          </>
          {/* <>
            {signingIn ? (
              <span>Loading...</span>
            ) : (
              <p>
                Already signed in
              </p>
            )}
          </> */}
        </div>
      </section>

      <Footer />
    </>
  );
}
