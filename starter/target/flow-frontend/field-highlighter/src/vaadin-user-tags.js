/**
@license
Copyright (C) 2020 Vaadin Ltd
This program is available under Commercial Vaadin Runtime License 1.0 (CVRLv1).
For the full License, see http://vaadin.com/license/cvrl-1
*/
import { PolymerElement, html } from '@polymer/polymer/polymer-element.js';
import { Debouncer } from '@polymer/polymer/lib/utils/debounce.js';
import { timeOut } from '@polymer/polymer/lib/utils/async.js';
import { calculateSplices } from '@polymer/polymer/lib/utils/array-splice.js';
import { DirMixin } from '@vaadin/vaadin-element-mixin/vaadin-dir-mixin.js';
import { ThemableMixin } from '@vaadin/vaadin-themable-mixin/vaadin-themable-mixin.js';
import { registerStyles, css } from '@vaadin/vaadin-themable-mixin/register-styles.js';
import { OverlayElement } from '@vaadin/vaadin-overlay/vaadin-overlay.js';
import './vaadin-user-tag.js';

const DURATION = 200;
const DELAY = 2000;

const listenOnce = (elem, type) => {
  return new Promise((resolve) => {
    const listener = () => {
      elem.removeEventListener(type, listener);
      resolve();
    };
    elem.addEventListener(type, listener);
  });
};

class UserTagsOverlayElement extends OverlayElement {
  static get is() {
    return 'vaadin-user-tags-overlay';
  }

  ready() {
    super.ready();
    this.$.overlay.setAttribute('tabindex', '-1');
  }
}

customElements.define(UserTagsOverlayElement.is, UserTagsOverlayElement);

registerStyles(
  'vaadin-user-tags-overlay',
  css`
    :host {
      align-items: stretch;
      justify-content: flex-start;
      background: transparent;
      box-shadow: none;
      bottom: auto;
    }

    [part='overlay'] {
      box-shadow: none;
      background: transparent;
      position: relative;
      left: -4px;
      padding: 4px;
      outline: none;
      overflow: visible;
    }

    :host([dir='rtl']) [part='overlay'] {
      left: auto;
      right: -4px;
    }

    [part='content'] {
      padding: 0;
    }

    :host([dir='rtl']) {
      left: auto;
    }

    :host(:not([dir='rtl'])) {
      right: auto;
    }

    :host([opening]),
    :host([closing]) {
      animation: 0.14s user-tags-overlay-dummy-animation;
    }

    @keyframes user-tags-overlay-dummy-animation {
      0% {
        opacity: 1;
      }
      100% {
        opacity: 1;
      }
    }
  `
);

export class UserTags extends ThemableMixin(DirMixin(PolymerElement)) {
  static get is() {
    return 'vaadin-user-tags';
  }

  static get template() {
    return html`
      <style>
        :host {
          position: absolute;
        }

        [part='tags'] {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
        }
      </style>
      <vaadin-user-tags-overlay modeless id="overlay" opened="[[opened]]" on-vaadin-overlay-open="_onOverlayOpen">
        <template>
          <div part="tags"></div>
        </template>
      </vaadin-user-tags-overlay>
    `;
  }

  static get properties() {
    return {
      hasFocus: {
        type: Boolean,
        value: false,
        observer: '_hasFocusChanged'
      },
      opened: {
        type: Boolean,
        value: false,
        observer: '_openedChanged'
      },
      flashing: {
        type: Boolean,
        value: false
      },
      target: {
        type: Object
      },
      users: {
        type: Array,
        value: () => []
      },
      _flashQueue: {
        type: Array,
        value: () => []
      }
    };
  }

  constructor() {
    super();
    this._boundSetPosition = this._debounceSetPosition.bind(this);
  }

  connectedCallback() {
    super.connectedCallback();
    window.addEventListener('resize', this._boundSetPosition);
    window.addEventListener('scroll', this._boundSetPosition);
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    window.removeEventListener('resize', this._boundSetPosition);
    window.removeEventListener('scroll', this._boundSetPosition);
  }

  _debounceSetPosition() {
    this._debouncePosition = Debouncer.debounce(this._debouncePosition, timeOut.after(16), () => this._setPosition());
  }

  _openedChanged(opened) {
    if (opened) {
      this._setPosition();
    }
  }

  _hasFocusChanged(hasFocus) {
    if (hasFocus && this.flashing) {
      this.stopFlash();
    }
  }

  _setPosition() {
    if (!this.opened) {
      return;
    }

    const targetRect = this.target.getBoundingClientRect();

    const overlayRect = this.$.overlay.getBoundingClientRect();

    this._translateX =
      this.getAttribute('dir') === 'rtl'
        ? targetRect.right - overlayRect.right + (this._translateX || 0)
        : targetRect.left - overlayRect.left + (this._translateX || 0);
    this._translateY = targetRect.top - overlayRect.top + (this._translateY || 0) + targetRect.height;

    const devicePixelRatio = window.devicePixelRatio || 1;
    this._translateX = Math.round(this._translateX * devicePixelRatio) / devicePixelRatio;
    this._translateY = Math.round(this._translateY * devicePixelRatio) / devicePixelRatio;

    this.$.overlay.style.transform = `translate3d(${this._translateX}px, ${this._translateY}px, 0)`;
  }

  get wrapper() {
    return this.$.overlay.content.querySelector('[part="tags"]');
  }

  createUserTag(user) {
    const tag = document.createElement('vaadin-user-tag');
    tag.name = user.name;
    tag.uid = user.id;
    tag.colorIndex = user.colorIndex;
    return tag;
  }

  getTagForUser(user) {
    return Array.from(this.wrapper.children).filter((tag) => tag.uid === user.id)[0];
  }

