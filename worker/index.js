// Worker entry. Replaces the Cloudflare Pages Functions setup: the two
// handlers in this folder keep their Pages signature ({ request, env, next })
// and this file wires them up the way Pages did: the middleware runs on every
// request, /api/callback goes to its function, everything else to the assets.
import { onRequest as middleware } from './middleware.js';
import { onRequest as callback } from './api/callback.js';

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const next = () =>
      url.pathname === '/api/callback' || url.pathname === '/api/callback/'
        ? callback({ request, env })
        : env.ASSETS.fetch(request);
    return middleware({ request, env, next });
  },
};
