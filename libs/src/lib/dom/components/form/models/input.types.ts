import { FormControl } from "@angular/forms";

export enum InputType {
  TEXT = 'text',
  EMAIL = 'email',
  PHONE = 'phone',
  PASSWORD = 'password',
  NUMBER = 'number',
  TEXTAREA = 'textarea',
  SELECT = 'select',
  MULTISELECT = 'multiSelect',
  CALENDAR = 'calendar',
  CHECKBOX = 'checkbox',
  CHECKBOXGROUP = 'checkboxGroup',
  RADIO = 'radio',
  TOGGLE = 'toggle',
  DATE = 'date',
  DATERANGE = 'dateRange',
  TIME = 'time',
  RANGE = 'range',
  COUNTER = 'counter',
  GROUP = 'group',
  CUSTOM = 'custom',
  SUM = 'sum',
  UPLOAD = 'upload',
  CURRENCY = 'currency',
  AUTOCOMPLETE = 'autocomplete',
  TEXEDITOR = 'texteditor',
  CLEAVE = 'cleave',
}

export interface InputChangeEvent<T = unknown> {
  key: string;
  index?: number;
  control?: FormControl;
  value?: T;
  query?: unknown;
}