  getChangedTags(addedUsers, removedUsers) {
    const removed = removedUsers.map((user) => this.getTagForUser(user));
    const added = addedUsers.map((user) => this.getTagForUser(user) || this.createUserTag(user));
    return { added, removed };
  }

  getChangedUsers(users, splices) {
    const usersToAdd = [];
    const usersToRemove = [];

    splices.forEach((splice) => {
      for (let i = 0; i < splice.removed.length; i++) {
        usersToRemove.push(splice.removed[i]);
      }

      for (let i = splice.addedCount - 1; i >= 0; i--) {
        usersToAdd.push(users[splice.index + i]);
      }
    });

    // filter out users that are only moved
    const addedUsers = usersToAdd.filter((u) => !usersToRemove.some((u2) => u.id === u2.id));
    const removedUsers = usersToRemove.filter((u) => !usersToAdd.some((u2) => u.id === u2.id));

    return { addedUsers, removedUsers };
  }

  applyTagsStart({ added, removed }) {
    const wrapper = this.wrapper;
    removed.forEach((tag) => {
      if (tag) {
        tag.classList.add('removing');
        tag.classList.remove('show');
      }
    });
    added.forEach((tag) => wrapper.insertBefore(tag, wrapper.firstChild));
  }

  applyTagsEnd({ added, removed }) {
    const wrapper = this.wrapper;
    removed.forEach((tag) => {
      if (tag && tag.parentNode === wrapper) {
        wrapper.removeChild(tag);
      }
    });
    added.forEach((tag) => tag && tag.classList.add('show'));
  }

  setUsers(users) {
    // Apply pending change if needed
    this.render();

    const splices = calculateSplices(users, this.users);
    if (splices.length === 0) {
      return;
    }

    const { addedUsers, removedUsers } = this.getChangedUsers(users, splices);
    if (addedUsers.length === 0 && removedUsers.length === 0) {
      return;
    }

    const changedTags = this.getChangedTags(addedUsers, removedUsers);

    // check if flash queue contains pending tags for removed users
    if (this._flashQueue.length > 0) {
      for (let i = 0; i < removedUsers.length; i++) {
        if (changedTags.removed[i] === null) {
          for (let j = 0; j < this._flashQueue.length; j++) {
            if (this._flashQueue[j].some(tag => tag.uid === removedUsers[i].id)) {
              this.splice('_flashQueue', i, 1);
            }
          }
        }
      }
    }

    if (this.opened && this.hasFocus) {
      this.updateTags(users, changedTags);
      return;
    } else if (addedUsers.length && document.visibilityState !== 'hidden') {
      // Avoid adding to queue if window is not visible.
      const tags = changedTags.added;
      if (this.flashing) {
        // schedule next flash later
        this.push('_flashQueue', tags);
      } else {
        this.flashTags(tags);
      }
      this.set('users', users);
    } else {
      this.updateTagsSync(users, changedTags);
    }
  }

  _onOverlayOpen() {
    // animate all tags except removing ones
    Array.from(this.wrapper.children).forEach((tag) => {
      if (!tag.classList.contains('removing')) {
        tag.classList.add('show');
      }
    });
  }

  flashTags(added) {
    this.flashing = true;
    const wrapper = this.wrapper;

    // hide existing tags
    const hidden = Array.from(wrapper.children);
    hidden.forEach((tag) => (tag.style.display = 'none'));

    // render new tags
    added.forEach((tag) => {
      wrapper.insertBefore(tag, wrapper.firstChild);
    });

    this.flashPromise = new Promise((resolve) => {
      listenOnce(this.$.overlay, 'vaadin-overlay-open').then(() => {
        this._debounceFlashStart = Debouncer.debounce(this._debounceFlashStart, timeOut.after(DURATION + DELAY), () => {
          // animate disappearing
          if (!this.hasFocus) {
            added.forEach((tag) => tag.classList.remove('show'));
          }
          this._debounceFlashEnd = Debouncer.debounce(this._debounceFlashEnd, timeOut.after(DURATION), () => {
            // show all tags
            const finishFlash = () => {
              hidden.forEach((tag) => (tag.style.display = 'block'));
              this.flashing = false;
              resolve();
            };

            if (this.hasFocus) {
              finishFlash();
            } else {
              // wait for overlay closing animation to complete
              listenOnce(this.$.overlay, 'animationend').then(() => {
                finishFlash();
              });

              this.opened = false;
            }
          });
        });
      });
    }).then(() => {
      if (this._flashQueue.length > 0) {
        const tags = this._flashQueue[0];
        this.splice('_flashQueue', 0, 1);
        this.flashTags(tags);
      }
    });

    this.opened = true;
  }

  stopFlash() {
    this._debounceFlashStart && this._debounceFlashStart.flush();
    this._debounceFlashEnd && this._debounceFlashEnd.flush();
    this.$.overlay._flushAnimation('closing');
  }

  updateTags(users, changed) {
    this.applyTagsStart(changed);

    this._debounceRender = Debouncer.debounce(this._debounceRender, timeOut.after(DURATION), () => {
      this.set('users', users);

      this.applyTagsEnd(changed);

      if (users.length === 0 && this.opened) {
        this.opened = false;
      }
    });
  }

  updateTagsSync(users, changed) {
    this.applyTagsStart(changed);
    this.set('users', users);
    this.applyTagsEnd(changed);
  }

  show() {
    this.hasFocus = true;
    this.opened = true;
  }

  hide() {
    this.hasFocus = false;
    this.opened = false;
  }

  render() {
    /* c8 ignore next */
    if (this._debounceRender && this._debounceRender.isActive()) {
      this._debounceRender.flush();
    }
  }
}

customElements.define(UserTags.is, UserTags);
