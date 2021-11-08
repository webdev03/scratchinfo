/**
 * @type {import('@sveltejs/kit').RequestHandler}
 */
export async function get({ params }) {
	const { type } = params;
	try {
		let leaderboard = {};
		leaderboard = await (
			await fetch(`https://scratchdb.lefty.one/v3/user/rank/global/${type}`)
		).json();
		return {
			body: leaderboard,
		};
	} catch (err) {
		console.error(err);
		return {
      status: 500,
			body: {
				iserror: true,
				error_msg: err.toString(),
			},
		};
	}
}
