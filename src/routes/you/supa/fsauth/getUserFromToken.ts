/**
 * @type {import('@sveltejs/kit').RequestHandler}
 */
 import jwt from "jsonwebtoken";
 // this part is because process.env sometimes breaks
 import dotenv from "dotenv";
 dotenv.config();
 export async function post(request) {
   try {
    try {
			const jwtContent = jwt.verify(JSON.parse(request.body).token, process.env["SUPABASE_JWT_SECRET"], {
				maxAge: "2h",
			});
      return {
        body: jwtContent
      }
		} catch {
      return {
        status: 500,
        body: {
          iserror: true,
          msg: "Token not valid."
        },
      };
    }
   } catch (err) {
     console.error(err)
     return {
       status: 500,
       body: {
         works: false,
       },
     };
   }
 }
 