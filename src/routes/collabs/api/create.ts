/**
 * @type {import('@sveltejs/kit').RequestHandler}
 */
import { createClient } from '@supabase/supabase-js';
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
    const doesStudioExist = await fetch(
      `https://api.scratch.mit.edu/studios/${Number(parsedBody.studio).toString()}/managers`
    );
    if (!doesStudioExist.ok) {
      throw new Error("Studio doesn't exist");
    }
    const managers = await doesStudioExist.json();
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
    const supabase = createClient(process.env['SUPABASE_URL'], process.env['SUPABASE_ANON_KEY']);
    console.log(jwtv);
    const readUser = await supabase.from('users').select().eq('username', jwtv.username);
    console.log(readUser);
    if (readUser.error || readUser.data.length < 1) {
      throw new Error("user doesn't exist");
    }
    const uid = readUser.data[0]['id'];
    console.log(uid);
    const createCollab = await supabase
      .from('collabs')
      .insert([{ created_by: uid, studio: Number(parsedBody.studio) }]);
    if (createCollab.error) {
      console.log(createCollab);
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
