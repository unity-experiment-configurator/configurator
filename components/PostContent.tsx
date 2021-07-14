import Link from "next/link";

function ExperimentRow({ name, value }) {
  return (
    <tr key={name}>
      <td className="border px-4 py-2 align-top">{ name }</td>
      <td className="border px-4 py-2 align-top">
        {Array.isArray(value)
          ? value.map((v, i) => {
              return (
                <span key={`${name}-${i}`}>
                  <>{v}</>
                  <>{i >= 0 && i < value.length - 1 && <>, </>}</>
                </span>
              );
            })
          : value}
      </td>
    </tr>
  )
}

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
        <ExperimentRow name={"type"} value={post.type} />
        <ExperimentRow name={"description"} value={post.description} />
        <ExperimentRow name={"instructions"} value={post.instructions} />
        <ExperimentRow name={"blockTrialCount"} value={post.blockTrialCount} />
        {
          (post.options) ? 
            Object.entries(post.options).map(([key, value]) => {
              return (
                <ExperimentRow key={key} name={key} value={value} />
              )})
          : null
        }
      </tbody>
    </table>
  );
}

// UI component for main post content
export default function PostContent({ post }) {
  const createdAt =
    typeof post?.createdAt === "number"
      ? new Date(post.createdAt)
      : post.createdAt.toDate();

  return (
    <div>
      <h1 className="py-4 text-xl font-bold">{post?.title}</h1>
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
