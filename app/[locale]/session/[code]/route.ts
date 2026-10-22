import {retiredTestSessionResponse} from '../../../../lib/retired-test-session-routes.mjs';

// Old links must not read or initialise the former session store.
function gone(request: Request) {
  return retiredTestSessionResponse(request.method);
}

export {gone as GET, gone as HEAD, gone as POST, gone as PUT,
  gone as PATCH, gone as DELETE, gone as OPTIONS};
