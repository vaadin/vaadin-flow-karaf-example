/**
@license
Copyright (C) 2020 Vaadin Ltd
This program is available under Commercial Vaadin Runtime License 1.0 (CVRLv1).
For the full License, see http://vaadin.com/license/cvrl-1
*/
import { ComponentObserver } from './vaadin-component-observer.js';
import { DatePickerObserver } from './vaadin-date-picker-observer.js';
import { FieldObserver } from './vaadin-field-observer.js';

class DateObserver extends DatePickerObserver {
  constructor(datePicker, host) {
    super(datePicker);

    // fire events on the host
    this.component = host;
  }

  getFieldIndex() {
    return 0;
  }
}

class TimeObserver extends FieldObserver {
  constructor(timePicker, host) {
    super(timePicker);

    // fire events on the host
    this.component = host;
    this.timePicker = timePicker;
  }

  getFocusTarget(event) {
    return this.timePicker;
  }

  getFieldIndex() {
    return 1;
  }
}

export class DateTimePickerObserver extends ComponentObserver {
  constructor(picker) {
    super(picker);

    const [datePicker, timePicker] = this.getFields();

    this.dateObserver = new DateObserver(datePicker, picker);
    this.timeObserver = new TimeObserver(timePicker, picker);
  }

  getFields() {
    return this.component.$.customField.inputs;
  }
}
