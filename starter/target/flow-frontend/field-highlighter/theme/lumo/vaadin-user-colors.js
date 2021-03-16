/**
@license
Copyright (C) 2020 Vaadin Ltd
This program is available under Commercial Vaadin Runtime License 1.0 (CVRLv1).
For the full License, see http://vaadin.com/license/cvrl-1
*/
import { html } from '@polymer/polymer/lib/utils/html-tag.js';
import '@polymer/polymer/lib/elements/custom-style.js';

const userColorsStyles = html`
  <custom-style>
    <style>
      html {
        --vaadin-user-color-0: #df0b92;
        --vaadin-user-color-1: #650acc;
        --vaadin-user-color-2: #097faa;
        --vaadin-user-color-3: #ad6200;
        --vaadin-user-color-4: #bf16f3;
        --vaadin-user-color-5: #084391;
        --vaadin-user-color-6: #078836;
      }

      [theme~="dark"] {
        --vaadin-user-color-0: #ff66c7;
        --vaadin-user-color-1: #9d8aff;
        --vaadin-user-color-2: #8aff66;
        --vaadin-user-color-3: #ffbd66;
        --vaadin-user-color-4: #dc6bff;
        --vaadin-user-color-5: #66fffa;
        --vaadin-user-color-6: #e6ff66;
      }
    </style>
  </custom-style>
`;

document.head.appendChild(userColorsStyles.content);
