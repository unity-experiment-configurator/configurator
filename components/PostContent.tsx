import Link from 'next/link';
import ReactMarkdown from 'react-markdown';

// UI component for main post content
export default function PostContent({ post }) {
  const createdAt = typeof post?.createdAt === 'number' ? new Date(post.createdAt) : post.createdAt.toDate();

  return (
    <div>
      <h1 className="py-4 text-2xl font-bold">{post?.title}</h1>
      <img src={post.thumbnailURL} />
      <div className="text-sm mb-8 text-gray-700">
        Created by{' '}
        <Link href={`/${post.username}/`}>
          <a>@{post.username}</a>
        </Link>{' '}
        on {createdAt.toISOString()}
      </div>
      <ReactMarkdown>{post?.content}</ReactMarkdown>
    </div>
  );
}