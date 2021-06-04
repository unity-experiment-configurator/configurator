import AuthCheck from '../../components/AuthCheck';
import PostFeed from '../../components/PostFeed';
import { UserContext } from '../../lib/Context';
import { firestore, auth, serverTimestamp } from '../../lib/Firebase';
import { useContext, useState } from 'react';
import { useRouter } from 'next/router';
import { useCollection } from 'react-firebase-hooks/firestore';
import kebabCase from 'lodash.kebabcase';
import toast from 'react-hot-toast';
import Main from "../../components/Main";

export default function AdminPostsPage(props) {
  return (
    <Main>
      <AuthCheck>
        <ObjectList />
        <CreateNewObject />
      </AuthCheck>
    </Main>
  );
}

function ObjectList() {
  const ref = firestore.collection('users').doc(auth.currentUser.uid).collection('posts');
  const query = ref.orderBy('createdAt');
  const [querySnapshot] = useCollection(query);

  const posts = querySnapshot?.docs.map((doc) => doc.data());

  return (
    <>
      <h1 className="mt-4 pb-4 text-xl font-bold">Experiments</h1>
      <PostFeed posts={posts} admin />
    </>
  );
}

function CreateNewObject() {
  const router = useRouter();
  const { username } = useContext(UserContext);
  const [title, setTitle] = useState('');

  // Ensure slug is URL safe
  const slug = encodeURI(kebabCase(title));

  // Validate length
  const isValid = title.length > 3 && title.length < 100;

  // Create a new post in firestore
  const createPost = async (e) => {
    e.preventDefault();
    const uid = auth.currentUser.uid;
    const ref = firestore.collection('users').doc(uid).collection('posts').doc(slug);

    // Tip: give all fields a default value here
    const data = {
      title,
      slug,
      uid,
      username,
      published: false,
      content: 'description',
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
      heartCount: 0,
    };

    await ref.set(data);

    toast.success('Experiment created!');

    // Imperative navigation after doc is set
    router.push(`/admin/${slug}`);
  };

  return (
    <form onSubmit={createPost}>
      <h1 className="mt-8 pb-4 text-xl font-bold">Create a New Experiment</h1>
      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Experiment name"
        className="py-2 px-3 text-gray-900 w-full border border-gray-400"
      />
      <p className="pt-4">
        <strong>Slug:</strong> {slug}
      </p>
      <button type="submit" disabled={!isValid} className="mt-8 p-4 text-white bg-blue-500">
        Create
      </button>
    </form>
  );
}