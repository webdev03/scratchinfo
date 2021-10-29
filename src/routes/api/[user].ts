/**
 * @type {import('@sveltejs/kit').RequestHandler}
 */
export async function get({ params }) {
  // the `slug` parameter is available because this file
  // is called [slug].json.js
  const { user } = params;
  console.log(user)
  const user_projects = await (await fetch(
    `https://api.scratch.mit.edu/users/${user}/projects`
  )).json();
  const project_to_fetch = user_projects[0].id;
  console.log(project_to_fetch)
  const project = await (await fetch(
    `https://projects.scratch.mit.edu/${project_to_fetch}/`
  )).json();
  console.log(project)
  try {
    const agent = project["meta"]["agent"];
    console.log(agent);
    return {
      body: {
        user_agent: agent,
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
