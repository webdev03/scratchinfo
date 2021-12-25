export async function getStatus(user: string) {
  const r = await fetch(`https://scratchdb.lefty.one/v3/user/info/${user}`, {
    headers: {
      'User-Agent': 'Mozilla 5.0'
    }
  });
  if (!r.ok) {
    throw new Error('scratchdb doesnt know');
  }
  const rJSON = await r.json();
  return rJSON.status.trim();
}
