import { useEffect, useState } from 'react';
import { getApiBaseUrl, normalizeApiResponse } from '../lib/api';

const codespaceName = import.meta.env.VITE_CODESPACE_NAME;
const endpoint = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev/api/workouts/`
  : `${getApiBaseUrl()}/api/workouts/`;

function Workouts() {
  const [workouts, setWorkouts] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(endpoint)
      .then((res) => res.json())
      .then((data) => setWorkouts(normalizeApiResponse(data)))
      .catch((err) => setError(err.message));
  }, []);

  return (
    <section>
      <h2>Workouts</h2>
      <p className="hint">Fetching from: {endpoint}</p>
      {error && <div className="error">Error: {error}</div>}
      <ul>
        {workouts.map((workout) => (
          <li key={workout._id ?? workout.id}>
            <strong>{workout.title}</strong> - {workout.category} ({workout.difficulty})
          </li>
        ))}
      </ul>
    </section>
  );
}

export default Workouts;
