/**
 * @type {import('@sveltejs/kit').RequestHandler}
 */
import { createClient } from "@supabase/supabase-js";
import dotenv from "dotenv";
import { getStatus } from "$lib/getStatus";
import jwt from "jsonwebtoken";
dotenv.config();

export async function post(request) {
  // ? Should this reporting system even exist at all?
  try {
    let parsedBody: any;
    try {
      parsedBody = JSON.parse(request.body);
    } catch {
      parsedBody = request.body;
    }
    if (typeof parsedBody.token == "undefined") {
      return {
        status: 500,
        body: {
          isError: true,
          msg: "Please add an auth token in your POST request."
        }
      };
    }
    let jwtv = undefined;
    try {
      // jwt.verify returns a decoded object so we can use this to check the JWT
      jwtv = jwt.verify(parsedBody.token, process.env["SUPABASE_JWT_SECRET"], {
        maxAge: "2h"
      });
    } catch {
      return {
        status: 500,
        body: {
          iserror: true,
          msg: "Token not valid."
        }
      };
    }
    const status = await getStatus(jwtv.username);
    if (status == "New Scratcher") {
      throw new Error("New Scratchers are not allowed in scratchinfo.");
    }
    if (parsedBody.type === "studio") {
      const doesStudioExist = await fetch(
        `https://api.scratch.mit.edu/studios/${Number(parsedBody.name).toString()}/`
      );
      if (!doesStudioExist.ok) {
        throw new Error("Studio doesn't exist");
      }
    } else if (parsedBody.type === "user") {
      // TODO: create user reporting system
      throw new Error("TODO");
    } else {
      throw new Error("not a correct type");
    }

    const supabase = createClient(process.env["SUPABASE_URL"], process.env["SUPABASE_ANON_KEY"]);
    const readUser = await supabase.from("users").select().eq("username", jwtv.username);
    if (readUser.error || readUser.data.length < 1) {
      throw new Error("user doesn't exist");
    }
    const uid = readUser.data[0]["id"];
    const createReport = await supabase.from("reports").insert([
      {
        created_by: uid,
        for: parsedBody.type,
        name: parsedBody.type === "studio" ? Number(parsedBody.name).toString() : false
      }
    ]);
    if (createReport.error) {
      throw new Error("Oh noes! An error has occurred!");
    }
    return {
      body: {
        isError: false
      }
    };
  } catch (err) {
    console.error(err);
    return {
      status: 500,
      body: {
        isError: true,
        msg: "An error has occurred."
      }
    };
  }
}
