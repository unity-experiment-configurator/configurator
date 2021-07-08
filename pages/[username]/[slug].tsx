import PostContent from '../../components/PostContent';
import HeartButton from '../../components/HeartButton';
import AuthCheck from '../../components/AuthCheck';
import Metatags from '../../components/Metatags';
import Main from '../../components/Main';
import { UserContext } from '../../lib/Context';
import { firestore, getUserWithUsername, postToJSON } from '../../lib/Firebase';

import Link from 'next/link';
import { useDocumentData } from 'react-firebase-hooks/firestore';
import { useContext } from 'react';
import { downloadConfig } from '../../lib/Utils';

// export async function getStaticProps({ params }) {
//   const { username, slug } = params;
//   const userDoc = await getUserWithUsername(username);

//   let post;
//   let path;

//   if (userDoc) {
//     const postRef = userDoc.ref.collection('posts').doc(slug);
//     post = postToJSON(await postRef.get());

//     path = postRef.path;
//   }

//   return {
//     props: { post, path },
//     revalidate: 100,
//   };
// }

// export async function getStaticPaths() {
//   // Improve my using Admin SDK to select empty docs
//   const snapshot = await firestore.collectionGroup('posts').get();

//   const paths = snapshot.docs.map((doc) => {
//     const { slug, username } = doc.data();
//     return {
//       params: { username, slug },
//     };
//   });

//   return {
//     // must be in this format:
//     // paths: [
//     //   { params: { username, slug }}
//     // ],
//     paths,
//     fallback: 'blocking',
//   };
// }

export async function getServerSideProps({ query }) {
  const { username, slug } = query;

  const userDoc = await getUserWithUsername(username);

  // If no user, short circuit to 404 page
  if (!userDoc) {
    return {
      notFound: true,
    };
  }

  // JSON serializable data
  let user = null;
  let post = null;

  const postRef = userDoc.ref.collection('posts').doc(slug);
  post = postToJSON(await postRef.get());

  return {
    props: { user, post }, // will be passed to the page component as props
  };
}

export default function Post({ user, post }) {
  // const postRef = firestore.doc(props.path);
  // const [realtimePost] = useDocumentData(postRef);

  // const post = realtimePost || props.post;

  // const { user: currentUser } = useContext(UserContext);

  return (
    <Main>
      <Metatags title={post.title} description={post.title} />
      
      <section>
        <PostContent post={post} />
      </section>

      <aside className="mt-16">
        {
          post.duplicationEnabled && (
            <Link href={`/admin?duplicate=${post.slug}`}>
              <button className="p-4 text-white bg-primary-500 mr-4">Duplicate Experiment</button>
            </Link>
          )
        }
        <button className="p-4 text-white bg-primary-500 mr-4" onClick={() => {
          downloadConfig(post);
        }}>Download Config</button>
      </aside>

      {/* <aside>
        <div className="my-4">
          <strong>{post.heartCount || 0} 🤍</strong>
        </div>

        {currentUser?.uid === post.uid && (
          <div className="inline-block mr-4">
            <Link href={`/admin/${post.slug}`}>
              <button className="p-4 bg-primary-500 text-white">Edit Post</button>
            </Link>
          </div>
        )}

        <div className="inline-block">
          <AuthCheck
            fallback={
              <Link href="/enter">
                <button>💗 Sign Up</button>
              </Link>
            }
          >
            <HeartButton postRef={postRef} />
          </AuthCheck>
        </div>
      </aside> */}
    </Main>
  );
}