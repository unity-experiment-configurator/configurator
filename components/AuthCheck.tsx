// import { useRouter } from "next/router";
import { useContext, useEffect } from "react";
import { UserContext } from "../lib/Context";
import { auth } from "../lib/Firebase";

// Component's children only shown to logged-in users
export default function AuthCheck(props) {
  const { user } = useContext(UserContext);
  // const router = useRouter();

  useEffect(() => {
    if (auth) {
      auth.signInAnonymously();
    }
  }, [auth]);

  // useEffect(() => {
  //   if (!user) {
  //     router.push(
  //       {
  //         pathname: "/enter",
  //         query: { from: location.href },
  //       },
  //       "/"
  //     );
  //   }
  // }, []);

  return user !== null ? props.children : null;
}
