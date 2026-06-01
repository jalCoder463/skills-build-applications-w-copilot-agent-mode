import { useEffect, useState } from 'react';
import { getApiBaseUrl, normalizeApiResponse } from '../lib/api';

const codespaceName = import.meta.env.VITE_CODESPACE_NAME;
const endpoint = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev/api/activities/`
  : `${getApiBaseUrl()}/api/activities/`;

function Activities() {
  const [activities, setActivities] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(endpoint)
      .then((res) => res.json())
      .then((data) => setActivities(normalizeApiResponse(data)))
      .catch((err) => setError(err.message));
  }, []);

  return (
    <section>
      <h2>Activities</h2>
      <p className="hint">Fetching from: {endpoint}</p>
      {error && <div className="error">Error: {error}</div>}
      <ul>
        {activities.map((activity) => (
          <li key={activity._id ?? activity.id}>
            <strong>{activity.type}</strong> - {activity.durationMinutes} minutes{' '}
            {activity.distanceKm ? `(${activity.distanceKm} km)` : ''}
          </li>
        ))}
      </ul>
    </section>
  );
}

export default Activities;
