import { LitElement, html, css, customElement } from 'lit-element';
import '@vaadin/vaadin-form-layout/vaadin-form-layout.js';
import '@vaadin/vaadin-form-layout/vaadin-form-item.js';
import '@vaadin/vaadin-text-field/vaadin-text-field.js';
import '@vaadin/vaadin-ordered-layout/src/vaadin-horizontal-layout.js';
import '@vaadin/vaadin-button/vaadin-button.js';

@customElement('designer-built-view')
export class DesignerBuiltView extends LitElement {
  static get styles() {
    return css`
      :host {
          display: block;
          height: 100%;
      }
      `;
  }

  render() {
    return html`
<vaadin-form-layout style="width: 100%; height: 100%;">
 <vaadin-form-item>
  <label slot="label">Basic form created by Vaadin Ds</label>
  <vaadin-text-field class="full-width" value="Example text field" required></vaadin-text-field>
 </vaadin-form-item>
 <vaadin-form-item></vaadin-form-item>
 <vaadin-form-item></vaadin-form-item>
 <vaadin-form-item></vaadin-form-item>
 <vaadin-horizontal-layout theme="spacing">
  <vaadin-button theme="primary">
    OK 
  </vaadin-button>
  <vaadin-button theme="tertiary">
    Cancel 
  </vaadin-button>
 </vaadin-horizontal-layout>
</vaadin-form-layout>
<vaadin-form-layout style="width: 100%; height: 100%;">
 <vaadin-form-item>
  <label slot="label">Example label</label>
  <vaadin-text-field class="full-width" value="Example text field" required></vaadin-text-field>
 </vaadin-form-item>
 <vaadin-form-item></vaadin-form-item>
 <vaadin-form-item></vaadin-form-item>
 <vaadin-form-item></vaadin-form-item>
 <vaadin-horizontal-layout theme="spacing">
  <vaadin-button theme="primary">
    OK 
  </vaadin-button>
  <vaadin-button theme="tertiary">
    Cancel 
  </vaadin-button>
 </vaadin-horizontal-layout>
</vaadin-form-layout>
<vaadin-form-layout style="width: 100%; height: 100%;">
 <vaadin-form-item>
  <label slot="label">Example label</label>
  <vaadin-text-field class="full-width" value="Example text field" required></vaadin-text-field>
 </vaadin-form-item>
 <vaadin-form-item></vaadin-form-item>
 <vaadin-form-item></vaadin-form-item>
 <vaadin-form-item></vaadin-form-item>
 <vaadin-horizontal-layout theme="spacing">
  <vaadin-button theme="primary">
    OK 
  </vaadin-button>
  <vaadin-button theme="tertiary">
    Cancel 
  </vaadin-button>
 </vaadin-horizontal-layout>
</vaadin-form-layout>
<vaadin-form-layout style="width: 100%; height: 100%;">
 <vaadin-form-item>
  <label slot="label">Example label</label>
  <vaadin-text-field class="full-width" value="Example text field" required></vaadin-text-field>
 </vaadin-form-item>
 <vaadin-form-item></vaadin-form-item>
 <vaadin-form-item></vaadin-form-item>
 <vaadin-form-item></vaadin-form-item>
 <vaadin-horizontal-layout theme="spacing">
  <vaadin-button theme="primary">
    OK 
  </vaadin-button>
  <vaadin-button theme="tertiary">
    Cancel 
  </vaadin-button>
 </vaadin-horizontal-layout>
</vaadin-form-layout>
<vaadin-form-layout style="width: 100%; height: 100%;">
 <vaadin-form-item>
  <label slot="label">Example label</label>
  <vaadin-text-field class="full-width" value="Example text field" required></vaadin-text-field>
 </vaadin-form-item>
 <vaadin-form-item></vaadin-form-item>
 <vaadin-form-item></vaadin-form-item>
 <vaadin-form-item></vaadin-form-item>
 <vaadin-horizontal-layout theme="spacing">
  <vaadin-button theme="primary">
    OK 
  </vaadin-button>
  <vaadin-button theme="tertiary">
    Cancel 
  </vaadin-button>
 </vaadin-horizontal-layout>
</vaadin-form-layout>
<vaadin-form-layout style="width: 100%; height: 100%;">
 <vaadin-form-item>
  <label slot="label">Example label</label>
  <vaadin-text-field class="full-width" value="Example text field" required></vaadin-text-field>
 </vaadin-form-item>
 <vaadin-form-item></vaadin-form-item>
 <vaadin-form-item></vaadin-form-item>
 <vaadin-form-item></vaadin-form-item>
 <vaadin-horizontal-layout theme="spacing">
  <vaadin-button theme="primary">
    OK 
  </vaadin-button>
  <vaadin-button theme="tertiary">
    Cancel 
  </vaadin-button>
 </vaadin-horizontal-layout>
</vaadin-form-layout>
<vaadin-form-layout style="width: 100%; height: 100%;">
 <vaadin-form-item>
  <label slot="label">Example label</label>
  <vaadin-text-field class="full-width" value="Example text field" required></vaadin-text-field>
 </vaadin-form-item>
 <vaadin-form-item></vaadin-form-item>
 <vaadin-form-item></vaadin-form-item>
 <vaadin-form-item></vaadin-form-item>
 <vaadin-horizontal-layout theme="spacing">
  <vaadin-button theme="primary">
    OK 
  </vaadin-button>
  <vaadin-button theme="tertiary">
    Cancel 
  </vaadin-button>
 </vaadin-horizontal-layout>
</vaadin-form-layout>
<vaadin-form-layout style="width: 100%; height: 100%;">
 <vaadin-form-item>
  <label slot="label">Example label</label>
  <vaadin-text-field class="full-width" value="Example text field" required></vaadin-text-field>
 </vaadin-form-item>
 <vaadin-form-item></vaadin-form-item>
 <vaadin-form-item></vaadin-form-item>
 <vaadin-form-item></vaadin-form-item>
 <vaadin-horizontal-layout theme="spacing">
  <vaadin-button theme="primary">
    OK 
  </vaadin-button>
  <vaadin-button theme="tertiary">
    Cancel 
  </vaadin-button>
 </vaadin-horizontal-layout>
</vaadin-form-layout>
<vaadin-form-layout style="width: 100%; height: 100%;">
 <vaadin-form-item>
  <label slot="label">Example label</label>
  <vaadin-text-field class="full-width" value="Example text field" required></vaadin-text-field>
 </vaadin-form-item>
 <vaadin-form-item></vaadin-form-item>
 <vaadin-form-item></vaadin-form-item>
 <vaadin-form-item></vaadin-form-item>
 <vaadin-horizontal-layout theme="spacing">
  <vaadin-button theme="primary">
    OK 
  </vaadin-button>
  <vaadin-button theme="tertiary">
    Cancel 
  </vaadin-button>
 </vaadin-horizontal-layout>
</vaadin-form-layout>
<vaadin-form-layout style="width: 100%; height: 100%;">
 <vaadin-form-item>
  <label slot="label">Example label</label>
  <vaadin-text-field class="full-width" value="Example text field" required></vaadin-text-field>
 </vaadin-form-item>
 <vaadin-form-item></vaadin-form-item>
 <vaadin-form-item></vaadin-form-item>
 <vaadin-form-item></vaadin-form-item>
 <vaadin-horizontal-layout theme="spacing">
  <vaadin-button theme="primary">
    OK 
  </vaadin-button>
  <vaadin-button theme="tertiary">
    Cancel 
  </vaadin-button>
 </vaadin-horizontal-layout>
</vaadin-form-layout>
`;
  }

  // Remove this method to render the contents of this view inside Shadow DOM
  createRenderRoot() {
    return this;
  }
}
