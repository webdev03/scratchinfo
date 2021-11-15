/**
 * @type {import('@sveltejs/kit').RequestHandler}
 */
import jwt from "jsonwebtoken";
// this part is because process.env sometimes breaks
import dotenv from "dotenv";
dotenv.config();
export async function get({ query }) {
  try {
    const privateCode = query.get("privateCode");
    const fluffyFetch = await fetch(
      `https://fluffyscratch.hampton.pw/auth/verify/v2/${privateCode}`
    );
    const ffc = await fluffyFetch.json();
    if (ffc.valid == false) {
      throw new Error("Authentication not valid.");
    }
    const myJWT = await jwt.sign(
      { username: ffc.username },
      process.env["SUPABASE_JWT_SECRET"],
      { expiresIn: "2h", audience: "scratchinfo" }
    );
    return {
      body: {
        works: true,
        token: myJWT,
      },
    };
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
