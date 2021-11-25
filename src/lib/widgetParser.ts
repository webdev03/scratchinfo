/* YOU DO NOT NEED TO EDIT THIS IF YOU ARE CONTRIBUTING TO A SCRATCHINFO WIDGET! */
async function parser(jsonfile) {
  let mjson: object;
  try {
    mjson = JSON.parse(jsonfile);
  } catch {
    mjson = jsonfile;
  }
}
export default parser;