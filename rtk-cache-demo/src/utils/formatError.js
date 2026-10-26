// RTK Query errors are either { status, data } / { status: 'FETCH_ERROR', error } or { message }.
export function formatError(error) {
  if (!error) return '';
  if ('status' in error) {
    if (typeof error.status === 'number') {
      return error.status === 404
        ? 'HTTP 404: this post does not exist'
        : `HTTP ${error.status}: request failed`;
    }
    return `${error.status}: ${error.error ?? 'network problem'}`;
  }
  return error.message ?? 'Unknown error';
}

export const formatTime = (ts) => (ts ? new Date(ts).toLocaleTimeString() : '-');
