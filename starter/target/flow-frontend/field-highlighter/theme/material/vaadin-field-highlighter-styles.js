import { css, registerStyles } from '@vaadin/vaadin-themable-mixin/register-styles.js';

registerStyles(
  'vaadin-field-outline',
  css`
    :host {
      transition: opacity 0.3s;
    }

    :host([context$='area']),
    :host([context$='field']) {
      top: auto;
      height: 2px;
      z-index: 1;
      background-color: var(--_active-user-color);
    }

    :host([context='vaadin-checkbox']),
    :host([context='vaadin-radio-button']) {
      border-radius: 50%;
      background-color: var(--_active-user-color);
      transform: scale(2.5);
      opacity: 0.15;
    }

    :host([context='vaadin-item'])::before {
      display: block;
      height: 100%;
      content: '';
      box-shadow: inset 0 0 0 2px var(--_active-user-color);
    }
  `,
  { moduleId: 'material-field-outline' }
);
