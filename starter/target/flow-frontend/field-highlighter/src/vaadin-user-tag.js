/**
@license
Copyright (C) 2020 Vaadin Ltd
This program is available under Commercial Vaadin Runtime License 1.0 (CVRLv1).
For the full License, see http://vaadin.com/license/cvrl-1
*/
import { PolymerElement, html } from '@polymer/polymer/polymer-element.js';
import { DirMixin } from '@vaadin/vaadin-element-mixin/vaadin-dir-mixin.js';
import { ThemableMixin } from '@vaadin/vaadin-themable-mixin/vaadin-themable-mixin.js';
import { setCustomProperty } from './css-helpers.js';

export class UserTag extends ThemableMixin(DirMixin(PolymerElement)) {
  static get is() {
    return 'vaadin-user-tag';
  }

  static get template() {
    return html`
      <style>
        :host {
          display: block;
          box-sizing: border-box;
          margin: 0 0 var(--vaadin-user-tag-offset);
          opacity: 0;
          height: 1.3rem;
          transition: opacity 0.2s ease-in-out;
          background-color: var(--vaadin-user-tag-color);
          color: #fff;
          cursor: default;
          -webkit-user-select: none;
          user-select: none;
          --vaadin-user-tag-offset: 4px;
        }

        :host(.show) {
          opacity: 1;
        }

        :host(:last-of-type) {
          margin-bottom: 0;
        }

        [part='name'] {
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
          box-sizing: border-box;
          padding: 2px 4px;
          height: 1.3rem;
          font-size: 13px;
        }
      </style>
      <!-- TODO: image / avatar -->
      <div part="name">[[name]]</div>
    `;
  }

  static get properties() {
    return {
      name: {
        type: String
      },
      uid: {
        type: String
      },
      colorIndex: {
        type: Number,
        observer: '_colorIndexChanged'
      }
    };
  }

  ready() {
    super.ready();

    // Capture mousedown to prevent click on the underlying label,
    // which would result in undesirable focusing field components.
    // TODO: consider handling touchstart event in a similar way
    this.addEventListener('mousedown', this._onClick.bind(this), true);
  }

  _colorIndexChanged(index) {
    if (index != null) {
      setCustomProperty(this, '--vaadin-user-tag-color', `var(--vaadin-user-color-${index})`);
    }
  }

  _onClick(e) {
    e.preventDefault();
    this.dispatchEvent(
      new CustomEvent('user-tag-click', {
        bubbles: true,
        composed: true,
        detail: {
          name: this.name
        }
      })
    );
  }
}

customElements.define(UserTag.is, UserTag);
