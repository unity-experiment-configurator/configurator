import Link from "next/link";
import { sanitizeSSR } from "../lib/Utils";

// UI component for main post content
export default function PostContent({ post }) {
  const createdAt =
    typeof post?.createdAt === "number"
      ? new Date(post.createdAt)
      : post.createdAt.toDate();

  function ExperimentDetails({ post }) {
    return (
      <table className="table-fixed w-full max-w-lg">
        <thead>
          <tr>
            <th className="w-1/2 border px-4 py-2 align-top text-left">property</th>
            <th className="w-1/2 border px-4 py-2 align-top text-left">value</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="border px-4 py-2 align-top">description</td>
            <td className="border px-4 py-2 align-top">
              <span
                dangerouslySetInnerHTML={sanitizeSSR(post.description)}
              ></span>
            </td>
          </tr>
          <tr>
            <td className="border px-4 py-2 align-top">instructions</td>
            <td className="border px-4 py-2 align-top">
              <span
                dangerouslySetInnerHTML={sanitizeSSR(post.instructions)}
              ></span>
            </td>
          </tr>
          <tr>
            <td className="border px-4 py-2 align-top">trials</td>
            <td className="border px-4 py-2 align-top">
              <span>{ post.blockTrialCount }</span>
            </td>
          </tr>
          {Object.entries(post.options).map(([key, value]) => {
            return (
              <tr key={key}>
                <td className="border px-4 py-2 align-top">{key}</td>
                <td className="border px-4 py-2 align-top">
                  {Array.isArray(value)
                    ? value.map((v, i) => {
                        return (
                          <span key={i}>
                            <>{v}</>
                            <>{i >= 0 && i < value.length - 1 && <>, </>}</>
                          </span>
                        );
                      })
                    : value}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    );
  }

  return (
    <div>
      <h1 className="py-4 text-2xl font-bold">{post?.title}</h1>
      <img src={post.thumbnailURL} />
      <div className="text-sm mb-8 text-gray-700">
        Created by{" "}
        <Link href={`/${post.username}/`}>
          <a>@{post.username}</a>
        </Link>{" "}
        on {createdAt.toLocaleString("en-GB")}
      </div>
      <div>
        <ExperimentDetails post={post} />
      </div>
    </div>
  );
}
