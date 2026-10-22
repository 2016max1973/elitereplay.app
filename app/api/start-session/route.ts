import {retiredTestSessionResponse} from '../../../lib/retired-test-session-routes.mjs';

// Remains closed even if middleware is bypassed. Never parse a request body,
// import the session store, or contact a recorder or delivery service.
function gone(request: Request) {
  return retiredTestSessionResponse(request.method, true);
}

export {gone as GET, gone as HEAD, gone as POST, gone as PUT,
  gone as PATCH, gone as DELETE, gone as OPTIONS};
