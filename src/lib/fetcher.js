const fetcher = (url) =>
  fetch(url, {
    headers: {
      Authorization: `Basic ${btoa("admin@example.com:123456")}`,
    },
  }).then((res) => res.json());
export default fetcher;
