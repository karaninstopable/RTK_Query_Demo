import { useGetPostsQuery } from '../services/postsApi';
import { formatError, formatTime } from '../utils/formatError';

// Subscribes to the "getPosts" cache entry while mounted.
// Unmount it and the entry is kept for CACHE_SECONDS; remount within that time = no new request.
export default function PostsList({ selectedId, onSelect }) {
  const { data, status, isLoading, isFetching, isError, error, refetch, fulfilledTimeStamp } =
    useGetPostsQuery();

  let cacheLabel = 'Showing cached data (no request needed)';
  if (isLoading) cacheLabel = 'First load: fetching from network';
  else if (isFetching) cacheLabel = 'Refetching in the background';
  else if (isError) cacheLabel = 'Request failed';

  return (
    <section className="card">
      <div className="card-head">
        <h2>Posts list</h2>
        <button onClick={refetch} disabled={isFetching}>
          {isFetching ? 'Fetching...' : 'Refresh data'}
        </button>
      </div>

      <dl className="status">
        <div><dt>Query status</dt><dd><span className={`pill ${status}`}>{status}</span></dd></div>
        <div><dt>isLoading</dt><dd>{String(isLoading)}</dd></div>
        <div><dt>isFetching</dt><dd>{String(isFetching)}</dd></div>
        <div><dt>Last fulfilled</dt><dd>{formatTime(fulfilledTimeStamp)}</dd></div>
      </dl>
      <p className="label">{cacheLabel}</p>

      {isLoading && <p>Loading posts...</p>}
      {isError && (
        <p className="error">
          {formatError(error)} <button onClick={refetch}>Retry</button>
        </p>
      )}

      {data && (
        <ul className={isFetching ? 'posts dim' : 'posts'}>
          {data.map((post) => (
            <li key={post.id}>
              <button
                className={selectedId === post.id ? 'item active' : 'item'}
                onClick={() => onSelect(post.id)}
              >
                <strong>#{post.id}</strong> {post.title}
              </button>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
