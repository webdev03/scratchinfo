/**
 * @type {import('@sveltejs/kit').RequestHandler}
 */
export async function get({ params }) {
	const { user } = params;
	// create abort controller
	async function superFetch(resource, options: {}) {
		const timeout = options["timeout"];
    // code taken from dmitripavlutin.com/timeout-fetch-request/
		const controller = new AbortController();
		const id = setTimeout(() => controller.abort(), timeout);
		const response = await fetch(resource, {
			...options,
			signal: controller.signal,
		});
		clearTimeout(id);
		return response;
	}
	try {
		const api_official_user = await (
			await superFetch(`https://api.scratch.mit.edu/users/${user}/`, {"timeout": 8000})
		).json();
		console.log(1);
		let scratchdb,
			scratchdb_forum_user = { counts: undefined };
		try {
			scratchdb = await (
				await superFetch(`https://scratchdb.lefty.one/v3/user/info/${user}`, {"timeout": 8000})
			).json();
			console.log(1);
			scratchdb_forum_user = await (
				await superFetch(`https://scratchdb.lefty.one/v3/forum/user/info/${user}`, {"timeout": 8000})
			).json();
			console.log(1);
		} catch (error) {}

		let ocular = { status: undefined, color: undefined };
		try {
			ocular = await (
				await superFetch(`https://my-ocular.jeffalo.net/api/user/${user}/`, {"timeout": 8000})
			).json();
		} catch (error) {
			ocular.status = "(Scratchinfo Message) Ocular seems to be down.";
		}
		if (ocular.status == undefined || ocular.color == undefined) {
			ocular.status = "No ocular status found.";
		}
		const user_projects = await (
			await superFetch(`https://api.scratch.mit.edu/users/${user}/projects/?limit=1`, {"timeout": 8000})
		).json();
		let agent = "(Scratchinfo) An error has occured!";
		if (user_projects.length === 0) {
			agent = "(Scratchinfo) No projects have been shared by this user.";
		} else {
			const project_to_fetch = user_projects[0].id;
			const project = await (
				await superFetch(`https://projects.scratch.mit.edu/${project_to_fetch}/`, {"timeout": 8000})
			).json();
			try {
				agent = project["meta"]["agent"];
			} catch (error) {
				agent = "(Scratchinfo) An error has occured in getting the user agent.";
			}
		}
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
		console.error(err);
		return {
			body: {
				iserror: true,
				error_msg: err.toString(),
			},
		};
	}
}
