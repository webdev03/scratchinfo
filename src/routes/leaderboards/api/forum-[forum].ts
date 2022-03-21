/**
 * @type {import('@sveltejs/kit').RequestHandler}
 */
export async function get({ params }) {
  const { forum } = params;
  try {
    let leaderboard = {};
    leaderboard = await (
      await fetch(`https://scratchdb.lefty.one/v3/forum/category/rank/${forum}`)
    ).json();
    return {
      body: leaderboard
    };
  } catch (err) {
    console.error(err);
    return {
      status: 500,
      body: {
        isError: true,
        error_msg: err.toString()
      }
    };
  }
}
