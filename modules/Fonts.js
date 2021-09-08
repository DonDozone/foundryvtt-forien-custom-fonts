import constants from "./constants.mjs";

export default class Fonts {
  static render(options = {settings: false}) {
    const fontFamilies = ['Cambridge', 'Esther', 'Rye'];

    fontFamilies.forEach(f => {
      if (CONFIG.fontFamilies.includes(f)) return;
      CONFIG.fontFamilies.push(f);
    });

    $('#fcf').remove();
    const fontEl = $('<style id="fcf">');
    fontEl.attr('type', `text/css`);
    fontEl.attr('media', `all`);
    fontEl.text('')
    $('head').append(fontEl);
    fontEl.on('load', () => {
      // Try to redraw drawings. If the font isn't loaded. Then wait 5 seconds and try again.
      this.drawDrawings();
      setTimeout(() => this.drawDrawings(), 5000);
      if (options.settings) {
        ui.notifications.info(game.i18n.localize('ForienCustomFonts.Notifications.FontAdded'), {permanent: true});
      }
    });
  }

  static drawDrawings() {
    canvas?.drawings?.placeables.filter(d => d.data.type === 't').forEach(d => d.draw());
  }
}
