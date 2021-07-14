import Metatags from '../components/Metatags';
import { useEffect } from 'react';
import Hero from '../components/Hero';
import CarouselSection from '../components/Carousel';
import FeaturesSection from '../components/Features';
import "intersection-observer";
import NavMenu from '../components/NavMenu';

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

      <NavMenu />

      <Hero />

      <CarouselSection delay={2500} items={
        [
          { id: 0, imageUrl: '/images/carousel/carousel1.png' },
          { id: 1, imageUrl: '/images/carousel/carousel2.png' },
          { id: 2, imageUrl: '/images/carousel/carousel3.png' },
          { id: 2, imageUrl: '/images/carousel/carousel4.png' },
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