/**
 * @type {import('@sveltejs/kit').RequestHandler}
 */
import { createClient } from "@supabase/supabase-js";
import crypto from "crypto";
export async function verifier(request) {
  try {
    let parsedBody: any;
    try {
      parsedBody = JSON.parse(request.body);
    } catch {
      parsedBody = request.body;
    }
    const envVars = request.insertedEnv;
    const privateCode = parsedBody.privateCode;
    if (typeof privateCode == "undefined") {
      throw new Error("no private code");
    }
    const supabase = createClient(envVars["SCRATCHLIGHT_URL"], envVars["SCRATCHLIGHT_KEY"]);
    const getData = await supabase.from("codes").select().eq("privateCode", privateCode);
    if (getData.error || getData.data.length == 0) {
      throw new Error("Cannot find session.");
    }
    const comments = (await (
      await fetch(
        `https://api.scratch.mit.edu/users/ScratchLightAuth/projects/603838920/comments/?limit=15&offset=0&somethingCompletelyRandom=${crypto
          .randomBytes(24)
          .toString("hex")}`
      )
    ).json()).reverse();
    for (let index = 0; index < comments.length; index++) {
      const comment = comments[index];
      if (
        comment.content == getData.data[0]["code"] &&
        comment.author.username.toLowerCase() == getData.data[0]["user"].toLowerCase()
      ) {
        const deleteAuthSession = await supabase
          .from("codes")
          .delete()
          .eq("privateCode", privateCode);
        return {
          body: {
            isError: false,
            username: getData.data[0]["user"]
          }
        };
      }
    }
    return {
      status: 500,
      body: {
        isError: true,
        msg: "We couldn't verify this auth session."
      }
    };
  } catch (err) {
    console.error(err);
    throw new Error(err);
  }
}
