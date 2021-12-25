/**
 * @type {import('@sveltejs/kit').RequestHandler}
 */
import { getStatus } from '$lib/getStatus';
import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
dotenv.config();

export async function put(request) {
  try {
    let parsedBody: any;
    try {
      parsedBody = JSON.parse(request.body);
    } catch {
      parsedBody = request.body;
    }
    let goals: any;
    try {
      goals = JSON.parse(parsedBody.goals);
    } catch {
      goals = parsedBody.goals;
    }
    let releases: any;
    try {
      releases = JSON.parse(parsedBody.releases);
    } catch {
      releases = parsedBody.releases;
    }
    if (typeof parsedBody.token == 'undefined') {
      return {
        status: 500,
        body: {
          isError: true,
          msg: 'Please add an auth token in your PUT request.'
        }
      };
    }
    if (isNaN(parsedBody.studio)) {
      throw new Error('Studio not a number.');
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
          success: false,
          msg: 'Token not valid.'
        }
      };
    }
    const status = await getStatus(jwtv.username);
    if (status == "New Scratcher") {
      throw new Error("New Scratchers are not allowed in scratchinfo.")
    }
    // Validate input
    if (goals.length > 10) {
      throw new Error("too long");
    }
    for (let i in goals) {
      const goal = goals[i];
      if (isNaN(goal.progress) || goal.progress < 0 || goal.progress > 100 || goal.progress == null) {
        throw new Error("not good")
      }
      const goalKeys = Object.keys(goal);
      for (let key in goalKeys) {
        const goalKey = goalKeys[key];
        if (!(goalKey == "title" || goalKey == "progress")) {
          throw new Error("WHY DO YOU ADD EXTRA STUFF WHY  ")
        }
      }
    }
    if (releases.length > 100) {
      throw new Error("too long");
    }
    for (let i in releases) {
      const release = releases[i];
      if (isNaN(release.id) || release.id < 0 || release.id == null) {
        throw new Error("not good")
      }
      if (typeof release.title != "string" || typeof release.description != "string" || typeof release.id != "number") {
        throw new Error("invalid type")
      }
      if (release.title.length > 30) {
        throw new Error("Release title too long");
      }
      if (release.description.length > 150) {
        throw new Error("Release description too long");
      }
      const releaseKeys = Object.keys(release);
      for (let key in releaseKeys) {
        const releaseKey = releaseKeys[key];
        if (!(releaseKey == "title" || releaseKey == "id" || releaseKey == "description")) {
          throw new Error("WHY DO YOU ADD EXTRA STUFF WHY!!!!")
        }
      }
    }
    // Check if studio exists
    const doesStudioExist = await fetch(
      `https://api.scratch.mit.edu/studios/${Number(parsedBody.studio).toString()}/managers`
    );
    if (!doesStudioExist.ok) {
      throw new Error("Studio doesn't exist");
    }

    // Checks if user is manager
    let isManager = false;
    const managers = await doesStudioExist.json();
    for (let i in managers) {
      if (managers[i].username.toLowerCase() == jwtv.username.toLowerCase()) {
        isManager = true;
        break;
      }
    }
    if (!isManager) {
      throw new Error("not manager lol")
    }

    const supabase = createClient(process.env['SUPABASE_URL'], process.env['SUPABASE_ANON_KEY']);
    const readUser = await supabase.from('users').select().eq('username', jwtv.username);
    if (readUser.error || readUser.data.length < 1) {
      throw new Error("user doesn't exist");
    }
    const updateCollab = await supabase
      .from('collabs')
      .update({ goals: JSON.stringify(goals), releases: JSON.stringify(releases) })
      .eq('studio', parsedBody.studio);
    if (updateCollab.error) {
      throw new Error('Oh noes! An error has occurred!');
    }
    return {
      body: {
        success: true
      }
    };
  } catch (err) {
    console.error(err);
    return {
      status: 500,
      body: {
        success: false,
        msg: 'An error has occurred.'
      }
    };
  }
}
