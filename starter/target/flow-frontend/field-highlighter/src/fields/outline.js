/**
@license
Copyright (C) 2020 Vaadin Ltd
This program is available under Commercial Vaadin Runtime License 1.0 (CVRLv1).
For the full License, see http://vaadin.com/license/cvrl-1
*/
import { applyShadyStyle } from '../css-helpers.js';

const getOutlineRoot = (field) => {
  switch (field.tagName.toLowerCase()) {
    /* c8 ignore next 6 */
    case 'vaadin-combo-box':
    case 'vaadin-date-picker':
    case 'vaadin-date-time-picker-date-picker':
    case 'vaadin-date-time-picker-time-picker':
    case 'vaadin-select':
    case 'vaadin-time-picker':
      return field.focusElement;
    default:
      return field;
  }
};

const getOutlineTarget = (element) => {
  switch (element.tagName.toLowerCase()) {
    /* c8 ignore next */
    case 'vaadin-text-area':
    case 'vaadin-text-field':
    case 'vaadin-password-field':
    case 'vaadin-email-field':
    case 'vaadin-number-field':
    case 'vaadin-integer-field':
    case 'vaadin-big-decimal-field':
    case 'vaadin-select-text-field':
    case 'vaadin-date-picker-text-field':
    case 'vaadin-time-picker-text-field':
    case 'vaadin-date-time-picker-date-text-field':
    case 'vaadin-date-time-picker-time-text-field':
      return element.shadowRoot.querySelector('[part="input-field"]');
    /* c8 ignore next */
    case 'vaadin-checkbox':
      return element.shadowRoot.querySelector('[part="checkbox"]');
    /* c8 ignore next */
    case 'vaadin-radio-button':
      return element.shadowRoot.querySelector('[part="radio"]');
    /* c8 ignore next */
    default:
      return element;
  }
};

const fields = new WeakMap();

export const initOutline = (field) => {
  if (!fields.has(field)) {
    // Get root component to apply styles
    const root = getOutlineRoot(field);

    // Get target to attach instance
    const target = getOutlineTarget(root);

    // Some components set this, but not all
    target.style.position = 'relative';

    const style = `
      :host([active]) [part="outline"],
      :host([focus-ring]) [part="outline"] {
        display: none;
      }
    `;
    applyShadyStyle(root, style);

    const outline = document.createElement('vaadin-field-outline');
    (target === field ? field.shadowRoot : target).appendChild(outline);

    // Mimic :host-context to apply styles
    outline.setAttribute('context', root.tagName.toLowerCase());

    fields.set(field, { root, target, outline });
  }

  return fields.get(field);
};
