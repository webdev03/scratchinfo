/**
 * @type {import('@sveltejs/kit').RequestHandler}
 */
import { createClient } from "@supabase/supabase-js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { getStatus } from "$lib/getStatus";
dotenv.config();

export async function post(request) {
  const parsedBody = JSON.parse(request.body);
  try {
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
    const user = jwtv.username;
    const status = await getStatus(user);
    if (status == "New Scratcher") {
      throw new Error("New Scratchers are not allowed in scratchinfo.");
    }
    if (isNaN(parsedBody.studio) || Number(parsedBody.studio) < 0) {
      return {
        status: 500,
        body: {
          iserror: true,
          msg: "Studio is not a number."
        }
      };
    }
    const studioSet = Math.round(Number(parsedBody.studio));
    const isBusy = !!parsedBody.busy;
    const isWorkingOnProject = !!parsedBody.isWorkingOnProject;
    let percentDoneWithProject = parsedBody.percentProjectDone;
    if (
      isWorkingOnProject == false ||
      Number(percentDoneWithProject) < 1 ||
      Number(percentDoneWithProject) > 100 ||
      isNaN(Number(percentDoneWithProject))
    ) {
      percentDoneWithProject = 0;
    }
    const supabase = createClient(process.env["SUPABASE_URL"], process.env["SUPABASE_ANON_KEY"]);
    const userExists = await supabase.from("users").select().eq("username", user);
    const setJSON = {
      username: user,
      studio: studioSet,
      busy: isBusy,
      workingOnProject: isWorkingOnProject,
      percentageDoneWithProject: percentDoneWithProject
    };
    if (userExists.error || userExists.data.length == 0) {
      const createUser = await supabase.from("users").insert([setJSON]);
      if (createUser.error) {
        throw new Error("An error has occured.");
      }
    } else {
      const setUser = await supabase.from("users").update(setJSON).eq("username", user);
      if (setUser.error) {
        throw new Error(setUser.error.toString());
      }
    }
    return {
      body: {
        username: user,
        iserror: false
      }
    };
  } catch (err) {
    console.error(err);
    return {
      status: 500,
      body: {
        iserror: true,
        msg: "Error unknown."
      }
    };
  }
}
