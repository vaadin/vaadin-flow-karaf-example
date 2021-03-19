/**
@license
Copyright (C) 2020 Vaadin Ltd
This program is available under Commercial Vaadin Runtime License 1.0 (CVRLv1).
For the full License, see http://vaadin.com/license/cvrl-1
*/
import { css, registerStyles } from '@vaadin/vaadin-themable-mixin/register-styles.js';
import '@vaadin/vaadin-lumo-styles/spacing.js';
import '@vaadin/vaadin-lumo-styles/style.js';

registerStyles(
  'vaadin-field-outline',
  css`
    :host {
      transition: opacity 0.3s;
    }

    :host::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      box-shadow: 0 0 0 2px var(--_active-user-color);
      border-radius: var(--lumo-border-radius);
      transition: box-shadow 0.3s;
    }

    :host([context='vaadin-checkbox'])::before {
      box-shadow: 0 0 0 2px var(--lumo-base-color), 0 0 0 4px var(--_active-user-color);
    }

    :host([context='vaadin-radio-button'])::before {
      border-radius: 50%;
      box-shadow: 0 0 0 3px var(--lumo-base-color), 0 0 0 5px var(--_active-user-color);
    }

    :host([context='vaadin-item'])::before {
      box-shadow: inset 0 0 0 2px var(--_active-user-color);
    }

    :host([context='vaadin-text-area']) {
      display: none;
    }
  `,
  { moduleId: 'lumo-field-outline' }
);

registerStyles(
  'vaadin-text-area',
  css`
    :host([has-highlighter]) [part="input-field"] {
      box-shadow: 0 0 0 2px var(--_active-user-color);
    }
  `,
  { moduleId: 'lumo-text-area-outline' }
);
