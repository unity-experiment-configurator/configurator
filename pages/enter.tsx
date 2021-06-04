import Link from 'next/link';
import { auth, firestore, googleAuthProvider } from '../lib/Firebase';
import { UserContext } from '../lib/Context';
import Metatags from '../components/Metatags';
import Main from '../components/Main';

import { useEffect, useState, useCallback, useContext } from 'react';
import debounce from 'lodash.debounce';

export default function Enter(props) {
  const { user, username } = useContext(UserContext);

  // 1. user signed out <SignInButton />
  // 2. user signed in, but missing username <UsernameForm />
  // 3. user signed in, has username <CreateObjectButton />
  return (
    <Main>
      <Metatags title="Enter" description="Sign up for this amazing app!" />
      {user ? !username ? <UsernameForm /> : <CreateObjectButton /> : <SignInButton />}
    </Main>
  );
}

// Sign in with Google button
function SignInButton() {
  const signInWithGoogle = async () => {
    await auth.signInWithPopup(googleAuthProvider);
  };

  return (
    <>
      <button className="p-4" onClick={signInWithGoogle}>
        <img src="/google.png" className="w-8 mr-2 inline-block" /> Sign in with Google
      </button>
      {/* <button onClick={() => auth.signInAnonymously()}>
        Sign in Anonymously
      </button> */}
    </>
  );
}

// Sign out button
function SignOutButton() {
  return <button onClick={() => auth.signOut()} className="p-4 border border-1 border-black">Sign Out</button>;
}

function CreateObjectButton() {
  return (
    <Link href="/admin">
      <button className="p-4 text-white bg-primary-500 mr-4">Create an Experiment</button>
    </Link>
  );
}

// Username form
function UsernameForm() {
  const [formValue, setFormValue] = useState('');
  const [isValid, setIsValid] = useState(false);
  const [loading, setLoading] = useState(false);

  const { user, username } = useContext(UserContext);

  const onSubmit = async (e) => {
    e.preventDefault();

    // Create refs for both documents
    const userDoc = firestore.doc(`users/${user.uid}`);
    const usernameDoc = firestore.doc(`usernames/${formValue}`);

    // Commit both docs together as a batch write.
    const batch = firestore.batch();
    batch.set(userDoc, { username: formValue, photoURL: user.photoURL, displayName: user.displayName });
    batch.set(usernameDoc, { uid: user.uid });

    await batch.commit();
  };

  const onChange = (e) => {
    // Force form value typed in form to match correct format
    const val = e.target.value.toLowerCase();
    const re = /^(?=[a-zA-Z0-9._]{3,15}$)(?!.*[_.]{2})[^_.].*[^_.]$/;

    // Only set form value if length is < 3 OR it passes regex
    if (val.length < 3) {
      setFormValue(val);
      setLoading(false);
      setIsValid(false);
    }

    if (re.test(val)) {
      setFormValue(val);
      setLoading(true);
      setIsValid(false);
    }
  };

  useEffect(() => {
    checkUsername(formValue);
  }, [formValue]);

  // Hit the database for username match after each debounced change
  // useCallback is required for debounce to work
  const checkUsername = useCallback(
    debounce(async (username) => {
      if (username.length >= 3) {
        const ref = firestore.doc(`usernames/${username}`);
        const { exists } = await ref.get();
        console.log('Firestore read executed!');
        setIsValid(!exists);
        setLoading(false);
      }
    }, 500),
    []
  );

  return (
    !username && (
      <section>
        <h2 className="font-bold my-2">Choose a username</h2>
        <form onSubmit={onSubmit} className="max-w-md">
          <input type="text" className="py-2 px-3 text-gray-900 w-full border border-gray-400" name="username" placeholder="myname" value={formValue} onChange={onChange} />
          <UsernameMessage username={formValue} isValid={isValid} loading={loading} />
          <div className="mt-8">
            <button type="submit" className="bg-primary-500 text-white p-4" disabled={!isValid}>
              Create Account
            </button>
          </div>

          {/* <h3>Debug State</h3>
          <div>
            Username: {formValue}
            <br />
            Loading: {loading.toString()}
            <br />
            Username Valid: {isValid.toString()}
          </div> */}
        </form>
      </section>
    )
  );
}

function UsernameMessage({ username, isValid, loading }) {
  if (loading) {
    return <p className="mt-2">Checking...</p>;
  } else if (isValid) {
    return <p className="text-green-600 mt-2">{username} is available!</p>;
  } else if (username && !isValid) {
    return <p className="text-red-500 mt-2">That username is taken!</p>;
  } else {
    return <p></p>;
  }
}