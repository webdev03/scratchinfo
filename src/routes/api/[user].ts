/**
 * @type {import('@sveltejs/kit').RequestHandler}
 */
export async function get({ params }) {
  const { user } = params;
  try {
    const api_official_user = await (
      await fetch(`https://api.scratch.mit.edu/users/${user}/`)
    ).json();
    const scratchdb = await (
      await fetch(`https://scratchdb.lefty.one/v3/user/info/${user}`)
    ).json();
    const scratchdb_forum_user = await(
      await fetch(`https://scratchdb.lefty.one/v3/forum/user/info/${user}`)
    ).json();
    const ocular = await (
      await fetch(`https://my-ocular.jeffalo.net/api/user/${user}/`)
    ).json();
    const user_projects = await (
      await fetch(`https://api.scratch.mit.edu/users/${user}/projects/?limit=1`)
    ).json();
    const project_to_fetch = user_projects[0].id;
    const project = await (
      await fetch(`https://projects.scratch.mit.edu/${project_to_fetch}/`)
    ).json();

    const agent = project["meta"]["agent"];
    return {
      body: {
        username: api_official_user.username,
        user_agent: agent,
        scratchteam: api_official_user.scratchteam,
        history: {
          joined: api_official_user.history.joined,
        },
        ocular: {
          status: ocular.status,
          color: ocular.color,
        },
        scratchdb,
        counts: scratchdb_forum_user.counts,
        images: api_official_user.profile.images,
        iserror: false,
      },
    };
  } catch (err) {
    console.log(err)
    return {
      body: {
        iserror: true,
        error_msg: err.toString(),
      },
    };
  }
}
