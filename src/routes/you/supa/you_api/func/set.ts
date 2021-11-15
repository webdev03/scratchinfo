/**
 * @type {import('@sveltejs/kit').RequestHandler}
 */
import { createClient } from "@supabase/supabase-js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

export async function post(request) {
	const parsedBody = JSON.parse(request.body);
	try {
		let jwtv = undefined;
		try {
			// jwt.verify returns a decoded object so we can use this to check the JWT
			jwtv = jwt.verify(parsedBody.token, process.env["SUPABASE_JWT_SECRET"], {
				maxAge: "2h",
			});
		} catch {
			return {
				status: 500,
				body: {
					iserror: true,
					msg: "Token not valid.",
				},
			};
		}
		const user = jwtv.username;
		if (isNaN(parsedBody.studio)) {
			return {
				status: 500,
				body: {
					iserror: true,
					msg: "Studio is not a number.",
				},
			};
		}
		const studioSet = Math.round(Number(parsedBody.studio));
		const supabase = createClient(
			process.env["SUPABASE_URL"],
			process.env["SUPABASE_ANON_KEY"]
		);
		const userExists = await supabase
			.from("users")
			.select()
			.eq("username", user);
		if (userExists.error || userExists.data.length == 0) {
			const createUser = await supabase
				.from("users")
				.insert([{ username: user, studio: studioSet }]);
			if (createUser.error) {
				throw new Error("An error has occured.1");
			}
		} else {
			const setUser = await supabase
				.from("users")
				.update({ username: user, studio: studioSet })
				.eq("username", user);
			if (setUser.error) {
				throw new Error(setUser.error.toString());
			}
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
				msg: "Error unknown.",
			},
		};
	}
}
