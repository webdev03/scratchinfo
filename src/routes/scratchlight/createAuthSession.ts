/**
 * @type {import('@sveltejs/kit').RequestHandler}
 */
import { createClient } from '@supabase/supabase-js';
import crypto from 'crypto';
import dotenv from 'dotenv';
dotenv.config();

export async function post({ request }) {
  try {
    const parsedBody = await request.json();
    if (typeof parsedBody.username == 'undefined') {
      return {
        status: 500,
        body: {
          isError: true,
          msg: 'Please add a username in your POST request.'
        }
      };
    }
    let postCode =
      'COPY THIS CODE ENTIRELY. DO NOT POST THIS CODE IF IT DID NOT COME FROM SCRATCHINFO! ' +
      crypto.randomBytes(128).toString('hex');
    postCode = postCode.replace(/[0-9]/g, '');
    const privateCode = crypto.randomBytes(1024).toString('hex');
    const supabase = createClient(process.env['SCRATCHLIGHT_URL'], process.env['SCRATCHLIGHT_KEY']);
    const createSession = await supabase
      .from('codes')
      .insert([{ code: postCode, user: parsedBody.username, privateCode: privateCode }]);
    if (createSession.error) {
      throw new Error('Oh noes! An error has occurred!');
    }
    return {
      body: {
        code: postCode,
        username: parsedBody.username,
        private: privateCode
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
