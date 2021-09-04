import constants from "./constants.mjs";
import registerSettings from "./settings.js";
import Fonts from "./Fonts.js";

Hooks.once('init', () => {
  registerSettings();
  Fonts.render();

  Hooks.callAll(`${constants.moduleName}:afterInit`);
});

Hooks.once('setup', () => {

  Hooks.callAll(`${constants.moduleName}:afterSetup`);
});

Hooks.once("ready", () => {
  document.querySelector('html').requestFullscreen();
  Hooks.callAll(`${constants.moduleName}:afterReady`);

  
    Hooks.on("renderTokenHUD", (app, html, data) => {
      setTimeout(function() {
        var sortFunction = function(a, b) {
          var dataA = jQuery(a).data('condition');
          if (typeof dataA === 'undefined') {
            dataA = jQuery(a).find('img.pf2e-effect-control')?.data('condition');
          }
          var dataB = jQuery(b).data('condition');
          if (typeof dataB === 'undefined') {
            dataB = jQuery(b).find('img.pf2e-effect-control')?.data('condition');
          }
          if (typeof dataA !== 'undefined' && typeof dataB !== 'undefined') {
            return (dataA < dataB) ? -1 : 1;
          } 
        }
        var children = jQuery(".status-effects").children().sort(sortFunction);
        jQuery(".status-effects").empty().append(children);
        console.log('dözi | Sorting of conditions done')
      }, 250)  
    });
});

Hooks.once("canvasReady", () => {

  setTimeout(Fonts.drawDrawings, 2000);
  Hooks.callAll(`${constants.moduleName}:afterCanvasReady`);
});

Hooks.on("updateDrawing", (scene, drawing, update, options, user) => {
  if (update.fontFamily) setTimeout(Fonts.drawDrawings, 2000);
});

