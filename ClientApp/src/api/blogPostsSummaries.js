export const getBlogPostsSummaries = () => {
  return fetch("/api/BlogPost").then(data => data.json());
};
