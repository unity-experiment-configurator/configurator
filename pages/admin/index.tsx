import AuthCheck from "../../components/AuthCheck";
import PostFeed from "../../components/PostFeed";
import { UserContext } from "../../lib/Context";
import {
  firestore,
  auth,
  serverTimestamp,
  postToJSON,
} from "../../lib/Firebase";
import { useContext, useEffect, useRef, useState } from "react";
import { useRouter } from "next/router";
import { useCollection } from "react-firebase-hooks/firestore";
import kebabCase from "lodash.kebabcase";
import Main from "../../components/Main";
import { Button } from "../../components/FormControls";

export default function AdminPostsPage(props) {
  const [isCreating, setIsCreating] = useState(false);

  return (
    <Main>
      <AuthCheck>
        <CreateNewExperiment
          onCreate={() => {
            setIsCreating(true);
          }}
        />
        {!isCreating && <ExperimentList />}
      </AuthCheck>
    </Main>
  );
}

function ExperimentList() {
  const ref = firestore
    .collection("users")
    .doc(auth.currentUser.uid)
    .collection("posts");
  const query = ref.orderBy("createdAt");
  const [querySnapshot] = useCollection(query);

  const posts = querySnapshot?.docs.map((doc) => doc.data());

  return (
    <>
      <h1 className="mt-16 mb-6 text-xl font-bold">My Experiments</h1>
      <PostFeed posts={posts} admin />
    </>
  );
}

async function isValidTitle(title: string) {
  return new Promise<any>((resolve, reject) => {
    if (title.length > 3 && title.length < 100) {
      const uid = auth.currentUser.uid;
      const slug = encodeURI(kebabCase(title));
      const ref = firestore
        .collection("users")
        .doc(uid)
        .collection("posts")
        .doc(slug);
    
      ref.get().then((snapshot) => {
        if (snapshot.exists) {
          resolve(false);
        } else {
          resolve(true);
        }
      });
    } else {
      resolve(false);
    }
  });
}

function CreateNewExperiment({ onCreate }) {
  const router = useRouter();
  const { username } = useContext(UserContext);
  const [title, setTitle] = useState("");
  const [createDisabled, setCreateDisabled] = useState(true);

  const { duplicate } = router.query;

  // Ensure slug is URL safe
  const slug = encodeURI(kebabCase(title));

  // Create a new post in firestore
  const createPost = async (e) => {
    e.preventDefault();

    onCreate();

    setCreateDisabled(true);

    let data;
    const uid = auth.currentUser.uid;

    if (duplicate) {
      const ref = firestore
        .collection("users")
        .doc(uid)
        .collection("posts")
        .doc(duplicate as string);
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
        heartCount: 0,
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
      };
    }

    const ref = firestore
      .collection("users")
      .doc(uid)
      .collection("posts")
      .doc(slug);
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
      <h1 className="mt-8 mb-6 text-xl font-bold">
        {duplicate ? (
          <>Duplicate "{duplicate}"</>
        ) : (
          <>Create a New Experiment</>
        )}
      </h1>
      <input
        ref={titleRef}
        value={title}
        onChange={async (e) => {
          setTitle(e.target.value);
          const isValid = await isValidTitle(e.target.value);
          setCreateDisabled(!isValid);
        }}
        placeholder="Experiment name"
        className="py-2 px-3 text-gray-900 w-full border border-gray-400"
      />
      <p className="pt-4">
        <strong>ID:</strong> {slug}
      </p>
      <Button text="Create" type="submit" disabled={createDisabled} classes="mt-8" />
    </form>
  );
}
