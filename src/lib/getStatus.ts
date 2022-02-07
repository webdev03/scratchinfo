export async function getStatus(user: string) {
  const r = await fetch(`https://isscratcher.9pfs.repl.co/api/${user}`); // isScratcher doesn't care about the user agent string
  if (!r.ok) {
    throw new Error('scratch doesn\'t know that username');
  }
  const rJSON = await r.json();
  if(rJSON.isScratcher==false) {
    return "New Scratcher";
  }
  else {
    return "Scratcher"; // Will say that Scratch Team members are scratchers, but can't be fixed currently due to isScratcher limitations. However, since Scratch Team members have no extra privileges, it's fine for now.
  }
}
