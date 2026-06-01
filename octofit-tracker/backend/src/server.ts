const codespaceName = process.env.CODESPACE_NAME;
const API_BASE_URL = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev`
  : 'http://localhost:8000';

console.log('Codespaces-aware API base URL:', API_BASE_URL);

export { API_BASE_URL };
