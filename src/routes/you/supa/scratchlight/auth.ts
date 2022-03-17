/**
 * @type {import('@sveltejs/kit').RequestHandler}
 */
import jwt from "jsonwebtoken";
import { verifier } from "$lib/verify";
import { getStatus } from "$lib/getStatus";
import dotenv from "dotenv";
dotenv.config();
export async function post(request) {
  let parsedBody = undefined;
  try {
    parsedBody = JSON.parse(request.body);
  } catch {
    parsedBody = request.body;
  }
  try {
    let tr = request;
    tr.insertedEnv = process.env;
    const scratchlight = await verifier(tr);
    /* let protocol = "https://"
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
    const scratchlight = await slFetch.json(); */
    const status = await getStatus(scratchlight.body.username);
    if (status == "New Scratcher") {
      throw new Error("New Scratchers are not allowed in scratchinfo.");
    }
    if (scratchlight.body.isError == true) {
      throw new Error("Authentication not valid.");
    }
    const realUser = await (
      await fetch(`https://api.scratch.mit.edu/users/${scratchlight.body.username}`)
    ).json();
    const myJWT = await jwt.sign(
      { username: realUser.username },
      process.env["SUPABASE_JWT_SECRET"],
      { expiresIn: "2h", audience: "scratchinfo" }
    );
    return {
      body: {
        works: true,
        token: myJWT
      }
    };
  } catch (err) {
    console.log(err);
    return {
      status: 500,
      body: {
        works: false
      }
    };
  }
}
