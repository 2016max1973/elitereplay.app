import {retiredTestSessionResponse} from '../../../lib/retired-test-session-routes.mjs';

// This was the simulated QR prototype, not the current MatchBoard/History demo.
function gone(request: Request) {
  return retiredTestSessionResponse(request.method);
}

export {gone as GET, gone as HEAD, gone as POST, gone as PUT,
  gone as PATCH, gone as DELETE, gone as OPTIONS};
