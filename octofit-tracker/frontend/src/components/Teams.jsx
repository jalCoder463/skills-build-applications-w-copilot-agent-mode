import { useEffect, useState } from 'react';
import { getApiBaseUrl, normalizeApiResponse } from '../lib/api';

const endpoint = `${getApiBaseUrl()}/api/teams/`;

function Teams() {
  const [teams, setTeams] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(endpoint)
      .then((res) => res.json())
      .then((data) => setTeams(normalizeApiResponse(data)))
      .catch((err) => setError(err.message));
  }, []);

  return (
    <section>
      <h2>Teams</h2>
      <p className="hint">Fetching from: {endpoint}</p>
      {error && <div className="error">Error: {error}</div>}
      <ul>
        {teams.map((team) => (
          <li key={team._id ?? team.id}>
            <strong>{team.name}</strong>: {team.description}
          </li>
        ))}
      </ul>
    </section>
  );
}

export default Teams;
