import Metatags from '../components/Metatags';
import { useEffect } from 'react';
import Hero from '../components/Hero';
import CarouselSection from '../components/Carousel';
import FeaturesSection from '../components/Features';
import "intersection-observer";

// Max post to query per page
// const LIMIT = 10;

// export async function getServerSideProps(context) {
//   const postsQuery = firestore
//     .collectionGroup('posts')
//     .where('published', '==', true)
//     .orderBy('createdAt', 'desc')
//     .limit(LIMIT);

//   const posts = (await postsQuery.get()).docs.map(postToJSON);

//   return {
//     props: { posts }, // will be passed to the page component as props
//   };
// }

export default function Home(props) {
  // const [posts, setPosts] = useState(props.posts);
  // const [loading, setLoading] = useState(false);
  // const [postsEnd, setPostsEnd] = useState(false);

  // Get next page in pagination query
  // const getMorePosts = async () => {
  //   setLoading(true);
  //   const last = posts[posts.length - 1];

  //   if (!last) {
  //     return;
  //   }

  //   const cursor = typeof last.createdAt === 'number' ? fromMillis(last.createdAt) : last.createdAt;

  //   const query = firestore
  //     .collectionGroup('posts')
  //     .where('published', '==', true)
  //     .orderBy('createdAt', 'desc')
  //     .startAfter(cursor)
  //     .limit(LIMIT);

  //   const newPosts = (await query.get()).docs.map((doc) => doc.data());

  //   setPosts(posts.concat(newPosts));
  //   setLoading(false);

  //   if (newPosts.length < LIMIT) {
  //     setPostsEnd(true);
  //   }
  // };

  // add body styles
  useEffect(() => { 
    document.querySelector("body").classList.add("home") 
  }, []);
    
  return (
    <>
      <Metatags title="Home Page" description="Get the latest posts on our site" />

      <Hero />

      <CarouselSection delay={2500} items={
        [
          { id: 0, imageUrl: 'photo-1544511916-0148ccdeb877?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&w=1901&q=80i' },
          { id: 1, imageUrl: 'photo-1544572571-ab94fd872ce4?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&w=1534&q=80' },
          { id: 2, imageUrl: 'reserve/bnW1TuTV2YGcoh1HyWNQ_IMG_0207.JPG?ixlib=rb-1.2.1&w=1534&q=80' },
          { id: 3, imageUrl: 'photo-1540206395-68808572332f?ixlib=rb-1.2.1&w=1181&q=80' },
        ]
      } />

      <FeaturesSection />

      {/* <PostFeed posts={posts} />

      <div className="container mx-auto flex py-4">
        {!loading && !postsEnd && <button onClick={getMorePosts}>Load more</button>}

        <Loader show={loading} />

        {postsEnd && 'no more experiments!'}
      </div> */}
    </>
  );
}