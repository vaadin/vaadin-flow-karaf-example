/**
@license
Copyright (C) 2020 Vaadin Ltd
This program is available under Commercial Vaadin Runtime License 1.0 (CVRLv1).
For the full License, see http://vaadin.com/license/cvrl-1
*/
const isShadyCSS = window.ShadyCSS && !window.ShadyCSS.nativeCss;

/* c8 ignore next */
const isShadyDOM = window.ShadyDOM && window.ShadyDOM.inUse;

export const setCustomProperty = (node, prop, value) => {
  /* c8 ignore next 4 */
  if (isShadyCSS) {
    window.ShadyCSS.styleSubtree(node, {
      [prop]: value
    });
  } else {
    node.style.setProperty(prop, value);
  }
}

let stylesMap = {};

export const applyShadyStyle = (node, css) => {
  /* c8 ignore next 11 */
  if (isShadyDOM) {
    const tag = node.tagName.toLowerCase();
    // create style once per class
    if (!stylesMap[tag]) {
      const style = document.createElement('style');
      const cssText = css.replace(/:host\((.+)\)/, `${tag}$1`)
      style.textContent = cssText;
      style.setAttribute('scope', tag);
      stylesMap[tag] = style;
      document.head.appendChild(style);
    }
  } else {
    const style = document.createElement('style');
    style.textContent = css;
    node.shadowRoot.appendChild(style);
  }
}
