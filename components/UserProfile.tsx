export default function UserProfile({ user }) {
  return (
    <div className="box-center">
      <img src={user.photoURL || '/hacker.png'} className="inline-block h-12 w-12 rounded-full" />
      <p>
        <i>@{user.username}</i>
      </p>
      <h1 className="py-4 text-2xl">{user.displayName || 'Anonymous User'}</h1>
    </div>
  );
}