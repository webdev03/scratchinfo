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
        history: {
          joined: api_official_user.history.joined,
        },
        ocular: {
          status: ocular.status,
          color: ocular.color,
        },
        scratchdb,
        images: api_official_user.profile.images,
        error: false,
      },
    };
  } catch (err) {
    return {
      body: {
        error: true,
        error_msg: new Error(err),
      },
    };
  }
}
