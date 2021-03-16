/**
@license
Copyright (C) 2020 Vaadin Ltd
This program is available under Commercial Vaadin Runtime License 1.0 (CVRLv1).
For the full License, see http://vaadin.com/license/cvrl-1
*/
import { FieldObserver } from './vaadin-field-observer.js';

export class RadioGroupObserver extends FieldObserver {
  getFields() {
    return this.component._radioButtons;
  }

  getFocusTarget(event) {
    const fields = this.getFields();
    return Array.from(event.composedPath()).filter((node) => fields.indexOf(node) !== -1)[0];
  }
}
