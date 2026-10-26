import { useState } from 'react';
import PostsList from './components/PostsList';
import PostViewer from './components/PostViewer';
import CacheEntries from './components/CacheEntries';
import RequestLog from './components/RequestLog';

export default function App() {
  const [showList, setShowList] = useState(true);
  const [selectedId, setSelectedId] = useState(1);
  const [listUnmountedAt, setListUnmountedAt] = useState(null);

  const toggleList = () => {
    // Remember when the list unmounted so we can show the cache countdown
    setListUnmountedAt(showList ? Date.now() : null);
    setShowList(!showList);
  };

  return (
    <main className="container">
      <header>
        <h1>RTK Query Cache Demo</h1>
        <p>
          Unmount and remount the list, refresh it, switch posts, and trigger a 404, while
          watching the cache and the real network requests.
        </p>
      </header>

      <div className="toolbar">
        <button onClick={toggleList}>{showList ? 'Unmount list' : 'Mount list'}</button>
      </div>

      <div className="grid">
        <div>
          {showList ? (
            <PostsList selectedId={selectedId} onSelect={setSelectedId} />
          ) : (
            <section className="card">
              <h2>Posts list</h2>
              <p>The list component is unmounted. Its data stays in the cache for a while.</p>
            </section>
          )}
        </div>
        <div>
          <PostViewer selectedId={selectedId} onSelect={setSelectedId} />
          <CacheEntries listUnmountedAt={listUnmountedAt} />
          <RequestLog />
        </div>
      </div>
    </main>
  );
}
