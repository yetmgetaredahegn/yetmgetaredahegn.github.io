export const THEME_KEY = "theme";

/** Runs in <head> before first paint, so a saved theme override never flashes. */
export const themeInitScript = `(function(){try{var t=localStorage.getItem("${THEME_KEY}");if(t==="light"||t==="dark")document.documentElement.setAttribute("data-theme",t)}catch(e){}})()`;
