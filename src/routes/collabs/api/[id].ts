/**
 * @type {import('@sveltejs/kit').RequestHandler}
 */
import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
dotenv.config();

export async function get(request) {
  try {
    let { id } = request.params;
    if (isNaN(id)) {
      throw new Error();
    }
    id = Number(id);
    const supabase = createClient(process.env['SUPABASE_URL'], process.env['SUPABASE_ANON_KEY']);
    const readCollab = await supabase.from('collabs').select().eq('studio', id);
    if (readCollab.error || readCollab.data.length < 1) {
      throw new Error('No collab found.');
    }
    let collabData = readCollab.data[0];
    collabData.goals = JSON.parse(collabData.goals);
    collabData.releases = JSON.parse(collabData.releases);
    const readUser = await supabase.from('users').select().eq('id', readCollab.data[0].created_by);
    const studioFetch = await fetch(`https://api.scratch.mit.edu/studios/${id}/`);
    if (!studioFetch.ok) {
      throw new Error("Studio doesn't exist, or scratch is down.");
    }
    const studioData = await studioFetch.json();
    return {
      body: {
        studioID: Number(id),
        collab: readCollab.data[0],
        creator: readUser.data[0].username,
        studioData: studioData
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
