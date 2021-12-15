/**
 * @type {import('@sveltejs/kit').RequestHandler}
 */
import { verifier } from '$lib/verify';
import dotenv from 'dotenv';
dotenv.config();

export async function post(request) {
  try {
    let tr = request;
    tr.insertedEnv = process.env
    return await verifier(tr);
    /* let parsedBody: any;
    try {
      parsedBody = JSON.parse(request.body);
    } catch {
      parsedBody = request.body;
    }
    const privateCode = parsedBody.privateCode;
    if (typeof privateCode == 'undefined') {
      throw new Error('no private code');
    }
    const supabase = createClient(process.env['SCRATCHLIGHT_URL'], process.env['SCRATCHLIGHT_KEY']);
    const getData = await supabase.from('codes').select().eq('privateCode', privateCode);
    if (getData.error || getData.data.length == 0) {
      throw new Error('Cannot find session.');
    }
    const comments = await (
      await fetch(
        `https://api.scratch.mit.edu/users/ScratchLightAuth/projects/603838920/comments/?limit=15&offset=0&somethingCompletelyRandom=${crypto
          .randomBytes(24)
          .toString('hex')}`
      )
    ).json();
    for (let index = 0; index < comments.length; index++) {
      const comment = comments[index];
      if (
        comment.content == getData.data[0]['code'] &&
        comment.author.username.toLowerCase() == getData.data[0]['user'].toLowerCase()
      ) {
        const deleteAuthSession = await supabase
          .from('codes')
          .delete()
          .eq('privateCode', privateCode);
        return {
          body: {
            isError: false,
            username: getData.data[0]['user']
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
    }; */
  } catch {
    return {
      status: 500,
      body: {
        isError: true,
        msg: 'An error has occurred.'
      }
    };
  }
}
