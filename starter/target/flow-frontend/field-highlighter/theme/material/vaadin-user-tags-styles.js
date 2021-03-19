import { css, registerStyles } from '@vaadin/vaadin-themable-mixin/register-styles.js';
import '@vaadin/vaadin-material-styles/color.js';
import '@vaadin/vaadin-material-styles/shadow.js';
import '@vaadin/vaadin-material-styles/typography.js';

registerStyles(
  'vaadin-user-tag',
  css`
    :host {
      font-family: var(--material-font-family);
      font-size: 0.75rem;
      border-radius: 0.25rem;
      box-shadow: var(--material-shadow-elevation-2dp);
    }

    [part='name'] {
      background-color: var(--vaadin-user-tag-color);
      color: var(--material-primary-contrast-color);
      padding: 0.3em;
      line-height: 1;
      font-weight: 500;
      min-width: 1.75em;
    }
  `,
  { moduleId: 'material-user-tag' }
);
