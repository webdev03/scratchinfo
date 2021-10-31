/**
 * @type {import('@sveltejs/kit').RequestHandler}
 */
export async function get({ params }) {
  // the `slug` parameter is available because this file
  // is called [slug].json.js
  const { user } = params;
  const user_projects = await (await fetch(
    `https://api.scratch.mit.edu/users/${user}/projects/?limit=1`
  )).json();
  const project_to_fetch = user_projects[0].id;
  const project = await (await fetch(
    `https://projects.scratch.mit.edu/${project_to_fetch}/`
  )).json();
  try {
    const agent = project["meta"]["agent"];
    return {
      body: {
        user_agent: agent,
        error: false
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
