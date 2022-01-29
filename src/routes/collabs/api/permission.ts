/**
 * @type {import('@sveltejs/kit').RequestHandler}
 */
// Permission manager for collabs
// Permissions should be verified on each change to the collab
// This is a POST request because
import jwt from 'jsonwebtoken';
export async function post(request) {
  let parsedBody: any;
  try {
    parsedBody = JSON.parse(request.body);
  } catch {
    parsedBody = request.body;
  }
  let jwtv = undefined;
  try {
    // jwt.verify returns a decoded object so we can use this to check the JWT
    jwtv = jwt.verify(parsedBody.token, process.env['SUPABASE_JWT_SECRET'], {
      maxAge: '2h'
    });
  } catch {
    return {
      status: 500,
      body: {
        iserror: true,
        msg: 'Token not valid.'
      }
    };
  }
  const doesStudioExist = await fetch(
    `https://api.scratch.mit.edu/studios/${Number(parsedBody.studio).toString()}/managers`
  );
  if (!doesStudioExist.ok) {
    throw new Error("Studio doesn't exist");
  }
  let isManager = false;
  const managers = await doesStudioExist.json();
  for (let i in managers) {
    if (managers[i].username.toLowerCase() == jwtv.username.toLowerCase()) {
      isManager = true;
      break;
    }
  }
  return {
    body: {
      manager: isManager
    }
  };
}
