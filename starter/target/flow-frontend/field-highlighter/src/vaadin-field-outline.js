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

export class FieldOutline extends ThemableMixin(DirMixin(PolymerElement)) {
  static get is() {
    return 'vaadin-field-outline';
  }

  static get template() {
    return html`
      <style>
        :host {
          display: block;
          box-sizing: border-box;
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          width: 100%;
          height: 100%;
          z-index: -1;
          user-select: none;
          opacity: 0;
          --_active-user-color: transparent;
        }

        :host([has-active-user]) {
          opacity: 1;
        }
      </style>
    `;
  }

  static get properties() {
    return {
      user: {
        type: Object,
        value: null,
        observer: '_userChanged'
      }
    };
  }

  ready() {
    super.ready();

    this.setAttribute('part', 'outline');

    this._field = this.getRootNode().host;
  }

  _userChanged(user) {
    const prop = '--_active-user-color';
    if (user) {
      this.setAttribute('has-active-user', '');
      const value = `var(--vaadin-user-color-${user.colorIndex})`;

      setCustomProperty(this, prop, value);
      if (this._field) {
        setCustomProperty(this._field, prop, value);
      }
    } else {
      this.removeAttribute('has-active-user');
      setCustomProperty(this, prop, 'transparent');
      if (this._field) {
        setCustomProperty(this._field, prop, 'transparent');
      }
    }
  }
}

customElements.define(FieldOutline.is, FieldOutline);
