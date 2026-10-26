import { useGetPostQuery } from '../services/postsApi';
import { formatError, formatTime } from '../utils/formatError';

const QUICK_PICKS = [
  { id: 1, label: 'Post 1' },
  { id: 2, label: 'Post 2' },
  { id: 3, label: 'Post 3' },
  { id: 9999, label: '404 demo' },
];

// One cache entry PER id: getPost(1), getPost(2)...
// Going back to an id you already viewed (within CACHE_SECONDS) is served from cache.
export default function PostViewer({ selectedId, onSelect }) {
  // skip = do not fetch until an id is chosen
  const { data, status, isLoading, isFetching, isError, error, refetch, fulfilledTimeStamp } =
    useGetPostQuery(selectedId, { skip: selectedId == null });

  return (
    <section className="card">
      <h2>Single post</h2>

      <div className="row">
        {QUICK_PICKS.map((p) => (
          <button
            key={p.id}
            className={selectedId === p.id ? 'chip active' : 'chip'}
            onClick={() => onSelect(p.id)}
          >
            {p.label}
          </button>
        ))}
      </div>

      {selectedId == null ? (
        <p>Pick a post above or from the list.</p>
      ) : (
        <>
          <dl className="status">
            <div><dt>Query</dt><dd>getPost({selectedId})</dd></div>
            <div><dt>Status</dt><dd><span className={`pill ${status}`}>{status}</span></dd></div>
            <div><dt>isFetching</dt><dd>{String(isFetching)}</dd></div>
            <div><dt>Last fulfilled</dt><dd>{formatTime(fulfilledTimeStamp)}</dd></div>
          </dl>

          {isLoading && <p>Loading post...</p>}
          {isError && (
            <p className="error">
              {formatError(error)} <button onClick={refetch}>Retry</button>
            </p>
          )}
          {data && (
            <article>
              <h3>{data.title}</h3>
              <p>{data.body}</p>
              <button onClick={refetch} disabled={isFetching}>Refetch this post</button>
            </article>
          )}
        </>
      )}
    </section>
  );
}
