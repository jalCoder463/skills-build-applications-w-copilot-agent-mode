import { useEffect, useState } from 'react';
import { getApiBaseUrl, normalizeApiResponse } from '../lib/api';

const codespaceName = import.meta.env.VITE_CODESPACE_NAME;
const endpoint = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev/api/leaderboard/`
  : `${getApiBaseUrl()}/api/leaderboard/`;

function Leaderboard() {
  const [entries, setEntries] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(endpoint)
      .then((res) => res.json())
      .then((data) => setEntries(normalizeApiResponse(data)))
      .catch((err) => setError(err.message));
  }, []);

  return (
    <section>
      <h2>Leaderboard</h2>
      <p className="hint">Fetching from: {endpoint}</p>
      {error && <div className="error">Error: {error}</div>}
      <ol>
        {entries.map((entry) => (
          <li key={entry._id ?? entry.id}>
            <strong>{entry.user?.name ?? 'Unknown'}</strong> • {entry.points} points
          </li>
        ))}
      </ol>
    </section>
  );
}

export default Leaderboard;
