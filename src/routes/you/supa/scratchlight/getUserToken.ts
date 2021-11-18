import jwt from "jsonwebtoken";
// this part is because process.env sometimes breaks
import dotenv from "dotenv";
dotenv.config();
export async function post(request) {
  let parsedBody = undefined;
  try {
    parsedBody = JSON.parse(request.body)
  } catch {
    parsedBody = request.body
  }
  try {
    try {
      const isJWTGood = jwt.verify(parsedBody.token, process.env["SUPABASE_JWT_SECRET"], {
        maxAge: "2h",
      });
      if (!isJWTGood) {
        throw new Error("no.")
      }
      const jwtContent = jwt.decode(parsedBody.token);
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