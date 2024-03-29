import { getUserWithUsername, postToJSON } from '../../lib/Firebase';
import UserProfile from '../../components/UserProfile';
import Metatags from '../../components/Metatags';
import PostFeed from '../../components/PostFeed';
import Main from '../../components/Main';

export async function getServerSideProps({ query }) {
  const { username } = query;

  const userDoc = await getUserWithUsername(username);

  // If no user, short circuit to 404 page
  if (!userDoc) {
    return {
      notFound: true,
    };
  }

  // JSON serializable data
  let user = null;
  // let posts = null;
  if (userDoc) {
    user = userDoc.data();
    // const postsQuery = userDoc.ref
    //   .collection('posts')
    //   .where('published', '==', true)
    //   .orderBy('createdAt', 'desc')
    //   .limit(5);
    // posts = (await postsQuery.get()).docs.map(postToJSON);
  }

  return {
    props: { user }, // will be passed to the page component as props
  };
}

export default function UserProfilePage({ user }) {
  return (
    <Main>
      <Metatags title={user.username} description={`${user.username}'s public profile`} />
      <UserProfile user={user} />
      {/* <PostFeed posts={posts} /> */}
    </Main>
  );
}