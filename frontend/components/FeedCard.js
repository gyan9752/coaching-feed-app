export default function FeedCard({ feed }) {
  return (
    <div className="border p-4 rounded-lg shadow-md">
      <h2 className="text-xl font-bold">
        {feed.title}
      </h2>

      <p className="mt-2">
        {feed.message}
      </p>
    </div>
  );
}