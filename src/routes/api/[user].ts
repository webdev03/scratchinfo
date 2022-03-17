/**
 * @type {import('@sveltejs/kit').RequestHandler}
 */
export async function get({ params }) {
  const { user } = params;
  try {
    const api_official_user = await (
      await fetch(`https://api.scratch.mit.edu/users/${user}/`)
    ).json();
    let scratchdb,
      scratchdb_forum_user = { counts: undefined };
    scratchdb = await (await fetch(`https://scratchdb.lefty.one/v3/user/info/${user}`)).json();
    scratchdb_forum_user = await (
      await fetch(`https://scratchdb.lefty.one/v3/forum/user/info/${user}`)
    ).json();
    let ocular = { status: undefined, color: undefined };
    try {
      ocular = await (await fetch(`https://my-ocular.jeffalo.net/api/user/${user}/`)).json();
    } catch (error) {
      ocular.status = "(Scratchinfo Message) Ocular seems to be down.";
    }
    if (ocular.status == undefined || ocular.color == undefined) {
      ocular.status = "No ocular status found.";
    }
    /* const user_projects = await (
      await fetch(`https://api.scratch.mit.edu/users/${user}/projects/?limit=1`)
    ).json();
    let agent = "(Scratchinfo) An error has occured!";
    if (user_projects.length === 0) {
      agent = "(Scratchinfo) No projects have been shared by this user.";
    } else {
      const project_to_fetch = user_projects[0].id;
      const project = await (
        await fetch(`https://projects.scratch.mit.edu/${project_to_fetch}/`)
      ).json();
      try {
        agent = project["meta"]["agent"];
      } catch (error) {
        agent = "(Scratchinfo) An error has occured in getting the user agent."
      }
    }
    return {
      body: {
        username: api_official_user.username,
        user_agent: agent,
      } */
    return {
      body: {
        username: api_official_user.username,
        /* 				user_agent: agent, */
        scratchteam: api_official_user.scratchteam,
        history: {
          joined: api_official_user.history.joined
        },
        ocular: {
          status: ocular.status,
          color: ocular.color
        },
        scratchdb,
        counts: scratchdb_forum_user.counts,
        images: api_official_user.profile.images,
        iserror: false
      }
    };
  } catch (err) {
    console.error(err);
    return {
      body: {
        iserror: true,
        error_msg: err.toString()
      }
    };
  }
}
