// URLs that should return 410 Gone
const goneUrls = [
  '/Z6Rv',
  '/dc3K',
  '/5AEG',
];

export async function onRequest(context) {
  const url = new URL(context.request.url);

  // Check if the path matches any of the gone URLs
  if (goneUrls.includes(url.pathname)) {
    return new Response('410 Gone - This page no longer exists.', {
      status: 410,
      headers: {
        'Content-Type': 'text/plain',
      },
    });
  }

  // Continue to the next handler
  return context.next();
}
