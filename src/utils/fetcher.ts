/* eslint-disable no-console */
export default async function fetcher(url: RequestInfo | URL) {
  const res = await fetch(url);

  if (!res.ok) {
    const message = 'An error occured while fetching the data';
    const info = await res.json();
    const { status } = res;
    const error = new Error(message);

    console.error(info, status);

    throw error;
  }

  return res.json();
}
