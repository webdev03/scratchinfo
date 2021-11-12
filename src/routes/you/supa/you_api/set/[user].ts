/**
 * @type {import('@sveltejs/kit').RequestHandler}
 */
import { createClient } from "@supabase/supabase-js";
// this part is because process.env sometimes breaks
import dotenv from "dotenv";
dotenv.config();

export async function post(request) {
	try {
		const supabase = createClient(
			process.env["SUPABASE_URL"],
			process.env["SUPABASE_ANON_KEY"]
		);
    console.log(process.env)
		supabase.auth.setAuth(request.body.token);
		return {
			iserror: false,
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
