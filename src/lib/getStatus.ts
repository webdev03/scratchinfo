import { parse } from 'node-html-parser';

export async function getStatus(user: string) {
  const r = await fetch(`https://scratch.mit.edu/users/${user}`, {
    headers: {
      'User-Agent': 'Mozilla/5.0'
    }
  });
  
  const parsedBody = parse(await r.text());

  const status = parsedBody.querySelector(".profile-details .group").innerText.trim();
  return status;
}
