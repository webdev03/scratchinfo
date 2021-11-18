/**
 * @type {import('@sveltejs/kit').RequestHandler}
 */
import jwt from "jsonwebtoken";

import dotenv from "dotenv";
dotenv.config();
export async function post(request) {
  let parsedBody = undefined;
  try {
    parsedBody = JSON.parse(request.body)
  } catch {
    parsedBody = request.body
  }
  try {
    const privateCode = parsedBody.privateCode;
    let protocol = "https://"
    if (request.host.startsWith("localhost:")) {
      protocol = "http://" // on localhost dont expect https
    }
    const slFetch = await fetch(
      `${protocol}${request.host}/scratchlight/verify`,
      {
        method: "POST",
        body: JSON.stringify({
          privateCode: privateCode
        })
      }
    );
    const scratchlight = await slFetch.json();
    if (scratchlight.isError == true) {
      throw new Error("Authentication not valid.");
    }
    const realUser = await (await fetch(`https://api.scratch.mit.edu/users/${scratchlight.username}`)).json()
    const myJWT = await jwt.sign(
      { username: realUser.username },
      process.env["SUPABASE_JWT_SECRET"],
      { expiresIn: "2h", audience: "scratchinfo" }
    );
    return {
      body: {
        works: true,
        token: myJWT,
      },
    };
  } catch (err) {
    return {
      status: 500,
      body: {
        works: false,
      },
    };
  }
}
