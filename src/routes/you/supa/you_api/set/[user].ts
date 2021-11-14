/**
 * @type {import('@sveltejs/kit').RequestHandler}
 */
import { createClient } from "@supabase/supabase-js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

export async function post(request) {
	const { user } = request.params;
	try {
		try {
			jwt.verify(request.body.token, process.env["SUPABASE_JWT_SECRET"], {
				maxAge: "2h",
			});
		} catch {
      return {
        status: 500,
        body: {
          iserror: true,
          msg: "Token not valid."
        },
      };
    }
		const supabase = createClient(
			process.env["SUPABASE_URL"],
			process.env["SUPABASE_ANON_KEY"]
		);
		const userExists = await supabase
			.from("users")
			.select()
			.eq("username", user);
		if (userExists.error || userExists.data.length == 0) {
			throw new Error("No user found with this username.");
		}
		return {
			body: {
				username: user,
				iserror: false,
			},
		};
	} catch (err) {
		console.error(err);
		return {
			status: 500,
			body: {
				iserror: true,
        msg: "Error unknown."
			},
		};
	}
}
