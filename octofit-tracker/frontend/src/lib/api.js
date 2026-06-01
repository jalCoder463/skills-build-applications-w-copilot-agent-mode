const codespaceName = import.meta.env.VITE_CODESPACE_NAME;
const fallbackBaseUrl = 'http://localhost:8000';

export const getApiBaseUrl = () => {
  if (codespaceName && typeof codespaceName === 'string' && codespaceName.trim()) {
    return `https://${codespaceName}-8000.app.github.dev`;
  }
  return fallbackBaseUrl;
};

export const normalizeApiResponse = (data) => {
  if (Array.isArray(data)) {
    return data;
  }
  if (data?.data && Array.isArray(data.data)) {
    return data.data;
  }
  if (data?.items && Array.isArray(data.items)) {
    return data.items;
  }
  if (data?.results && Array.isArray(data.results)) {
    return data.results;
  }
  return Array.isArray(data) ? data : [data];
};
