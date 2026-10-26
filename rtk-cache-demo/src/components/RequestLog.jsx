import { useDispatch, useSelector } from 'react-redux';
import { logCleared } from '../features/requestLogSlice';
import { formatTime } from '../utils/formatError';

export default function RequestLog() {
  const dispatch = useDispatch();
  const { total, entries } = useSelector((s) => s.requestLog);

  return (
    <section className="card">
      <div className="card-head">
        <h2>Network requests: {total}</h2>
        <button onClick={() => dispatch(logCleared())}>Clear</button>
      </div>
      {entries.length === 0 && <p>No requests logged yet.</p>}
      <ul className="plain log">
        {entries.map((e, i) => (
          <li key={`${e.time}-${i}`}>
            <span>{formatTime(e.time)}</span>
            <code>{e.url}</code>
            <span className={e.ok ? 'pill fulfilled' : 'pill rejected'}>{e.status}</span>
          </li>
        ))}
      </ul>
      <small>
        Only real HTTP calls appear here. If you see data on screen but no new line, it came from the cache.
      </small>
    </section>
  );
}
