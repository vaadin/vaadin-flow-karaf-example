(window.webpackJsonp=window.webpackJsonp||[]).push([[3],{194:function(e,t){!function(){const e=function(e){return window.Vaadin.Flow.tryCatchWrapper(e,"Vaadin Date Picker","vaadin-date-picker")};class t{constructor(e){this.initial=e,this.index=0,this.value=0}static compare(e,t){return e.index<t.index?-1:e.index>t.index?1:0}}window.Vaadin.Flow.datepickerConnector={initLazy:n=>e((function(n){if(n.$connector)return;n.$connector={},n.$connector.dayPart=new t("22"),n.$connector.monthPart=new t("11"),n.$connector.yearPart=new t("1987"),n.$connector.parts=[n.$connector.dayPart,n.$connector.monthPart,n.$connector.yearPart];let i="en-us";n.addEventListener("blur",e(e=>{!e.target.value&&e.target.invalid&&console.warn("Invalid value in the DatePicker.")}));const a=e((function(e){return e.replace(/[^\x00-\x7F]/g,"")})),r=e((function(){let e="";try{e=n._inputValue}catch(t){e=n.value||""}return e}));n.$connector.setLocale=e((function(o){try{(new Date).toLocaleDateString(o)}catch(e){o="en-US",console.warn("The locale is not supported, using default locale setting(en-US).")}let s=!1,c=r();"undefined"!==n.i18n.parseDate&&c&&(s=n.i18n.parseDate(c));let d=new Date(Date.UTC(n.$connector.yearPart.initial,n.$connector.monthPart.initial-1,n.$connector.dayPart.initial)),l=a(d.toLocaleDateString(o,{timeZone:"UTC"}));n.$connector.parts.forEach((function(e){e.index=l.indexOf(e.initial)})),n.$connector.parts.sort(t.compare),n.$connector.regex=l.replace(/[-[\]{}()*+?.,\\^$|#\s]/g,"\\$&").replace(n.$connector.dayPart.initial,"(\\d{1,2})").replace(n.$connector.monthPart.initial,"(\\d{1,2})").replace(n.$connector.yearPart.initial,"(\\d{1,4})"),n.i18n.formatDate=e((function(e){let t=n._parseDate(`${e.year}-${e.month+1}-${e.day}`);return t.setHours(12),a(t.toLocaleDateString(o))})),n.i18n.parseDate=e((function(e){if(0==(e=a(e)).length)return;let t=e.match(n.$connector.regex);if(t&&4==t.length){for(let e=1;e<4;e++)n.$connector.parts[e-1].value=parseInt(t[e]);return{day:n.$connector.dayPart.value,month:n.$connector.monthPart.value-1,year:n.$connector.yearPart.value}}return!1})),""===c?i=o:s&&(n._selectedDate=n._parseDate(`${s.year}-${s.month+1}-${s.day}`))}))}))(n)}}()},195:function(e,t){window.Vaadin=window.Vaadin||{},window.Vaadin.Flow=window.Vaadin.Flow||{},window.Vaadin.Flow.dndConnector={__ondragenterListener:function(e){const t=e.currentTarget.__dropEffect;e.currentTarget.hasAttribute("disabled")||(t&&(e.dataTransfer.dropEffect=t),t&&"none"!==t&&(e.currentTarget.classList.contains("v-drag-over-target")?e.currentTarget["__skip-leave"]=!0:e.currentTarget.classList.add("v-drag-over-target"),e.preventDefault(),e.stopPropagation()))},__ondragoverListener:function(e){if(!e.currentTarget.hasAttribute("disabled")){const t=e.currentTarget.__dropEffect;t&&(e.dataTransfer.dropEffect=t),e.preventDefault(),e.stopPropagation()}},__ondragleaveListener:function(e){e.currentTarget["__skip-leave"]?e.currentTarget["__skip-leave"]=!1:e.currentTarget.classList.remove("v-drag-over-target"),e.stopPropagation()},__ondropListener:function(e){const t=e.currentTarget.__dropEffect;t&&(e.dataTransfer.dropEffect=t),e.currentTarget.classList.remove("v-drag-over-target"),e.preventDefault(),e.stopPropagation()},updateDropTarget:function(e){e.__active?(e.addEventListener("dragenter",this.__ondragenterListener,!1),e.addEventListener("dragover",this.__ondragoverListener,!1),e.addEventListener("dragleave",this.__ondragleaveListener,!1),e.addEventListener("drop",this.__ondropListener,!1)):(e.removeEventListener("dragenter",this.__ondragenterListener,!1),e.removeEventListener("dragover",this.__ondragoverListener,!1),e.removeEventListener("dragleave",this.__ondragleaveListener,!1),e.removeEventListener("drop",this.__ondropListener,!1),e.classList.remove("v-drag-over-target"))},__dragstartListener:function(e){e.stopPropagation(),e.dataTransfer.setData("text/plain",""),e.currentTarget.hasAttribute("disabled")?e.preventDefault():(e.currentTarget.__effectAllowed&&(e.dataTransfer.effectAllowed=e.currentTarget.__effectAllowed),e.currentTarget.classList.add("v-dragged"))},__dragendListener:function(e){e.currentTarget.classList.remove("v-dragged")},updateDragSource:function(e){e.draggable?(e.addEventListener("dragstart",this.__dragstartListener,!1),e.addEventListener("dragend",this.__dragendListener,!1)):(e.removeEventListener("dragstart",this.__dragstartListener,!1),e.removeEventListener("dragend",this.__dragendListener,!1))}}},197:function(e,t){!function(){const e=function(e){return window.Vaadin.Flow.tryCatchWrapper(e,"Vaadin Grid Pro","vaadin-grid-pro")};window.Vaadin.Flow.gridProConnector={setEditModeRenderer:(t,n)=>e((function(t,n){t.editModeRenderer=e((function(e){e.appendChild(n),this._grid._cancelStopEdit(),n.focus()})),t._setEditorValue=function(e,t){},t._getEditorValue=function(e){}}))(t,n),patchEditModeRenderer:t=>e((function(t){t.__editModeRenderer=e((function(e,t,n){const i=e.assignedSlot.parentNode,a=t._grid;if(a.__edited&&a.__edited.model.item.key!==n.item.key)return void a._stopEdit();const r=t._getEditorTagName(i);e.firstElementChild&&e.firstElementChild.localName.toLowerCase()===r||(e.innerHTML=`<${r}></${r}>`)}))}))(t)}}()},198:function(e,t){window.Vaadin.Flow.menubarConnector={initLazy:function(e){var t;e.$connector||(e.$connector={updateButtons:(t=function(){e.shadowRoot?(e.items.forEach(e=>e.disabled=e.component.disabled),e.items=e.items.filter(e=>!e.component.hidden),e._buttons.forEach(e=>{e.item&&e.item.component&&e.addEventListener("click",t=>{-1===t.composedPath().indexOf(e.item.component)&&e.item.component.click()})})):setTimeout(()=>e.$connector.updateButtons())},window.Vaadin.Flow.tryCatchWrapper(t,"Vaadin Menu Bar","vaadin-menu-bar"))})}}},199:function(e,t){!function(){const e=function(e){return window.Vaadin.Flow.tryCatchWrapper(e,"Vaadin Select","vaadin-select")};window.Vaadin.Flow.selectConnector={initLazy:t=>e((function(t){const n=e((function(){for(let e=0;e<t.childElementCount;e++){const n=t.children[e];if("VAADIN-LIST-BOX"===n.tagName.toUpperCase())return n}}));t.$connector||(t.$connector={},t.renderer=e((function(e){const t=n();t&&(e.firstChild&&e.removeChild(e.firstChild),e.appendChild(t))})))}))(t)}}()},200:function(e,t){!function(){const e=function(e){return window.Vaadin.Flow.tryCatchWrapper(e,"Vaadin Time Picker","vaadin-time-picker")};window.Vaadin.Flow.timepickerConnector={initLazy:t=>e((function(t){if(t.$connector)return;t.$connector={};const n=function(e,t){const n=t.toLocaleTimeString(e);let i=n.match(/[^\d\u0660-\u0669]+$/g);return i||(i=n.match(/^[^\d\u0660-\u0669]+/g)),i&&(i=i[0].trim()),i},i=new Date("August 19, 1975 23:15:30"),a=new Date("August 19, 1975 05:15:30"),r={"\\u0660":"0","\\u0661":"1","\\u0662":"2","\\u0663":"3","\\u0664":"4","\\u0665":"5","\\u0666":"6","\\u0667":"7","\\u0668":"8","\\u0669":"9"},o=function(e){return e.replace(/[\u0660-\u0669]/g,(function(e){const t="\\u0"+e.charCodeAt(0).toString(16);return r[t]}))},s=function(e){return parseInt(o(e))},c=/[[\.][\d\u0660-\u0669]{1,3}$/;t.$connector.setLocale=e((function(r){let d;t.value&&""!==t.value&&(d=t.i18n.parseTime(t.value));try{i.toLocaleTimeString(r)}catch(e){throw r="en-US",new Error("vaadin-time-picker: The locale "+r+" is not supported, falling back to default locale setting(en-US).")}const l=function(e){return n(e,i)}(r),u=function(e){return n(e,a)}(r);let h=i.toLocaleTimeString(r);l&&h.startsWith(l)&&(h=h.replace(l,""));const p=h.match(/[^\u0660-\u0669\s\d]/),f=new RegExp("([\\d\\u0660-\\u0669]){1,2}(?:"+p+")?","g"),m=function(){return t.step&&t.step<1};let g,v;let y,_;t.i18n={formatTime:e((function(e){if(e){let n=new Date;n.setHours(e.hours),n.setMinutes(e.minutes),n.setSeconds(void 0!==e.seconds?e.seconds:0);let i=n.toLocaleTimeString(r,(v&&g===t.step||(v={hour:"numeric",minute:"numeric",second:t.step&&t.step<60?"numeric":void 0},g=t.step),v));return i=function(e,t){if(m()){let n=e;if(e.endsWith(u)?n=e.replace(" "+u,""):e.endsWith(l)&&(n=e.replace(" "+l,"")),t){let e=t<10?"0":"";e+=t<100?"0":"",e+=t,n+="."+e}else n+=".000";return e.endsWith(u)?n=n+" "+u:e.endsWith(l)&&(n=n+" "+l),n}return e}(i,e.milliseconds),i}})),parseTime:e((function(e){if(e&&e===y&&_)return _;if(e){const n=e.search(l),i=e.search(u);let a=e.replace(u,"").replace(l,"").trim();f.lastIndex=0;let r=f.exec(a);if(r){r=s(r[0].replace(p,"")),n!==i&&(12===r&&-1!==i?r=0:r+=-1!==n&&12!==r?12:0);const d=f.exec(a),l=d&&f.exec(a);let u=l&&m()&&c.exec(a);return u&&u.index<=l.index&&(u=void 0),_=void 0!==r&&{hours:r,minutes:d?s(d[0].replace(p,"")):0,seconds:l?s(l[0].replace(p,"")):0,milliseconds:d&&l&&u?(t=u[0].replace(".",""),1===(t=o(t)).length?t+="00":2===t.length&&(t+="0"),parseInt(t)):0},y=e,_}}var t}))},d&&function e(t,n,i=0){t()?n():setTimeout(()=>e(t,n,200),i)}(()=>t.shadowRoot,()=>{const e=t.i18n.formatTime(d);t.__inputElement.value!==e&&(t.__inputElement.value=e,t.__dropdownElement.value=e,t.__onInputChange())})}))}))(t)}}()},201:function(e,t){!function(){let e;customElements.whenDefined("vaadin-text-field").then(()=>{class t extends(customElements.get("vaadin-text-field")){static get template(){return e||(e=super.template.cloneNode(!0),e.innerHTML+='<style>\n                  :host {\n                    width: 8em;\n                  }\n\n                  :host([dir="rtl"]) [part="input-field"] {\n                    direction: ltr;\n                  }\n\n                  :host([dir="rtl"]) [part="value"]::placeholder {\n                    direction: rtl;\n                  }\n\n                  :host([dir="rtl"]) [part="input-field"] ::slotted(input)::placeholder {\n                    direction: rtl;\n                  }\n\n                  :host([dir="rtl"]) [part="value"]:-ms-input-placeholder,\n                  :host([dir="rtl"]) [part="input-field"] ::slotted(input):-ms-input-placeholder {\n                    direction: rtl;\n                  }\n\n                  :host([dir="rtl"]:not([has-controls])) [part="value"]::placeholder {\n                    text-align: left;\n                  }\n\n                  :host([dir="rtl"]:not([has-controls])) [part="input-field"] ::slotted(input)::placeholder {\n                    text-align: left;\n                  }\n\n                  :host([dir="rtl"]:not([has-controls])) [part="value"]:-ms-input-placeholder,\n                  :host([dir="rtl"]:not([has-controls])) [part="input-field"] ::slotted(input):-ms-input-placeholder {\n                    text-align: left;\n                  }\n\n                  :host([dir="rtl"]) [part="value"],\n                  :host([dir="rtl"]) [part="input-field"] ::slotted(input) {\n                    --_lumo-text-field-overflow-mask-image: linear-gradient(to left, transparent, #000 1.25em) !important;\n                  }\n            </style>'),e}static get is(){return"vaadin-big-decimal-field"}static get properties(){return{_decimalSeparator:{type:String,value:".",observer:"__decimalSeparatorChanged"}}}ready(){super.ready(),this.inputElement.setAttribute("inputmode","decimal")}__decimalSeparatorChanged(e,t){this._enabledCharPattern="[\\d-+"+e+"]",this.value&&t&&(this.value=this.value.split(t).join(e))}}customElements.define(t.is,t)})}()},265:function(e,t,n){"use strict";n.r(t),n.d(t,"addCssBlock",(function(){return U}));n(111),n(134);var i=n(36),a=n(37),r=n(89);!function(){const e=function(e){return window.Vaadin.Flow.tryCatchWrapper(e,"Vaadin Combo Box","vaadin-combo-box")};window.Vaadin.Flow.comboBoxConnector={initLazy:t=>e((function(t){if(t.$connector)return;t.$connector={};const n={};let r={},o="";const s=new window.Vaadin.ComboBoxPlaceholder,c=Math.max(2*t.pageSize,500),d=(()=>{let e="",n=!1;return{needsDataCommunicatorReset:()=>n=!0,getLastFilterSentToServer:()=>e,requestData:(i,a,r)=>{const o=a-i,s=r.filter;t.$server.setRequestedRange(i,o,s),e=s,n&&(t.$server.resetDataCommunicator(),n=!1)}}})(),l=(e=Object.keys(n))=>{e.forEach(e=>{n[e]([],t.size),delete n[e];const i=parseInt(e)*t.pageSize,a=i+t.pageSize,r=Math.min(a,t.filteredItems.length);for(let e=i;e<r;e++)t.filteredItems[e]=s})};t.dataProvider=function(e,s){if(e.pageSize!=t.pageSize)throw"Invalid pageSize";if(t._clientSideFilter){if(r[0])return void g(r[0],s);e.filter=""}if(e.filter!==o)return r={},o=e.filter,void(this._debouncer=i.a.debounce(this._debouncer,a.d.after(500),()=>{if(d.getLastFilterSentToServer()===e.filter&&d.needsDataCommunicatorReset(),e.filter!==o)throw new Error("Expected params.filter to be '"+o+"' but was '"+e.filter+"'");l(),t.dataProvider(e,s)}));if(r[e.page])m(e.page,s);else{n[e.page]=s;const r=Object.keys(n).map(e=>parseInt(e)),o=Math.min(...r),u=Math.max(...r);if(r.length*e.pageSize>c)e.page===o?l([String(u)]):l([String(o)]),t.dataProvider(e,s);else if(u-o+1!==r.length)l();else{const t=e.pageSize*o,n=e.pageSize*(u+1);this._debouncer&&this._debouncer.isActive()?this._debouncer=i.a.debounce(this._debouncer,a.d.after(200),()=>d.requestData(t,n,e)):d.requestData(t,n,e)}}},t.$connector.filter=e((function(e,n){return n=n?n.toString().toLowerCase():"",t._getItemLabel(e).toString().toLowerCase().indexOf(n)>-1})),t.$connector.set=e((function(e,i,a){if(a!=d.getLastFilterSentToServer())return;if(e%t.pageSize!=0)throw"Got new data to index "+e+" which is not aligned with the page size of "+t.pageSize;if(0===e&&0===i.length&&n[0])return void(r[0]=[]);const o=e/t.pageSize,s=Math.ceil(i.length/t.pageSize);for(let e=0;e<s;e++){let n=o+e,a=i.slice(e*t.pageSize,(e+1)*t.pageSize);r[n]=a}})),t.$connector.updateData=e((function(e){for(let n=0;n<e.length;n++){let i=e[n];for(let e=0;e<t.filteredItems.length;e++)if(t.filteredItems[e].key===i.key){t.set("filteredItems."+e,i);break}}})),t.$connector.updateSize=e((function(e){t._clientSideFilter||(t.size=e)})),t.$connector.reset=e((function(){l(),r={},t.clearCache()})),t.$connector.confirm=e((function(e,i){if(i!=d.getLastFilterSentToServer())return;let a=Object.getOwnPropertyNames(n);for(let e=0;e<a.length;e++){let t=a[e];r[t]&&m(t,n[t])}t.$server.confirmUpdate(e)})),customElements.whenDefined("vaadin-combo-box").then(e(()=>{const e=t.$.overlay._isItemSelected;t.$.overlay._isItemSelected=(n,i,a)=>{let r=e.call(t,n,i,a);return t._selectedKey&&(t.filteredItems.indexOf(i)>-1?delete t._selectedKey:r=r||n.key===t._selectedKey),r}})),t.$connector.enableClientValidation=e((function(e){let n=null;t.$&&(n=t.$.input),n?(e?(f(t),p(n)):(u(t),h(n,t)),t.validate()):setTimeout((function(){t.$connector.enableClientValidation(e)}),10)}));const u=e((function(e){void 0===e.$checkValidity&&(e.$checkValidity=e.checkValidity,e.checkValidity=function(){return!t.invalid}),void 0===e.$validate&&(e.$validate=e.validate,e.validate=function(){return!(t.focusElement.invalid=t.invalid)})})),h=e((function(e,t){void 0===e.$checkValidity&&(e.$checkValidity=e.checkValidity,e.checkValidity=function(){return!t.invalid})})),p=e((function(e){e.$checkValidity&&(e.checkValidity=e.$checkValidity,delete e.$checkValidity)})),f=e((function(e){e.$checkValidity&&(e.checkValidity=e.$checkValidity,delete e.$checkValidity),e.$validate&&(e.validate=e.$validate,delete e.$validate)})),m=e((function(e,n){let i=r[e];t._clientSideFilter?g(i,n):(delete r[e],n(i,t.size))})),g=e((function(e,n){let i=e;t.filter&&(i=e.filter(e=>t.$connector.filter(e,t.filter))),n(i,i.length)}));t.addEventListener("opened-changed",e(e=>{e.detail.value&&(t.$.overlay._selector._manageFocus=()=>{})})),t.addEventListener("custom-value-set",e(e=>e.preventDefault()))}))(t)}}(),window.Vaadin.ComboBoxPlaceholder=r.a;n(53);var o=n(56);!function(){const e=function(e){return window.Vaadin.Flow.tryCatchWrapper(e,"Vaadin Context Menu","vaadin-context-menu-flow")};window.Vaadin.Flow.contextMenuConnector={init:t=>e((function(t){t.$contextMenuConnector||(t.$contextMenuConnector={openOnHandler:e((function(e){e.preventDefault(),e.stopPropagation(),this.$contextMenuConnector.openEvent=e;let n={};t.getContextMenuBeforeOpenDetail&&(n=t.getContextMenuBeforeOpenDetail(e)),t.dispatchEvent(new CustomEvent("vaadin-context-menu-before-open",{detail:n}))})),updateOpenOn:e((function(n){this.removeListener(),this.openOnEventType=n,customElements.whenDefined("vaadin-context-menu").then(e(()=>{o.b[n]?o.a(t,n,this.openOnHandler):t.addEventListener(n,this.openOnHandler)}))})),removeListener:e((function(){this.openOnEventType&&(o.b[this.openOnEventType]?o.e(t,this.openOnEventType,this.openOnHandler):t.removeEventListener(this.openOnEventType,this.openOnHandler))})),openMenu:e((function(e){e.open(this.openEvent)})),removeConnector:e((function(){this.removeListener(),t.$contextMenuConnector=void 0}))})}))(t),generateItems:(t,n,i)=>e((function(e,t,n){e._containerNodeId=n;const i=function(e){const n=function(e){try{return window.Vaadin.Flow.clients[t].getByNodeId(e)}catch(n){console.error("Could not get node %s from app %s",e,t),console.error(n)}}(e._containerNodeId);return n&&Array.from(n.children).map(e=>{const t={component:e,checked:e._checked};return"VAADIN-CONTEXT-MENU-ITEM"==e.tagName&&e._containerNodeId&&(t.children=i(e)),e._item=t,t})},a=i(e);e.items=a}))(t,n,i),setChecked:(t,n)=>e((function(e,t){e._item&&(e._item.checked=t)}))(t,n)}}();n(194),n(195);var s=n(33);n(20);
/**
@license
Copyright (C) 2020 Vaadin Ltd
This program is available under Commercial Vaadin Runtime License 1.0 (CVRLv1).
For the full License, see http://vaadin.com/license/cvrl-1
*/
const c=s.a`
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
`;document.head.appendChild(c.content);var d=n(16);n(25),n(34),n(39),n(26);
/**
@license
Copyright (C) 2020 Vaadin Ltd
This program is available under Commercial Vaadin Runtime License 1.0 (CVRLv1).
For the full License, see http://vaadin.com/license/cvrl-1
*/
Object(d.b)("vaadin-user-tags-overlay",d.a`
    [part='overlay'] {
      will-change: opacity, transform;
    }

    :host([opening]) [part='overlay'] {
      animation: 0.1s lumo-user-tags-enter ease-out both;
    }

    @keyframes lumo-user-tags-enter {
      0% {
        opacity: 0;
      }
    }

    :host([closing]) [part='overlay'] {
      animation: 0.1s lumo-user-tags-exit both;
    }

    @keyframes lumo-user-tags-exit {
      100% {
        opacity: 0;
      }
    }
  `,{moduleId:"lumo-user-tags-overlay"}),Object(d.b)("vaadin-user-tag",d.a`
    :host {
      font-family: var(--lumo-font-family);
      font-size: var(--lumo-font-size-xxs);
      border-radius: var(--lumo-border-radius-s);
      box-shadow: var(--lumo-box-shadow-xs);
      --vaadin-user-tag-offset: var(--lumo-space-xs);
    }

    [part='name'] {
      color: var(--lumo-primary-contrast-color);
      padding: 0.3em calc(0.3em + var(--lumo-border-radius-s) / 4);
      line-height: 1;
      font-weight: 500;
      min-width: calc(var(--lumo-line-height-xs) * 1em + 0.45em);
    }
  `,{moduleId:"lumo-user-tag"});var l=n(31),u=n(84),h=n(50),p=n(32),f=n(196);
/**
@license
Copyright (C) 2020 Vaadin Ltd
This program is available under Commercial Vaadin Runtime License 1.0 (CVRLv1).
For the full License, see http://vaadin.com/license/cvrl-1
*/
const m=window.ShadyCSS&&!window.ShadyCSS.nativeCss,g=window.ShadyDOM&&window.ShadyDOM.inUse,v=(e,t,n)=>{m?window.ShadyCSS.styleSubtree(e,{[t]:n}):e.style.setProperty(t,n)};let y={};
/**
@license
Copyright (C) 2020 Vaadin Ltd
This program is available under Commercial Vaadin Runtime License 1.0 (CVRLv1).
For the full License, see http://vaadin.com/license/cvrl-1
*/
class _ extends(Object(p.a)(Object(h.a)(l.a))){static get is(){return"vaadin-user-tag"}static get template(){return l.b`
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
    `}static get properties(){return{name:{type:String},uid:{type:String},colorIndex:{type:Number,observer:"_colorIndexChanged"}}}ready(){super.ready(),this.addEventListener("mousedown",this._onClick.bind(this),!0)}_colorIndexChanged(e){null!=e&&v(this,"--vaadin-user-tag-color",`var(--vaadin-user-color-${e})`)}_onClick(e){e.preventDefault(),this.dispatchEvent(new CustomEvent("user-tag-click",{bubbles:!0,composed:!0,detail:{name:this.name}}))}}customElements.define(_.is,_);
/**
@license
Copyright (C) 2020 Vaadin Ltd
This program is available under Commercial Vaadin Runtime License 1.0 (CVRLv1).
For the full License, see http://vaadin.com/license/cvrl-1
*/
const b=(e,t)=>new Promise(n=>{const i=()=>{e.removeEventListener(t,i),n()};e.addEventListener(t,i)});class w extends f.a{static get is(){return"vaadin-user-tags-overlay"}ready(){super.ready(),this.$.overlay.setAttribute("tabindex","-1")}}customElements.define(w.is,w),Object(d.b)("vaadin-user-tags-overlay",d.a`
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
  `);class x extends(Object(p.a)(Object(h.a)(l.a))){static get is(){return"vaadin-user-tags"}static get template(){return l.b`
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
    `}static get properties(){return{hasFocus:{type:Boolean,value:!1,observer:"_hasFocusChanged"},opened:{type:Boolean,value:!1,observer:"_openedChanged"},flashing:{type:Boolean,value:!1},target:{type:Object},users:{type:Array,value:()=>[]},_flashQueue:{type:Array,value:()=>[]}}}constructor(){super(),this._boundSetPosition=this._debounceSetPosition.bind(this)}connectedCallback(){super.connectedCallback(),window.addEventListener("resize",this._boundSetPosition),window.addEventListener("scroll",this._boundSetPosition)}disconnectedCallback(){super.disconnectedCallback(),window.removeEventListener("resize",this._boundSetPosition),window.removeEventListener("scroll",this._boundSetPosition)}_debounceSetPosition(){this._debouncePosition=i.a.debounce(this._debouncePosition,a.d.after(16),()=>this._setPosition())}_openedChanged(e){e&&this._setPosition()}_hasFocusChanged(e){e&&this.flashing&&this.stopFlash()}_setPosition(){if(!this.opened)return;const e=this.target.getBoundingClientRect(),t=this.$.overlay.getBoundingClientRect();this._translateX="rtl"===this.getAttribute("dir")?e.right-t.right+(this._translateX||0):e.left-t.left+(this._translateX||0),this._translateY=e.top-t.top+(this._translateY||0)+e.height;const n=window.devicePixelRatio||1;this._translateX=Math.round(this._translateX*n)/n,this._translateY=Math.round(this._translateY*n)/n,this.$.overlay.style.transform=`translate3d(${this._translateX}px, ${this._translateY}px, 0)`}get wrapper(){return this.$.overlay.content.querySelector('[part="tags"]')}createUserTag(e){const t=document.createElement("vaadin-user-tag");return t.name=e.name,t.uid=e.id,t.colorIndex=e.colorIndex,t}getTagForUser(e){return Array.from(this.wrapper.children).filter(t=>t.uid===e.id)[0]}getChangedTags(e,t){const n=t.map(e=>this.getTagForUser(e));return{added:e.map(e=>this.getTagForUser(e)||this.createUserTag(e)),removed:n}}getChangedUsers(e,t){const n=[],i=[];t.forEach(t=>{for(let e=0;e<t.removed.length;e++)i.push(t.removed[e]);for(let i=t.addedCount-1;i>=0;i--)n.push(e[t.index+i])});return{addedUsers:n.filter(e=>!i.some(t=>e.id===t.id)),removedUsers:i.filter(e=>!n.some(t=>e.id===t.id))}}applyTagsStart({added:e,removed:t}){const n=this.wrapper;t.forEach(e=>{e&&(e.classList.add("removing"),e.classList.remove("show"))}),e.forEach(e=>n.insertBefore(e,n.firstChild))}applyTagsEnd({added:e,removed:t}){const n=this.wrapper;t.forEach(e=>{e&&e.parentNode===n&&n.removeChild(e)}),e.forEach(e=>e&&e.classList.add("show"))}setUsers(e){this.render();const t=Object(u.a)(e,this.users);if(0===t.length)return;const{addedUsers:n,removedUsers:i}=this.getChangedUsers(e,t);if(0===n.length&&0===i.length)return;const a=this.getChangedTags(n,i);if(this._flashQueue.length>0)for(let e=0;e<i.length;e++)if(null===a.removed[e])for(let t=0;t<this._flashQueue.length;t++)this._flashQueue[t].some(t=>t.uid===i[e].id)&&this.splice("_flashQueue",e,1);if(this.opened&&this.hasFocus)this.updateTags(e,a);else if(n.length&&"hidden"!==document.visibilityState){const t=a.added;this.flashing?this.push("_flashQueue",t):this.flashTags(t),this.set("users",e)}else this.updateTagsSync(e,a)}_onOverlayOpen(){Array.from(this.wrapper.children).forEach(e=>{e.classList.contains("removing")||e.classList.add("show")})}flashTags(e){this.flashing=!0;const t=this.wrapper,n=Array.from(t.children);n.forEach(e=>e.style.display="none"),e.forEach(e=>{t.insertBefore(e,t.firstChild)}),this.flashPromise=new Promise(t=>{b(this.$.overlay,"vaadin-overlay-open").then(()=>{this._debounceFlashStart=i.a.debounce(this._debounceFlashStart,a.d.after(2200),()=>{this.hasFocus||e.forEach(e=>e.classList.remove("show")),this._debounceFlashEnd=i.a.debounce(this._debounceFlashEnd,a.d.after(200),()=>{const e=()=>{n.forEach(e=>e.style.display="block"),this.flashing=!1,t()};this.hasFocus?e():(b(this.$.overlay,"animationend").then(()=>{e()}),this.opened=!1)})})})}).then(()=>{if(this._flashQueue.length>0){const e=this._flashQueue[0];this.splice("_flashQueue",0,1),this.flashTags(e)}}),this.opened=!0}stopFlash(){this._debounceFlashStart&&this._debounceFlashStart.flush(),this._debounceFlashEnd&&this._debounceFlashEnd.flush(),this.$.overlay._flushAnimation("closing")}updateTags(e,t){this.applyTagsStart(t),this._debounceRender=i.a.debounce(this._debounceRender,a.d.after(200),()=>{this.set("users",e),this.applyTagsEnd(t),0===e.length&&this.opened&&(this.opened=!1)})}updateTagsSync(e,t){this.applyTagsStart(t),this.set("users",e),this.applyTagsEnd(t)}show(){this.hasFocus=!0,this.opened=!0}hide(){this.hasFocus=!1,this.opened=!1}render(){this._debounceRender&&this._debounceRender.isActive()&&this._debounceRender.flush()}}customElements.define(x.is,x),
/**
@license
Copyright (C) 2020 Vaadin Ltd
This program is available under Commercial Vaadin Runtime License 1.0 (CVRLv1).
For the full License, see http://vaadin.com/license/cvrl-1
*/
/**
@license
Copyright (C) 2020 Vaadin Ltd
This program is available under Commercial Vaadin Runtime License 1.0 (CVRLv1).
For the full License, see http://vaadin.com/license/cvrl-1
*/
Object(d.b)("vaadin-field-outline",d.a`
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
  `,{moduleId:"lumo-field-outline"}),Object(d.b)("vaadin-text-area",d.a`
    :host([has-highlighter]) [part="input-field"] {
      box-shadow: 0 0 0 2px var(--_active-user-color);
    }
  `,{moduleId:"lumo-text-area-outline"});var C=n(90);
/**
@license
Copyright (C) 2020 Vaadin Ltd
This program is available under Commercial Vaadin Runtime License 1.0 (CVRLv1).
For the full License, see http://vaadin.com/license/cvrl-1
*/const E=new WeakMap,$=e=>{if(!E.has(e)){const t=(e=>{switch(e.tagName.toLowerCase()){case"vaadin-combo-box":case"vaadin-date-picker":case"vaadin-date-time-picker-date-picker":case"vaadin-date-time-picker-time-picker":case"vaadin-select":case"vaadin-time-picker":return e.focusElement;default:return e}})(e),n=(e=>{switch(e.tagName.toLowerCase()){case"vaadin-text-area":case"vaadin-text-field":case"vaadin-password-field":case"vaadin-email-field":case"vaadin-number-field":case"vaadin-integer-field":case"vaadin-big-decimal-field":case"vaadin-select-text-field":case"vaadin-date-picker-text-field":case"vaadin-time-picker-text-field":case"vaadin-date-time-picker-date-text-field":case"vaadin-date-time-picker-time-text-field":return e.shadowRoot.querySelector('[part="input-field"]');case"vaadin-checkbox":return e.shadowRoot.querySelector('[part="checkbox"]');case"vaadin-radio-button":return e.shadowRoot.querySelector('[part="radio"]');default:return e}})(t);n.style.position="relative";((e,t)=>{if(g){const n=e.tagName.toLowerCase();if(!y[n]){const e=document.createElement("style"),i=t.replace(/:host\((.+)\)/,n+"$1");e.textContent=i,e.setAttribute("scope",n),y[n]=e,document.head.appendChild(e)}}else{const n=document.createElement("style");n.textContent=t,e.shadowRoot.appendChild(n)}})(t,'\n      :host([active]) [part="outline"],\n      :host([focus-ring]) [part="outline"] {\n        display: none;\n      }\n    ');const i=document.createElement("vaadin-field-outline");(n===e?e.shadowRoot:n).appendChild(i),i.setAttribute("context",t.tagName.toLowerCase()),E.set(e,{root:t,target:n,outline:i})}return E.get(e)};
/**
@license
Copyright (C) 2020 Vaadin Ltd
This program is available under Commercial Vaadin Runtime License 1.0 (CVRLv1).
For the full License, see http://vaadin.com/license/cvrl-1
*/
class I{constructor(e){this.component=e,this.initTags(e)}getFields(){return[this.component]}getFieldIndex(e){return this.getFields().indexOf(e)}getFocusTarget(e){return this.component}initTags(e){const t=document.createElement("vaadin-user-tags");e.shadowRoot.appendChild(t),t.target=e,this._tags=t,e.addEventListener("mouseenter",e=>{e.relatedTarget!==this._tags.$.overlay&&(this._mouse=!0,this._mouseDebouncer=i.a.debounce(this._mouseDebouncer,a.d.after(200),()=>{this._mouse&&this._tags.show()}))}),e.addEventListener("mouseleave",e=>{e.relatedTarget!==this._tags.$.overlay&&(this._mouse=!1,this._hasFocus||this._tags.hide())}),e.addEventListener("vaadin-highlight-show",e=>{this._hasFocus=!0,this._debouncer&&this._debouncer.isActive()?this._debouncer.cancel():this._tags.show()}),e.addEventListener("vaadin-highlight-hide",e=>{this._hasFocus=!1,this._mouse||(this._debouncer=i.a.debounce(this._debouncer,a.d.after(1),()=>{this._tags.hide()}))}),this._tags.$.overlay.addEventListener("mouseleave",t=>{t.relatedTarget!==e&&(this._mouse=!1,e.hasAttribute("focused")||this._tags.hide())})}setOutlines(e){const t=this.getFields();t.forEach((n,i)=>{const{outline:a}=$(n),r=1===t.length?0:e.map(e=>e.fieldIndex).indexOf(i);a.user=e[r]})}showOutline(e){this.fire("show",e)}hideOutline(e){this.fire("hide",e)}fire(e,t){this.component.dispatchEvent(new CustomEvent("vaadin-highlight-"+e,{bubbles:!0,composed:!0,detail:{fieldIndex:this.getFieldIndex(t)}}))}redraw(e){this._tags.setUsers(e),this.setOutlines(e)}}
/**
@license
Copyright (C) 2020 Vaadin Ltd
This program is available under Commercial Vaadin Runtime License 1.0 (CVRLv1).
For the full License, see http://vaadin.com/license/cvrl-1
*/class k extends I{constructor(e){super(e),this.datePicker=e,this.fullscreenFocus=!1,this.blurWhileOpened=!1,this.addListeners(e)}addListeners(e){this.overlay=e.$.overlay,e.addEventListener("focus",e=>this.onFocus(e),!0),e.addEventListener("opened-changed",e=>this.onOpenedChanged(e)),this.overlay.addEventListener("focusout",e=>this.onOverlayFocusOut(e)),e.addEventListener("focusin",e=>this.onFocusIn(e)),e.addEventListener("focusout",e=>this.onFocusOut(e))}onFocus(e){const t=this.datePicker;t._fullscreen&&e.relatedTarget!==this.overlay&&(this.fullscreenFocus=!0,t.opened&&(this.fullscreenFocus=!1,this.showOutline(t)))}onFocusIn(e){e.relatedTarget!==this.overlay&&(this.blurWhileOpened?this.blurWhileOpened=!1:this.showOutline(this.datePicker))}onFocusOut(e){this.fullscreenFocus||e.relatedTarget===this.overlay||(this.datePicker.opened?this.blurWhileOpened=!0:this.hideOutline(this.datePicker))}onOverlayFocusOut(e){e.relatedTarget!==this.datePicker&&(this.blurWhileOpened=!0)}onOpenedChanged(e){if(!1===e.detail.value&&this.blurWhileOpened)return this.blurWhileOpened=!1,void this.hideOutline(this.datePicker)}}
/**
@license
Copyright (C) 2020 Vaadin Ltd
This program is available under Commercial Vaadin Runtime License 1.0 (CVRLv1).
For the full License, see http://vaadin.com/license/cvrl-1
*/class S extends I{constructor(e){super(e),this.addListeners(e)}addListeners(e){e.addEventListener("focusin",e=>this.onFocusIn(e)),e.addEventListener("focusout",e=>this.onFocusOut(e))}onFocusIn(e){const t=this.getFocusTarget(e);this.showOutline(t)}onFocusOut(e){const t=this.getFocusTarget(e);this.hideOutline(t)}}
/**
@license
Copyright (C) 2020 Vaadin Ltd
This program is available under Commercial Vaadin Runtime License 1.0 (CVRLv1).
For the full License, see http://vaadin.com/license/cvrl-1
*/class L extends k{constructor(e,t){super(e),this.component=t}getFieldIndex(){return 0}}class O extends S{constructor(e,t){super(e),this.component=t,this.timePicker=e}getFocusTarget(e){return this.timePicker}getFieldIndex(){return 1}}class F extends I{constructor(e){super(e);const[t,n]=this.getFields();this.dateObserver=new L(t,e),this.timeObserver=new O(n,e)}getFields(){return this.component.$.customField.inputs}}
/**
@license
Copyright (C) 2020 Vaadin Ltd
This program is available under Commercial Vaadin Runtime License 1.0 (CVRLv1).
For the full License, see http://vaadin.com/license/cvrl-1
*/class T extends S{getFields(){return this.component._checkboxes}getFocusTarget(e){const t=this.getFields();return Array.from(e.composedPath()).filter(e=>-1!==t.indexOf(e))[0]}}
/**
@license
Copyright (C) 2020 Vaadin Ltd
This program is available under Commercial Vaadin Runtime License 1.0 (CVRLv1).
For the full License, see http://vaadin.com/license/cvrl-1
*/class P extends S{getFields(){return this.component._radioButtons}getFocusTarget(e){const t=this.getFields();return Array.from(e.composedPath()).filter(e=>-1!==t.indexOf(e))[0]}}
/**
@license
Copyright (C) 2020 Vaadin Ltd
This program is available under Commercial Vaadin Runtime License 1.0 (CVRLv1).
For the full License, see http://vaadin.com/license/cvrl-1
*/class A extends S{constructor(e){super(e),this.blurWhileOpened=!1,this.overlay=e._overlayElement}addListeners(e){super.addListeners(e),e.addEventListener("opened-changed",t=>{e._phone&&!1===t.detail.value&&this.hideOutline(e)})}onFocusIn(e){this.overlay.contains(e.relatedTarget)||!this.component._phone&&this.overlay.hasAttribute("closing")||super.onFocusIn(e)}onFocusOut(e){this.overlay.contains(e.relatedTarget)||super.onFocusOut(e)}}
/**
@license
Copyright (C) 2020 Vaadin Ltd
This program is available under Commercial Vaadin Runtime License 1.0 (CVRLv1).
For the full License, see http://vaadin.com/license/cvrl-1
*/class D extends S{getFields(){return this.component.items||[]}getFocusTarget(e){const t=this.getFields();return Array.from(e.composedPath()).filter(e=>-1!==t.indexOf(e))[0]}}
/**
@license
Copyright (C) 2020 Vaadin Ltd
This program is available under Commercial Vaadin Runtime License 1.0 (CVRLv1).
For the full License, see http://vaadin.com/license/cvrl-1
*/class z extends(Object(p.a)(Object(h.a)(l.a))){static get is(){return"vaadin-field-outline"}static get template(){return l.b`
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
    `}static get properties(){return{user:{type:Object,value:null,observer:"_userChanged"}}}ready(){super.ready(),this.setAttribute("part","outline"),this._field=this.getRootNode().host}_userChanged(e){const t="--_active-user-color";if(e){this.setAttribute("has-active-user","");const n=`var(--vaadin-user-color-${e.colorIndex})`;v(this,t,n),this._field&&v(this._field,t,n)}else this.removeAttribute("has-active-user"),v(this,t,"transparent"),this._field&&v(this._field,t,"transparent")}}customElements.define(z.is,z);
/**
@license
Copyright (C) 2020 Vaadin Ltd
This program is available under Commercial Vaadin Runtime License 1.0 (CVRLv1).
For the full License, see http://vaadin.com/license/cvrl-1
*/
const M=new WeakMap;class V extends(Object(p.a)(Object(h.a)(l.a))){static init(e){if(!M.has(e)){const t=document.createElement(this.is);t._field=e,e.setAttribute("has-highlighter",""),window.ShadyDOM&&window.ShadyDOM.flush(),M.set(e,t),t.observer=this.initFieldObserver(e),e.shadowRoot.appendChild(t)}return M.get(e)}static initFieldObserver(e){let t;switch(e.tagName.toLowerCase()){case"vaadin-date-picker":t=new k(e);break;case"vaadin-date-time-picker":t=new F(e);break;case"vaadin-select":t=new A(e);break;case"vaadin-checkbox-group":t=new T(e);break;case"vaadin-radio-group":t=new P(e);break;case"vaadin-list-box":t=new D(e);break;default:t=new S(e)}return t}static addUser(e,t){this.init(e).addUser(t)}static removeUser(e,t){this.init(e).removeUser(t)}static setUsers(e,t){this.init(e).setUsers(t)}static get is(){return"vaadin-field-highlighter"}static get template(){return l.b`
      <style>
        :host {
          display: none;
        }
      </style>
    `}static get properties(){return{user:{type:Object,value:null,observer:"_userChanged"},users:{type:Array,value:()=>[]}}}ready(){super.ready(),this.redraw(),C.a.requestAvailability()}addUser(e){e&&(this.push("users",e),this.redraw(),this.user=e)}setUsers(e){Array.isArray(e)&&(this.set("users",e),this.redraw(),this.user=e[e.length-1]||null)}removeUser(e){if(e&&void 0!==e.id){let t;for(let n=0;n<this.users.length;n++)if(this.users[n].id===e.id){t=n;break}void 0!==t&&(this.splice("users",t,1),this.redraw(),this.users.length>0?this.user=this.users[this.users.length-1]:this.user=null)}}redraw(){this.observer.redraw(Array.from(this.users).reverse())}_announce(e){const t=this._field.label||"";this.dispatchEvent(new CustomEvent("iron-announce",{bubbles:!0,composed:!0,detail:{text:t?`${e} ${t}`:e}}))}_userChanged(e){e&&this._announce("root started editing")}}customElements.define(V.is,V);
/**
@license
Copyright (C) 2020 Vaadin Ltd
This program is available under Commercial Vaadin Runtime License 1.0 (CVRLv1).
For the full License, see http://vaadin.com/license/cvrl-1
*/
var R=n(97),N=n(137);!function(){const e=function(e){return window.Vaadin.Flow.tryCatchWrapper(e,"Vaadin Grid","vaadin-grid")};let t=!1;window.Vaadin.Flow.gridConnector={initLazy:n=>e((function(n){if(n.$connector)return;t||(t=!0,N.b.prototype.ensureSubCacheForScaledIndexOriginal=N.b.prototype.ensureSubCacheForScaledIndex,N.b.prototype.ensureSubCacheForScaledIndex=e((function(e){this.grid.$connector?this.itemCaches[e]||this.grid.$connector.beforeEnsureSubCacheForScaledIndex(this,e):this.ensureSubCacheForScaledIndexOriginal(e)})),N.b.prototype.isLoading=e((function(){return Boolean(u.length||Object.keys(this.pendingRequests).length||Object.keys(this.itemCaches).filter(e=>this.itemCaches[e].isLoading())[0])})),N.b.prototype.doEnsureSubCacheForScaledIndex=e((function(e){if(!this.itemCaches[e]){const t=new N.b.prototype.constructor(this.grid,this,this.items[e]);t.itemkeyCaches={},this.itemkeyCaches||(this.itemkeyCaches={}),this.itemCaches[e]=t,this.itemkeyCaches[this.grid.getItemId(t.parentItem)]=t,this.grid._loadPage(0,t)}})),N.b.prototype.getCacheAndIndexByKey=e((function(e){for(let t in this.items)if(this.grid.getItemId(this.items[t])===e)return{cache:this,scaledIndex:t};const t=Object.keys(this.itemkeyCaches);for(let n=0;n<t.length;n++){const i=t[n];let a=this.itemkeyCaches[i].getCacheAndIndexByKey(e);if(a)return a}})),N.b.prototype.getLevel=e((function(){let e=this,t=0;for(;e.parentCache;)e=e.parentCache,t++;return t})));const r={},o={},s={};let c,d,l=[],u=[];let h,p={};const f="null";p[f]=[0,0];const m=["SINGLE","NONE","MULTI"];let g={},v="SINGLE",y=!0,_=!1;n.size=0,n.itemIdPath="key",n.$connector={},n.$connector.hasEnsureSubCacheQueue=e(()=>u.length>0),n.$connector.hasParentRequestQueue=e(()=>l.length>0),n.$connector.hasRootRequestQueue=e(()=>Object.keys(r).length>0||h&&h.isActive()),n.$connector.beforeEnsureSubCacheForScaledIndex=e((function(e,t){u.push({cache:e,scaledIndex:t,itemkey:n.getItemId(e.items[t]),level:e.getLevel()}),u.sort((function(e,t){return e.scaledIndex-t.scaledIndex||e.level-t.level})),d=i.a.debounce(d,a.a,()=>{for(;u.length;)n.$connector.flushEnsureSubCache()})})),n.$connector.doSelection=e((function(e,t){"NONE"===v||!e.length||t&&n.hasAttribute("disabled")||("SINGLE"===v&&(n.selectedItems=[],g={}),n.selectedItems=n.selectedItems.concat(e),e.forEach(e=>{e&&(g[e.key]=e,t&&(e.selected=!0,n.$server.select(e.key)));const i=!n.activeItem||!e||e.key!=n.activeItem.key;!t&&"SINGLE"===v&&i&&(n.activeItem=e,n.$connector.activeItem=e)}))})),n.$connector.doDeselection=e((function(e,t){if("NONE"===v||!e.length||t&&n.hasAttribute("disabled"))return;const i=n.selectedItems.slice();for(;e.length;){const a=e.shift();for(let e=0;e<i.length;e++){const t=i[e];if(a&&a.key===t.key){i.splice(e,1);break}}a&&(delete g[a.key],t&&(delete a.selected,n.$server.deselect(a.key)))}n.selectedItems=i})),n.__activeItemChanged=e((function(e,t){"SINGLE"==v&&(e?g[e.key]||n.$connector.doSelection([e],!0):t&&g[t.key]&&(n.$connector.deselectAllowed?n.$connector.doDeselection([t],!0):n.activeItem=t))})),n._createPropertyObserver("activeItem","__activeItemChanged",!0),n.__activeItemChangedDetails=e((function(e,t){y&&(null==e&&void 0===t||(e&&!e.detailsOpened?n.$server.setDetailsVisible(e.key):n.$server.setDetailsVisible(null)))})),n._createPropertyObserver("activeItem","__activeItemChangedDetails",!0),n.$connector.setDetailsVisibleOnClick=e((function(e){y=e})),n.$connector._getPageIfSameLevel=e((function(e,t,i){let a=n._cache.getCacheAndIndex(t),r=a.cache.parentItem;return e!==(r?n.getItemId(r):f)?i:n._getPageForIndex(a.scaledIndex)})),n.$connector.getCacheByKey=e((function(e){let t=n._cache.getCacheAndIndexByKey(e);if(t)return t.cache})),n.$connector.flushEnsureSubCache=e((function(){let e=u.splice(0,1)[0],t=e.itemkey,i=n._virtualStart,a=n._virtualEnd,r=a-i,o=Math.max(0,i+n._vidxOffset-r),s=Math.min(a+n._vidxOffset+r,n._effectiveSize);for(let i=o;i<=s;i++){let a=n._cache.getItemForIndex(i);if(n.getItemId(a)===t){if(n._isExpanded(a))return e.cache.doEnsureSubCacheForScaledIndex(e.scaledIndex),!0;break}}return!1})),n.$connector.flushParentRequests=e((function(){let e=l.splice(0,20);return!!e.length&&(n.$server.setParentRequestedRanges(e),!0)})),n.$connector.beforeParentRequest=e((function(e,t,r){l.push({firstIndex:e,size:t,parentKey:r}),c=i.a.debounce(c,a.d.after(50),()=>{for(;l.length;)n.$connector.flushParentRequests()})})),n.$connector.fetchPage=e((function(e,t,i){let a=n._virtualStart,r=n._virtualEnd,o=r-a,s=Math.max(0,a+n._vidxOffset-o),c=Math.min(r+n._vidxOffset+o,n._effectiveSize),d=t,l=t;for(let e=s;e<=c;e++)d=Math.min(d,n.$connector._getPageIfSameLevel(i,e,d)),l=Math.max(l,n.$connector._getPageIfSameLevel(i,e,l));let u=Math.max(0,d),h=i!==f?l:Math.min(l,Math.floor(n.size/n.pageSize)),m=p[i];if(m||(m=[-1,-1]),m[0]!=u||m[1]!=h){m=[u,h],p[i]=m;let t=h-u+1;e(u*n.pageSize,t*n.pageSize)}})),n.dataProvider=e((function(e,t){if(e.pageSize!=n.pageSize)throw"Invalid pageSize";let c=e.page;if(e.parentItem){let i=n.getItemId(e.parentItem);o[i]||(o[i]={});let a=n.$connector.getCacheByKey(i),r=a&&a.itemkeyCaches?a.itemkeyCaches[i]:void 0;s[i]&&s[i][c]&&r?(c=Math.min(c,Math.floor(s[i].size/n.pageSize)),t(s[i][c],s[i].size)):o[i][c]=t,n.$connector.fetchPage((t,i)=>n.$connector.beforeParentRequest(t,i,e.parentItem.key),c,i)}else c=Math.min(c,Math.floor(n.size/n.pageSize)),s[f]&&s[f][c]?t(s[f][c]):r[c]=t,h=i.a.debounce(h,a.d.after(n._hasData?150:0),()=>{n.$connector.fetchPage((e,t)=>n.$server.setRequestedRange(e,t),c,f)})}));const b=e((function(e,t){void 0===t||_||n.$server.sortersChanged(n._sorters.map((function(e){return{path:e.path,direction:e.direction}})))}));n.$connector.setSorterDirections=e((function(t){_=!0,setTimeout(e(()=>{try{const e=Array.from(n.querySelectorAll("vaadin-grid-sorter"));e.forEach(e=>{t.filter(t=>t.column===e.getAttribute("path"))[0]||(e.direction=null)}),t.reverse().forEach(({column:t,direction:n})=>{e.forEach(e=>{e.getAttribute("path")===t&&e.direction!==n&&(e.direction=n)})})}finally{_=!1}}))})),n._createPropertyObserver("_previousSorters",b),n._updateItem=e((function(e,t){R.a.prototype._updateItem.call(n,e,t),e.hidden||Array.from(e.children).forEach(e=>{e._instance&&e._instance.children&&Array.from(e._instance.children).forEach(e=>{e._attachRenderedComponentIfAble&&e._attachRenderedComponentIfAble(),e.children&&Array.from(e.children).forEach(e=>{e._attachRenderedComponentIfAble&&e._attachRenderedComponentIfAble()})})})})),n._expandedInstanceChangedCallback=e((function(e,t){if(null==e.item||null==n.$server.updateExpandedState)return;let i=n.getItemId(e.item);if(n.$server.updateExpandedState(i,t),t)this.expandItem(e.item);else{delete s[i];let t=n.$connector.getCacheByKey(i);t&&t.itemkeyCaches&&t.itemkeyCaches[i]&&delete t.itemkeyCaches[i],t&&t.itemkeyCaches&&Object.keys(t.itemCaches).filter(e=>t.items[e].key===i).forEach(e=>delete t.itemCaches[e]),delete p[i],this.collapseItem(e.item)}}));const w=function(e){if(!e||!Array.isArray(e))throw"Attempted to call itemsUpdated with an invalid value: "+JSON.stringify(e);let t=Array.from(n.detailsOpenedItems),i=!1;for(let a=0;a<e.length;++a){const r=e[a];r&&(r.detailsOpened?n._getItemIndexInArray(r,t)<0&&t.push(r):n._getItemIndexInArray(r,t)>=0&&t.splice(n._getItemIndexInArray(r,t),1),g[r.key]&&(g[r.key]=r,r.selected=!0,i=!0))}n.detailsOpenedItems=t,i&&(n.selectedItems=Object.keys(g).map((function(e){return g[e]})))},x=function(e,t){let i;if((t||f)!==f){i=s[t][e];let a=n.$connector.getCacheByKey(t);if(a&&a.itemkeyCaches){let n=a.itemkeyCaches[t];const r=o[t],s=r&&r[e];C(e,i,s,n)}}else i=s[f][e],C(e,i,r[e],n._cache);return i},C=function(e,t,i,a){if(!i){let i=e*n.pageSize,r=i+n.pageSize;if(t){if(a&&a.items)for(let e=i;e<r;e++)a.items[e]&&(a.items[e]=t[e-i])}else if(a&&a.items)for(let e=i;e<r;e++)delete a.items[e]}},E=function(){n._cache.updateSize(),n._effectiveSize=n._cache.effectiveSize,n._assignModels()},$=function(e){if(!e||!n._physicalItems)return;const t=e.map(e=>e.key),i=n._physicalItems.map((e,n)=>e._item&&e._item.key&&t.indexOf(e._item.key)>-1?n:null).filter(e=>null!==e);i.length>0&&n._assignModels(i)};n.$connector.set=e((function(e,t,i){if(e%n.pageSize!=0)throw"Got new data to index "+e+" which is not aligned with the page size of "+n.pageSize;let a=i||f;const r=e/n.pageSize,o=Math.ceil(t.length/n.pageSize);for(let e=0;e<o;e++){let i=r+e,o=t.slice(e*n.pageSize,(e+1)*n.pageSize);s[a]||(s[a]={}),s[a][i]=o,n.$connector.doSelection(o.filter(e=>e.selected&&!k(e))),n.$connector.doDeselection(o.filter(e=>!e.selected&&(g[e.key]||k(e))));const c=x(i,a);c&&(w(c),$(c))}}));const I=function(e){let t=e.parentUniqueKey||f;if(s[t])for(let i in s[t])for(let a in s[t][i])if(n.getItemId(s[t][i][a])===n.getItemId(e))return{page:i,index:a,parentKey:t};return null};n.$connector.updateHierarchicalData=e((function(e){let t=[];for(let n=0;n<e.length;n++){let i=I(e[n]);if(i){s[i.parentKey][i.page][i.index]=e[n];let a=i.parentKey+":"+i.page;t[a]||(t[a]={parentKey:i.parentKey,page:i.page})}}let n=Object.keys(t);for(let e=0;e<n.length;e++){let i=t[n[e]];const a=x(i.page,i.parentKey);a&&(w(a),$(a))}})),n.$connector.updateFlatData=e((function(e){for(let t=0;t<e.length;t++){let i=I(e[t]);if(i){s[i.parentKey][i.page][i.index]=e[t];const a=parseInt(i.page)*n.pageSize+parseInt(i.index);n._cache.items[a]&&(n._cache.items[a]=e[t])}}w(e),$(e)})),n.$connector.clearExpanded=e((function(){n.expandedItems=[],u=[],l=[]})),n.$connector.clear=e((function(e,t,i){let a=i||f;if(!s[a]||0===Object.keys(s[a]).length)return;if(e%n.pageSize!=0)throw"Got cleared data for index "+e+" which is not aligned with the page size of "+n.pageSize;let r=Math.floor(e/n.pageSize),o=Math.ceil(t/n.pageSize);for(let e=0;e<o;e++){let t=r+e,o=s[a][t];n.$connector.doDeselection(o.filter(e=>g[e.key])),delete s[a][t];const c=x(t,i);c&&w(c),$(o)}let c=n._cache;if(i){const e=n._cache.getCacheAndIndexByKey(a);c=e.cache.itemCaches[e.scaledIndex]}const d=e+o*n.pageSize;for(let t=e;t<d;t++){delete c.items[t];const e=c.itemCaches[t];delete c.itemCaches[t];const n=e&&e.parentItem.key;n&&delete c.itemkeyCaches[n]}n._cache.updateSize()}));const k=function(e){const t=n.selectedItems;for(let n=0;n<t;n++){if(t[n].key===e.key)return!0}return!1};n.$connector.reset=e((function(){n.size=0,S(s),S(n._cache.items),S(p),d&&d.cancel(),c&&c.cancel(),h&&h.cancel(),d=void 0,c=void 0,u=[],l=[],E()}));const S=e=>Object.keys(e).forEach(t=>delete e[t]);n.$connector.updateSize=e=>n.size=e,n.$connector.updateUniqueItemIdPath=e=>n.itemIdPath=e,n.$connector.expandItems=e((function(e){let t=Array.from(n.expandedItems);e.filter(e=>!n._isExpanded(e)).forEach(e=>t.push(e)),n.expandedItems=t})),n.$connector.collapseItems=e((function(e){let t=Array.from(n.expandedItems);e.forEach(e=>{let i=n._getItemIndexInArray(e,t);i>=0&&t.splice(i,1)}),n.expandedItems=t,e.forEach(e=>n.$connector.removeFromQueue(e))})),n.$connector.removeFromQueue=e((function(e){let t=n.getItemId(e);delete o[t],n.$connector.removeFromArray(u,e=>e.itemkey===t),n.$connector.removeFromArray(l,e=>e.parentKey===t)})),n.$connector.removeFromArray=e((function(e,t){if(e.length)for(let n=e.length-1;n--;)t(e[n])&&e.splice(n,1)})),n.$connector.confirmParent=e((function(e,t,i){if(!o[t])return;s[t]&&(s[t].size=i);let a=Object.getOwnPropertyNames(o[t]);for(let e=0;e<a.length;e++){let n=a[e],r=p[t]||[0,0];const c=o[t][n];if(s[t]&&s[t][n]||n<r[0]||n>r[1]){delete o[t][n],c(s[t][n]||new Array(i),i)}else c&&0===i&&(delete o[t][n],c([],i))}n.$server.confirmParentUpdate(e,t),n.loading||n._assignModels()})),n.$connector.confirm=e((function(e){let t=Object.getOwnPropertyNames(r);for(let e=0;e<t.length;e++){let i=t[e],a=p[f]||[0,0];const o=n.size?Math.ceil(n.size/n.pageSize)-1:0,c=Math.min(a[1],o),d=r[i];s[f]&&s[f][i]||i<a[0]||+i>c?(delete r[i],d(s[f][i]||new Array(n.pageSize)),n._debounceIncreasePool&&n._debounceIncreasePool.flush()):d&&0===n.size&&(delete r[i],d([]))}n.$server.confirmUpdate(e)})),n.$connector.ensureHierarchy=e((function(){for(let e in s)e!==f&&delete s[e];S(p),n._cache.itemCaches={},n._cache.itemkeyCaches={},E()})),n.$connector.setSelectionMode=e((function(e){if(!(("string"==typeof e||e instanceof String)&&m.indexOf(e)>=0))throw"Attempted to set an invalid selection mode";v=e,g={}})),n.$connector.deselectAllowed=!0,n.$connector.setVerticalScrollingEnabled=e((function(e){L(n.$.table,e),n.notifyResize()}));const L=function(t,n){t.style.overflowY=n?"":"hidden",t.removeEventListener("wheel",t.__wheelListener),!n&&t.addEventListener("wheel",t.__wheelListener=e(e=>{e.deltaX?Object.defineProperty(e,"deltaY",{value:0}):e.stopImmediatePropagation()}))};function O(e,t){if(n.$connector.activeItem){e.itemKey=n.$connector.activeItem.key;const i=n.getEventContext(e);i.column&&(e.internalColumnId=i.column._flowId),n.dispatchEvent(new CustomEvent(t,{detail:e}))}}n.addEventListener("vaadin-context-menu-before-open",e((function(e){!function(e){const t=n.getEventContext(e),i=t.item&&t.item.key,a=t.column&&t.column.id;n.$server.updateContextMenuTargetItem(i,a)}(n.$contextMenuConnector.openEvent)}))),n.getContextMenuBeforeOpenDetail=e((function(e){const t=n.getEventContext(e);return{key:t.item&&t.item.key||""}})),n.addEventListener("cell-activate",e(e=>{n.$connector.activeItem=e.detail.model.item,setTimeout(()=>n.$connector.activeItem=void 0)})),n.addEventListener("click",e(e=>O(e,"item-click"))),n.addEventListener("dblclick",e(e=>O(e,"item-double-click"))),n.addEventListener("column-resize",e(e=>{n._getColumnsInOrder().filter(e=>!e.hidden).forEach(e=>{e.dispatchEvent(new CustomEvent("column-drag-resize"))}),n.dispatchEvent(new CustomEvent("column-drag-resize",{detail:{resizedColumnKey:e.detail.resizedColumn._flowId}}))})),n.addEventListener("column-reorder",e(e=>{const t=n._columnTree.slice(0).pop().filter(e=>e._flowId).sort((e,t)=>e._order-t._order).map(e=>e._flowId);n.dispatchEvent(new CustomEvent("column-reorder-all-columns",{detail:{columns:t}}))})),n.cellClassNameGenerator=e((function(e,t){const n=t.item.style;if(n)return(n.row||"")+" "+(e&&n[e._flowId]||"")})),n.dropFilter=e(e=>!e.item.dropDisabled),n.dragFilter=e(e=>!e.item.dragDisabled),n.addEventListener("grid-dragstart",e(e=>{n._isSelected(e.detail.draggedItems[0])?(n.__selectionDragData?Object.keys(n.__selectionDragData).forEach(t=>{e.detail.setDragData(t,n.__selectionDragData[t])}):(n.__dragDataTypes||[]).forEach(t=>{e.detail.setDragData(t,e.detail.draggedItems.map(e=>e.dragData[t]).join("\n"))}),n.__selectionDraggedItemsCount>1&&e.detail.setDraggedItemsCount(n.__selectionDraggedItemsCount)):(n.__dragDataTypes||[]).forEach(t=>{e.detail.setDragData(t,e.detail.draggedItems[0].dragData[t])})}))}))(n)}}();n(197);window.Vaadin.Flow.ironListConnector={initLazy:function(e){if(e.$connector)return;let t=[0,0];e.$connector={},e.$connector.placeholderItem={__placeholder:!0};const n=function(){let n=e._virtualStart,i=e._virtualEnd,a=Math.max(0,n-20),r=Math.min(i+20,e.items.length);if(t[0]!=a||t[1]!=r){t=[a,r];const n=1+r-a;e.$server.setRequestedRange(a,n)}};let r;const o=function(){r=i.a.debounce(r,a.d.after(10),n)},s=e._assignModels;e._assignModels=function(){const t=[],n=e._virtualStart,i=Math.min(e.items.length,e._physicalCount);for(let a=0;a<i;a++)void 0===e.items[n+a]&&(t.push(a),e.items[n+a]=e.$connector.placeholderItem);s.apply(e,arguments);for(let i=0;i<t.length;i++)delete e.items[n+t[i]];o()},e.items=[],e.$connector.set=function(t,n){for(let i=0;i<n.length;i++){const a=t+i;e.items[a]=n[i]}e._render()},e.$connector.updateData=function(t){const n=e.items,i={};let a=t.length;for(let e=0;e<t.length;e++){const n=t[e];i[n.key]=n}for(let t=0;t<n.length;t++){const r=i[n[t].key];if(r&&(e.items[t]=r,e.notifyPath("items."+t),a--,0==a))break}},e.$connector.clear=function(t,n){for(let i=0;i<n;i++){const n=t+i;delete e.items[n],e.notifyPath("items."+n)}},e.$connector.updateSize=function(t){const n=t-e.items.length;if(n>0)e.items.length=t,e.notifySplices("items",[{index:t-n,removed:[],addedCount:n,object:e.items,type:"splice"}]);else if(n<0){const n=e.items.slice(t,e.items.length);e.items.splice(t),e.notifySplices("items",[{index:t,removed:n,addedCount:0,object:e.items,type:"splice"}])}},e.$connector.setPlaceholderItem=function(t){t||(t={}),t.__placeholder=!0,e.$connector.placeholderItem=t}}};const j=document.createElement("template");j.innerHTML="<style>\n/* Fixes zero width in flex layouts */\niron-list {\n  flex: auto;\n  align-self: stretch;\n}\n</style>",document.head.appendChild(j.content);n(198),n(199),n(200),n(201),n(202);var B=n(66);{class e extends B.b{static get template(){return s.a`
    <template class="header" id="defaultHeaderTemplate">
      <vaadin-checkbox id="selectAllCheckbox" aria-label="Select All" hidden\$="[[selectAllHidden]]" on-click="_onSelectAllClick" checked="[[selectAll]]">
      </vaadin-checkbox>
    </template>
    <template id="defaultBodyTemplate">
      <vaadin-checkbox aria-label="Select Row" checked="[[selected]]" on-click="_onSelectClick">
      </vaadin-checkbox>
    </template>
`}static get is(){return"vaadin-grid-flow-selection-column"}static get properties(){return{autoWidth:{type:Boolean,value:!0},width:{type:String,value:"56px"},flexGrow:{type:Number,value:0},selectAll:{type:Boolean,value:!1,notify:!0},selectAllHidden:Boolean}}constructor(){super(),this._boundOnSelectEvent=this._onSelectEvent.bind(this),this._boundOnDeselectEvent=this._onDeselectEvent.bind(this)}_prepareHeaderTemplate(){return this._prepareTemplatizer(this.$.defaultHeaderTemplate)}_prepareBodyTemplate(){return this._prepareTemplatizer(this.$.defaultBodyTemplate)}connectedCallback(){super.connectedCallback(),this._grid&&(this._grid.addEventListener("select",this._boundOnSelectEvent),this._grid.addEventListener("deselect",this._boundOnDeselectEvent))}disconnectedCallback(){if(super.disconnectedCallback(),this._grid){this._grid.removeEventListener("select",this._boundOnSelectEvent),this._grid.removeEventListener("deselect",this._boundOnDeselectEvent);if(/^((?!chrome|android).)*safari/i.test(navigator.userAgent)&&window.ShadyDOM&&this.parentElement){const e=this.parentElement,t=this.nextElementSibling;e.removeChild(this),t?e.insertBefore(this,t):e.appendChild(this)}}}_onSelectClick(e){e.target.checked?this._grid.$connector.doDeselection([e.model.item],!0):this._grid.$connector.doSelection([e.model.item],!0),e.target.checked=!e.target.checked}_onSelectAllClick(e){e.preventDefault(),this._grid.hasAttribute("disabled")?e.target.checked=!e.target.checked:this.selectAll?this.$server.deselectAll():this.$server.selectAll()}_onSelectEvent(e){}_onDeselectEvent(e){e.detail.userOriginated&&(this.selectAll=!1)}}customElements.define(e.is,e),Vaadin.GridFlowSelectionColumnElement=e}n(225),n(226),n(203),n(236),n(143),n(237),n(95),n(238),n(112),n(181),n(251),n(182),n(220),n(185),n(171),n(221),n(206),n(113),n(239),n(183),n(218),n(228),n(207),n(139),n(184),n(240),n(156),n(252),n(78),n(83),n(176),n(229),n(219),n(241),n(187),n(188),n(242),n(222),n(186),n(243),n(244),n(253),n(189),n(114),n(245),n(175),n(169),n(246);const U=function(e,t=!1){const n=document.createElement("template");n.innerHTML=e,document.head[t?"insertBefore":"appendChild"](n.content,document.head.firstChild)}}}]);