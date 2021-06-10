import AuthCheck from '../../components/AuthCheck';
import PostFeed from '../../components/PostFeed';
import { UserContext } from '../../lib/Context';
import { firestore, auth, serverTimestamp, postToJSON } from '../../lib/Firebase';
import { useContext, useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/router';
import { useCollection } from 'react-firebase-hooks/firestore';
import kebabCase from 'lodash.kebabcase';
import Main from "../../components/Main";

export default function AdminPostsPage(props) {
  return (
    <Main>
      <AuthCheck>
        <CreateNewExperiment />
        <ExperimentList />
      </AuthCheck>
    </Main>
  );
}

function ExperimentList() {
  const ref = firestore.collection('users').doc(auth.currentUser.uid).collection('posts');
  const query = ref.orderBy('createdAt');
  const [querySnapshot] = useCollection(query);

  const posts = querySnapshot?.docs.map((doc) => doc.data());

  return (
    <>
      <h1 className="mt-16 pb-4 text-2xl font-bold">My Experiments</h1>
      <PostFeed posts={posts} admin />
    </>
  );
}

function CreateNewExperiment() {
  const router = useRouter();
  const { username } = useContext(UserContext);
  const [title, setTitle] = useState('');

  const { duplicate } = router.query;

  // Ensure slug is URL safe
  const slug = encodeURI(kebabCase(title));

  // Validate length
  const isValid = title.length > 3 && title.length < 100;

  // Create a new post in firestore
  const createPost = async (e) => {
    e.preventDefault();

    let data;
    const uid = auth.currentUser.uid;

    if (duplicate) {
      const ref = firestore.collection('users').doc(uid).collection('posts').doc(duplicate as string);
      const postToDuplicate = postToJSON(await ref.get());

      data = {
        ...postToDuplicate,
        title,
        slug,
        uid,
        username,
        published: true,
        duplicationEnabled: true,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
        heartCount: 0
      };
    } else {
      data = {
        title,
        slug,
        uid,
        username,
        published: true,
        duplicationEnabled: true,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
        heartCount: 0,
      }
    }
    
    const ref = firestore.collection('users').doc(uid).collection('posts').doc(slug);
    await ref.set(data);

    if (duplicate) {
      router.push(`/admin/${slug}?duplicate=${duplicate}`);
    } else {
      router.push(`/admin/${slug}`);
    }
  };

  const titleRef = useRef();

  useEffect(() => {
    setTimeout(() => {
      // @ts-ignore
      titleRef.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
      // @ts-ignore
      titleRef.current.focus();
    }, 200);
  }, []);

  return (
    <form onSubmit={createPost}>
      <h1 className="mt-8 pb-4 text-2xl font-bold">{
        duplicate ? <>Duplicate "{duplicate}"</> : <>Create a New Experiment</>
      }</h1>
      <input
        ref={titleRef}
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Experiment name"
        className="py-2 px-3 text-gray-900 w-full border border-gray-400"
      />
      <p className="pt-4">
        <strong>ID:</strong> {slug}
      </p>
      <button type="submit" disabled={!isValid} className="mt-8 p-4 text-white bg-blue-500">
        Create
      </button>
    </form>
  );
}