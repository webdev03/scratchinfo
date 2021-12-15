import jsdom from "jsdom";
const { JSDOM } = jsdom;
export async function getStatus(user:string) {
	const r = await fetch(`https://scratch.mit.edu/users/${user}`, {
		headers: {
			"User-Agent": "Mozilla 5.0",
		},
	});
  if (!r.ok) {
    throw new Error("User doesn't exist.")
  }
  const doc = new JSDOM(await r.text());
  return doc.window.document.getElementsByClassName("group")[0].innerHTML.trim()
}