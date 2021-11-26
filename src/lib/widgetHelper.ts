/* YOU DO NOT NEED TO EDIT THIS IF YOU ARE CONTRIBUTING TO A SCRATCHINFO WIDGET! */
async function SIWidgetHelper() {
/*   try { */
    let mjson: Array<string>;
    let ret = [];
    mjson = (await import(`$lib/widgets/list.json`))["default"];
    // yes the next line has some weird code, vscode
    /* console.log(await import("$lib/widgets/project-embed/widget.json")); */
    for (let index = 0; index < mjson.length; index++) {
      const componentName = mjson[index];
      console.log(componentName)
      const componentJSON = (await import("$lib/widgets/" + componentName + "/widget.json"))
      componentJSON.componentID = componentName;
      ret.push(componentJSON)
    }
    return ret;
 /*  } catch(err) { console.error(err) } */
}
export { SIWidgetHelper };