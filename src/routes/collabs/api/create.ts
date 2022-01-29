/**
 * @type {import('@sveltejs/kit').RequestHandler}
 */
import { createClient } from '@supabase/supabase-js';
import { getStatus } from '$lib/getStatus';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
dotenv.config();

export async function post(request) {
  try {
    let parsedBody: any;
    try {
      parsedBody = JSON.parse(request.body);
    } catch {
      parsedBody = request.body;
    }
    if (typeof parsedBody.token == 'undefined') {
      return {
        status: 500,
        body: {
          isError: true,
          msg: 'Please add an auth token in your POST request.'
        }
      };
    }
    if (isNaN(parsedBody.studio)) {
      throw new Error('Studio not a number.');
    }
    // this next part should probably be modularised or something
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
    const status = await getStatus(jwtv.username);
    if (status == 'New Scratcher') {
      throw new Error('New Scratchers are not allowed in scratchinfo.');
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
    if (!isManager) {
      throw new Error('not manager lol');
    }
    const supabase = createClient(process.env['SUPABASE_URL'], process.env['SUPABASE_ANON_KEY']);
    const readUser = await supabase.from('users').select().eq('username', jwtv.username);
    if (readUser.error || readUser.data.length < 1) {
      throw new Error("user doesn't exist");
    }
    const uid = readUser.data[0]['id'];
    const createCollab = await supabase.from('collabs').insert([
      {
        created_by: uid,
        studio: Number(parsedBody.studio),
        goals: JSON.stringify([]),
        releases: JSON.stringify([])
      }
    ]);
    if (createCollab.error) {
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
        isError: true,
        msg: 'An error has occurred.'
      }
    };
  }
}
