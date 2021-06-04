import Link from "next/link";

export default function PostFeed({
  posts,
  admin,
}: {
  posts: any;
  admin?: boolean;
}) {
  return posts ? (
    <dl className="space-y-4">
      {posts.map((post) => (
        <PostItem post={post} key={post.slug} admin={admin} />
      ))}
    </dl>
  ) : null;
}

function PostItem({ post, admin = false }: { post: any; admin?: boolean }) {
  // Naive method to calc word count and read time
  const wordCount = post?.content.trim().split(/\s+/g).length;
  // const minutesToRead = (wordCount / 100 + 1).toFixed(0);

  return (
    <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
      <dt>
        <Link href={`/${post.username}/${post.slug}`}>
          <img src={post.thumbnailURL} className="cursor-pointer" />
        </Link>
      </dt>
      <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">

        <header>
          <Link href={`/${post.username}/${post.slug}`}>
            <h2 className="w-full cursor-pointer py-2 text-xl font-bold">
              <a className="text-black">{post.title}</a>
            </h2>
          </Link>

          <Link href={`/${post.username}`}>
            <a className="cursor-pointer">
              <span className="text-black">By</span>&nbsp;
              <span>@{post.username}</span>
            </a>
          </Link>
        </header>

        <main className="pt-2 text-md">{post.description}</main>

        <footer className="py-2">
          {/* <span>
          {wordCount} words. {minutesToRead} min read
        </span> */}
          <span>💗 {post.heartCount || 0} Hearts</span>
        </footer>

        {/* If admin view, show extra controls for user */}
        {admin && (
          <>
            <Link href={`/admin/${post.slug}`}>
              <button className="p-4 bg-primary-500 text-white">Edit</button>
            </Link>

            {post.published ? (
              <p className="text-green">Live</p>
            ) : (
              <p className="text-red">Unpublished</p>
            )}
          </>
        )}
      </dd>
    </div>
  );
}
