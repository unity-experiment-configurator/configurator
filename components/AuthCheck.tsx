import Link from "next/link";
import { useContext } from "react";
import { UserContext } from "../lib/Context";
import Message from "../components/Message";
import Main from "../components/Main";

// Component's children only shown to logged-in users
export default function AuthCheck(props) {
  const { username } = useContext(UserContext);

  return username
    ? props.children
    : props.fallback || (
        <Main>
          <Link href="/enter">Please sign in</Link>
        </Main>
      );
}
