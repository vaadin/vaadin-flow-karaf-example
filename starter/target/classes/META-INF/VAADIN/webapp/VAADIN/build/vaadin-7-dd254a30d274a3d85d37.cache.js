(window.webpackJsonp=window.webpackJsonp||[]).push([[7],{266:function(t,e,i){"use strict";i.r(e),i.d(e,"addCssBlock",(function(){return m}));var n=i(1),o=n.c`#header {
  height: var(--lumo-size-xl);
  box-shadow: var(--lumo-box-shadow-s);
}
#header vaadin-avatar {
  margin-left: auto;
  margin-right: var(--lumo-space-m);
}
vaadin-app-layout[dir='rtl'] #header vaadin-avatar {
  margin-left: var(--lumo-space-m);
  margin-right: auto;
}
#header h1 {
  font-size: var(--lumo-font-size-l);
  margin: 0;
}
#logo {
  box-sizing: border-box;
  box-shadow: inset 0 -1px var(--lumo-contrast-10pct);
  padding: var(--lumo-space-s) var(--lumo-space-m);
}
#logo img {
  height: calc(var(--lumo-size-l) * 1.5);
}
#logo h1 {
  font-size: var(--lumo-font-size-xl);
  font-weight: 600;
  margin: 0 var(--lumo-space-s);
}

vaadin-tab {
  font-size: var(--lumo-font-size-s);
  height: var(--lumo-size-l);
  font-weight: 600;
  color: var(--lumo-body-text-color);
}

vaadin-tab:hover {
  background-color: var(--lumo-contrast-5pct);
}

vaadin-tab[selected] {
  background-color: var(--lumo-primary-color-10pct);
  color: var(--lumo-primary-text-color);
}
`,a=i(24),r=i(6),s=function(t,e,i,n){var o,a=arguments.length,r=a<3?e:null===n?n=Object.getOwnPropertyDescriptor(e,i):n;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)r=Reflect.decorate(t,e,i,n);else for(var s=t.length-1;s>=0;s--)(o=t[s])&&(r=(a<3?o(r):a>3?o(e,i,r):o(e,i))||r);return a>3&&r&&Object.defineProperty(e,i,r),r};class d extends n.b{constructor(){super(),this.firstDelay=300,this.secondDelay=1500,this.thirdDelay=5e3,this.expandedDuration=2e3,this.onlineText="Online",this.offlineText="Connection lost",this.reconnectingText="Connection lost, trying to reconnect...",this.offline=!1,this.reconnecting=!1,this.expanded=!1,this.loading=!1,this.loadingBarState="",this.applyDefaultThemeState=!0,this.firstTimeout=0,this.secondTimeout=0,this.thirdTimeout=0,this.expandedTimeout=0,this.lastMessageState=r.a.CONNECTED,this.connectionStateListener=()=>{this.expanded=this.updateConnectionState(),this.expandedTimeout=this.timeoutFor(this.expandedTimeout,this.expanded,()=>this.expanded=!1,this.expandedDuration)}}static create(){var t,e;const i=window;return(null===(t=i.Vaadin)||void 0===t?void 0:t.connectionIndicator)||(i.Vaadin=i.Vaadin||{},i.Vaadin.connectionIndicator=document.createElement("vaadin-connection-indicator"),document.body.appendChild(i.Vaadin.connectionIndicator)),null===(e=i.Vaadin)||void 0===e?void 0:e.connectionIndicator}render(){return n.d`
      <div class="v-loading-indicator ${this.loadingBarState}" style="${this.getLoadingBarStyle()}"></div>

      <div
        class="v-status-message ${Object(a.a)({active:this.reconnecting})}"
      >
        <span class="text"> ${this.renderMessage()} </span>
      </div>
    `}connectedCallback(){var t;super.connectedCallback();const e=window;(null===(t=e.Vaadin)||void 0===t?void 0:t.connectionState)&&(this.connectionStateStore=e.Vaadin.connectionState,this.connectionStateStore.addStateChangeListener(this.connectionStateListener),this.updateConnectionState()),this.updateTheme()}disconnectedCallback(){super.disconnectedCallback(),this.connectionStateStore&&this.connectionStateStore.removeStateChangeListener(this.connectionStateListener),this.updateTheme()}get applyDefaultTheme(){return this.applyDefaultThemeState}set applyDefaultTheme(t){t!==this.applyDefaultThemeState&&(this.applyDefaultThemeState=t,this.updateTheme())}createRenderRoot(){return this}updateConnectionState(){var t;const e=null===(t=this.connectionStateStore)||void 0===t?void 0:t.state;return this.offline=e===r.a.CONNECTION_LOST,this.reconnecting=e===r.a.RECONNECTING,this.updateLoading(e===r.a.LOADING),!this.loading&&(e!==this.lastMessageState&&(this.lastMessageState=e,!0))}updateLoading(t){this.loading=t,this.loadingBarState="",this.firstTimeout=this.timeoutFor(this.firstTimeout,t,()=>this.loadingBarState="first",this.firstDelay),this.secondTimeout=this.timeoutFor(this.secondTimeout,t,()=>this.loadingBarState="second",this.secondDelay),this.thirdTimeout=this.timeoutFor(this.thirdTimeout,t,()=>this.loadingBarState="third",this.thirdDelay)}renderMessage(){return this.reconnecting?this.reconnectingText:this.offline?this.offlineText:this.onlineText}updateTheme(){if(this.applyDefaultThemeState&&this.isConnected){if(!document.getElementById("css-loading-indicator")){const t=document.createElement("style");t.id="css-loading-indicator",t.textContent=this.getDefaultStyle().cssText,document.head.appendChild(t)}}else{const t=document.getElementById("css-loading-indicator");t&&document.head.removeChild(t)}}getDefaultStyle(){return n.c`
      @keyframes v-progress-start {
        0% {
          width: 0%;
        }
        100% {
          width: 50%;
        }
      }
      @keyframes v-progress-delay {
        0% {
          width: 50%;
        }
        100% {
          width: 90%;
        }
      }
      @keyframes v-progress-wait {
        0% {
          width: 90%;
          height: 4px;
        }
        3% {
          width: 91%;
          height: 7px;
        }
        100% {
          width: 96%;
          height: 7px;
        }
      }
      @keyframes v-progress-wait-pulse {
        0% {
          opacity: 1;
        }
        50% {
          opacity: 0.1;
        }
        100% {
          opacity: 1;
        }
      }
      .v-loading-indicator,
      .v-status-message {
        position: fixed;
        z-index: 251;
        left: 0;
        right: auto;
        top: 0;
        background-color: var(--lumo-primary-color, var(--material-primary-color, blue));
        transition: none;
      }
      .v-loading-indicator {
        width: 50%;
        height: 4px;
        opacity: 1;
        pointer-events: none;
        animation: v-progress-start 1000ms 200ms both;
      }
      .v-loading-indicator[style*='none'] {
        display: block !important;
        width: 100%;
        opacity: 0;
        animation: none;
        transition: opacity 500ms 300ms, width 300ms;
      }
      .v-loading-indicator.second {
        width: 90%;
        animation: v-progress-delay 3.8s forwards;
      }
      .v-loading-indicator.third {
        width: 96%;
        animation: v-progress-wait 5s forwards, v-progress-wait-pulse 1s 4s infinite backwards;
      }

      vaadin-connection-indicator[offline] .v-loading-indicator,
      vaadin-connection-indicator[reconnecting] .v-loading-indicator {
        display: none;
      }

      .v-status-message {
        opacity: 0;
        width: 100%;
        max-height: var(--status-height-collapsed, 8px);
        overflow: hidden;
        background-color: var(--status-bg-color-online, var(--lumo-primary-color, var(--material-primary-color, blue)));
        color: var(
          --status-text-color-online,
          var(--lumo-primary-contrast-color, var(--material-primary-contrast-color, #fff))
        );
        font-size: 0.75rem;
        font-weight: 600;
        line-height: 1;
        transition: all 0.5s;
        padding: 0 0.5em;
      }

      vaadin-connection-indicator[offline] .v-status-message,
      vaadin-connection-indicator[reconnecting] .v-status-message {
        opacity: 1;
        background-color: var(--status-bg-color-offline, var(--lumo-shade, #333));
        color: var(
          --status-text-color-offline,
          var(--lumo-primary-contrast-color, var(--material-primary-contrast-color, #fff))
        );
        background-image: repeating-linear-gradient(
          45deg,
          rgba(255, 255, 255, 0),
          rgba(255, 255, 255, 0) 10px,
          rgba(255, 255, 255, 0.1) 10px,
          rgba(255, 255, 255, 0.1) 20px
        );
      }

      vaadin-connection-indicator[reconnecting] .v-status-message {
        animation: show-reconnecting-status 2s;
      }

      vaadin-connection-indicator[offline] .v-status-message:hover,
      vaadin-connection-indicator[reconnecting] .v-status-message:hover,
      vaadin-connection-indicator[expanded] .v-status-message {
        max-height: var(--status-height, 1.75rem);
      }

      vaadin-connection-indicator[expanded] .v-status-message {
        opacity: 1;
      }

      .v-status-message span {
        display: flex;
        align-items: center;
        justify-content: center;
        height: var(--status-height, 1.75rem);
      }

      vaadin-connection-indicator[reconnecting] .v-status-message span::before {
        content: '';
        width: 1em;
        height: 1em;
        border-top: 2px solid
          var(--status-spinner-color, var(--lumo-primary-color, var(--material-primary-color, blue)));
        border-left: 2px solid
          var(--status-spinner-color, var(--lumo-primary-color, var(--material-primary-color, blue)));
        border-right: 2px solid transparent;
        border-bottom: 2px solid transparent;
        border-radius: 50%;
        box-sizing: border-box;
        animation: v-spin 0.4s linear infinite;
        margin: 0 0.5em;
      }

      @keyframes v-spin {
        100% {
          transform: rotate(360deg);
        }
      }
    `}getLoadingBarStyle(){switch(this.loadingBarState){case"":return"display: none";case"first":case"second":case"third":return"display: block";default:return""}}timeoutFor(t,e,i,n){return 0!==t&&window.clearTimeout(t),e?window.setTimeout(i,n):0}static get instance(){return d.create()}}s([Object(n.e)({type:Number})],d.prototype,"firstDelay",void 0),s([Object(n.e)({type:Number})],d.prototype,"secondDelay",void 0),s([Object(n.e)({type:Number})],d.prototype,"thirdDelay",void 0),s([Object(n.e)({type:Number})],d.prototype,"expandedDuration",void 0),s([Object(n.e)({type:String})],d.prototype,"onlineText",void 0),s([Object(n.e)({type:String})],d.prototype,"offlineText",void 0),s([Object(n.e)({type:String})],d.prototype,"reconnectingText",void 0),s([Object(n.e)({type:Boolean,reflect:!0})],d.prototype,"offline",void 0),s([Object(n.e)({type:Boolean,reflect:!0})],d.prototype,"reconnecting",void 0),s([Object(n.e)({type:Boolean,reflect:!0})],d.prototype,"expanded",void 0),s([Object(n.e)({type:Boolean,reflect:!0})],d.prototype,"loading",void 0),s([Object(n.e)({type:String})],d.prototype,"loadingBarState",void 0),s([Object(n.e)({type:Boolean})],d.prototype,"applyDefaultTheme",null),void 0===customElements.get("vaadin-connection-indicator")&&customElements.define("vaadin-connection-indicator",d);d.instance;i(58);var c=i(33),l=i(36),h=i(37),p=i(31);class u extends p.a{static get template(){return c.a`
    <style>
      @keyframes flow-component-renderer-appear {
        to {
          opacity: 1;
        }
      }
      :host {
        animation: 1ms flow-component-renderer-appear;
      }
    </style>
    <slot></slot>
`}static get is(){return"flow-component-renderer"}static get properties(){return{nodeid:Number,appid:String}}static get observers(){return["_attachRenderedComponentIfAble(appid, nodeid)"]}connectedCallback(){super.connectedCallback(),this._runChrome72ShadowDomBugWorkaround()}_runChrome72ShadowDomBugWorkaround(){const t=navigator.userAgent;if(t&&t.match("Chrome/")){const e=t.split("Chrome/")[1].split(".")[0];if(e&&parseInt(e)>71){const t=this._getDebouncedNotifyResizeFunction();t&&(this.style.visibility="hidden",requestAnimationFrame(()=>{this.style.visibility="",t()}))}}}_getDebouncedNotifyResizeFunction(){let t=this.parentElement;for(;;){if(!t)return;if(t.notifyResize)break;t=t.parentElement}return t._debouncedNotifyResize||(t._debouncedNotifyResize=function(){t.__debouncedNotifyResize=l.a.debounce(t.__debouncedNotifyResize,h.a,t.notifyResize)}),t._debouncedNotifyResize}ready(){super.ready(),this.addEventListener("click",(function(t){this.firstChild&&"function"==typeof this.firstChild.click&&t.target===this&&this.firstChild.click()})),this.addEventListener("animationend",this._onAnimationEnd)}_asyncAttachRenderedComponentIfAble(){this._debouncer=l.a.debounce(this._debouncer,h.b,()=>this._attachRenderedComponentIfAble())}_attachRenderedComponentIfAble(){if(!this.nodeid||!this.appid)return;const t=this._getRenderedComponent();this.firstChild?t?this.firstChild!==t?(this.replaceChild(t,this.firstChild),this._defineFocusTarget(),this.onComponentRendered()):(this._defineFocusTarget(),this.onComponentRendered()):(this._clear(),this._asyncAttachRenderedComponentIfAble()):t?(this.appendChild(t),this._defineFocusTarget(),this.onComponentRendered()):this._asyncAttachRenderedComponentIfAble()}_getRenderedComponent(){try{return window.Vaadin.Flow.clients[this.appid].getByNodeId(this.nodeid)}catch(t){console.error("Could not get node %s from app %s",this.nodeid,this.appid),console.error(t)}return null}_clear(){for(;this.firstChild;)this.removeChild(this.firstChild)}onComponentRendered(){}_defineFocusTarget(){var t=this._getFirstFocusableDescendant(this.firstChild);null!==t&&t.setAttribute("focus-target","true")}_getFirstFocusableDescendant(t){if(this._isFocusable(t))return t;if(!t.children)return null;for(var e=0;e<t.children.length;e++){var i=this._getFirstFocusableDescendant(t.children[e]);if(null!==i)return i}return null}_isFocusable(t){return(!t.hasAttribute||"function"!=typeof t.hasAttribute||!t.hasAttribute("disabled")&&!t.hasAttribute("hidden"))&&0===t.tabIndex}_onAnimationEnd(t){0===t.animationName.indexOf("flow-component-renderer-appear")&&this._attachRenderedComponentIfAble()}}window.customElements.define(u.is,u);i(224),i(231),i(179),i(69),i(25),i(250),i(41),i(34),i(39),i(26),i(232),i(233),i(234),i(180),i(235),i(51);const m=function(t,e=!1){const i=document.createElement("template");i.innerHTML=t,document.head[e?"insertBefore":"appendChild"](i.content,document.head.firstChild)};let g;m(`<custom-style><style>${o}</style></custom-style>`);const f=document.getElementsByTagName("script");for(let t=0;t<f.length;t++){const e=f[t];if("module"==e.getAttribute("type")&&e.getAttribute("data-app-id")&&!e["vaadin-bundle"]){g=e;break}}if(!g)throw new Error("Could not find the bundle script to identify the application id");g["vaadin-bundle"]=!0,window.Vaadin.Flow.fallbacks||(window.Vaadin.Flow.fallbacks={});const v=window.Vaadin.Flow.fallbacks;v[g.getAttribute("data-app-id")]={},v[g.getAttribute("data-app-id")].loadFallback=function(){return Promise.all([i.e(1),i.e(3)]).then(i.bind(null,265))}}}]);