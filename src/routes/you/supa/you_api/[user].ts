/**
 * @type {import('@sveltejs/kit').RequestHandler}
 */
import { createClient } from "@supabase/supabase-js";
export async function get({ params }) {
	const { user } = params;
	try {
		const supabase = createClient(
			// @ts-expect-error
			import.meta.env.VITE_SUPABASE_URL,
			import.meta.env.VITE_SUPABASE_ANON_KEY
		);
		const { data, error } = await supabase
			.from("users")
			.select()
			.eq("username", user);
		if (error || data.length == 0) {
			throw new Error("No user found with this username.")
		}
    const studioAPI = await (await fetch(`https://api.scratch.mit.edu/studios/${data[0].studio}/`)).json()
		return {
			body: {
				data,
        studio: studioAPI,
        studio_url: `https://scratch.mit.edu/studios/${data[0].studio}`,
				isError: false,
			},
		};
	} catch (err) {
		console.error(err);
		return {
			status: 500,
			body: {
				iserror: true,
			},
		};
	}
}
