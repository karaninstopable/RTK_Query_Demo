import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { CACHE_SECONDS } from '../services/postsApi';

// Reads the RTK Query cache straight out of the Redux store so you can see it.
export default function CacheEntries({ listUnmountedAt }) {
  const queries = useSelector((s) => s.postsApi.queries);
  const entries = Object.values(queries).filter(Boolean);

  // Approximate countdown for the list entry while the list is unmounted
  const [now, setNow] = useState(Date.now());
  useEffect(() => {
    if (!listUnmountedAt) return;
    const t = setInterval(() => setNow(Date.now()), 500);
    return () => clearInterval(t);
  }, [listUnmountedAt]);

  const secondsLeft = listUnmountedAt
    ? Math.max(0, CACHE_SECONDS - Math.floor((now - listUnmountedAt) / 1000))
    : null;

  return (
    <section className="card">
      <h2>Cache entries ({entries.length})</h2>
      {entries.length === 0 && <p>The cache is empty.</p>}
      <ul className="plain">
        {entries.map((q) => (
          <li key={`${q.endpointName}-${JSON.stringify(q.originalArgs)}`}>
            <code>
              {q.endpointName}({q.originalArgs === undefined ? '' : JSON.stringify(q.originalArgs)})
            </code>
            <span className={`pill ${q.status}`}>{q.status}</span>
          </li>
        ))}
      </ul>
      {secondsLeft !== null && (
        <p className="note">
          List unmounted: its cache entry is removed in about <strong>{secondsLeft}s</strong>.
          Mount it again before then and no request is sent.
        </p>
      )}
    </section>
  );
}
