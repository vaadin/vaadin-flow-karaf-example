var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { ConnectionIndicator } from './ConnectionIndicator';
import { ConnectionState } from './ConnectionState';
// flow uses body for keeping references
const flowRoot = window.document.body;
const $wnd = window;
/**
 * Client API for flow UI operations.
 */
export class Flow {
    constructor(config) {
        this.response = undefined;
        this.pathname = '';
        // flag used to inform Testbench whether a server route is in progress
        this.isActive = false;
        this.baseRegex = /^\//;
        flowRoot.$ = flowRoot.$ || [];
        this.config = config || {};
        // TB checks for the existence of window.Vaadin.Flow in order
        // to consider that TB needs to wait for `initFlow()`.
        $wnd.Vaadin = $wnd.Vaadin || {};
        $wnd.Vaadin.Flow = $wnd.Vaadin.Flow || {};
        $wnd.Vaadin.Flow.clients = {
            TypeScript: {
                isActive: () => this.isActive,
                loadingStarted: () => this.loadingStarted(),
                loadingFinished: () => this.loadingFinished()
            }
        };
        // Regular expression used to remove the app-context
        const elm = document.head.querySelector('base');
        this.baseRegex = new RegExp('^' +
            // IE11 does not support document.baseURI
            (document.baseURI || (elm && elm.href) || '/').replace(/^https?:\/\/[^/]+/i, ''));
        this.appShellTitle = document.title;
        // Put a vaadin-connection-indicator in the dom
        this.addConnectionIndicator();
    }
    /**
     * Return a `route` object for vaadin-router in an one-element array.
     *
     * The `FlowRoute` object `path` property handles any route,
     * and the `action` returns the flow container without updating the content,
     * delaying the actual Flow server call to the `onBeforeEnter` phase.
     *
     * This is a specific API for its use with `vaadin-router`.
     */
    get serverSideRoutes() {
        return [
            {
                path: '(.*)',
                action: this.action
            }
        ];
    }
    loadingStarted() {
        // Make Testbench know that server request is in progress
        this.isActive = true;
        $wnd.Vaadin.connectionState.loadingStarted();
    }
    loadingFinished() {
        // Make Testbench know that server request has finished
        this.isActive = false;
        $wnd.Vaadin.connectionState.loadingFinished();
    }
    get action() {
        // Return a function which is bound to the flow instance, thus we can use
        // the syntax `...serverSideRoutes` in vaadin-router.
        // @ts-ignore
        return (params) => __awaiter(this, void 0, void 0, function* () {
            // Store last action pathname so as we can check it in events
            this.pathname = params.pathname;
            if ($wnd.Vaadin.connectionState.online) {
                // @ts-ignore
                try {
                    yield this.flowInit();
                }
                catch (error) {
                    if (error instanceof FlowUiInitializationError) {
                        // error initializing Flow: assume connection lost
                        $wnd.Vaadin.connectionState.state = ConnectionState.CONNECTION_LOST;
                        return this.offlineStubAction();
                    }
                    else {
                        throw error;
                    }
                }
            }
            else {
                // insert an offline stub
                return this.offlineStubAction();
            }
            // When an action happens, navigation will be resolved `onBeforeEnter`
            this.container.onBeforeEnter = (ctx, cmd) => this.flowNavigate(ctx, cmd);
            // For covering the 'server -> client' use case
            this.container.onBeforeLeave = (ctx, cmd) => this.flowLeave(ctx, cmd);
            return this.container;
        });
    }
    // Send a remote call to `JavaScriptBootstrapUI` to check
    // whether navigation has to be cancelled.
    flowLeave(
    // @ts-ignore
    ctx, cmd) {
        return __awaiter(this, void 0, void 0, function* () {
            // server -> server, viewing offline stub, or browser is offline
            const connectionState = $wnd.Vaadin.connectionState;
            if (this.pathname === ctx.pathname || !this.isFlowClientLoaded() || connectionState.offline) {
                return Promise.resolve({});
            }
            // 'server -> client'
            return new Promise((resolve) => {
                this.loadingStarted();
                // The callback to run from server side to cancel navigation
                this.container.serverConnected = (cancel) => {
                    resolve(cmd && cancel ? cmd.prevent() : {});
                    this.loadingFinished();
                };
                // Call server side to check whether we can leave the view
                flowRoot.$server.leaveNavigation(this.getFlowRoute(ctx));
            });
        });
    }
    // Send the remote call to `JavaScriptBootstrapUI` to render the flow
    // route specified by the context
    flowNavigate(ctx, cmd) {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.response) {
                return new Promise((resolve) => {
                    this.loadingStarted();
                    // The callback to run from server side once the view is ready
                    this.container.serverConnected = (cancel, redirectContext) => {
                        if (cmd && cancel) {
                            resolve(cmd.prevent());
                        }
                        else if (cmd && cmd.redirect && redirectContext) {
                            resolve(cmd.redirect(redirectContext.pathname));
                        }
                        else {
                            this.container.style.display = '';
                            resolve(this.container);
                        }
                        this.loadingFinished();
                    };
                    // Call server side to navigate to the given route
                    flowRoot.$server.connectClient(this.container.localName, this.container.id, this.getFlowRoute(ctx), this.appShellTitle);
                });
            }
            else {
                // No server response => offline or erroneous connection
                return Promise.resolve(this.container);
            }
        });
    }
    getFlowRoute(context) {
        return (context.pathname + (context.search || '')).replace(this.baseRegex, '');
    }
    // import flow client modules and initialize UI in server side.
    flowInit(serverSideRouting = false) {
        return __awaiter(this, void 0, void 0, function* () {
            // Do not start flow twice
            if (!this.isFlowClientLoaded()) {
                // show flow progress indicator
                this.loadingStarted();
                // Initialize server side UI
                this.response = yield this.flowInitUi(serverSideRouting);
                // Enable or disable server side routing
                this.response.appConfig.clientRouting = !serverSideRouting;
                const { pushScript, appConfig } = this.response;
                if (typeof pushScript === 'string') {
                    yield this.loadScript(pushScript);
                }
                const { appId } = appConfig;
                // Load bootstrap script with server side parameters
                const bootstrapMod = yield import('./FlowBootstrap');
                yield bootstrapMod.init(this.response);
                // Load custom modules defined by user
                if (typeof this.config.imports === 'function') {
                    this.injectAppIdScript(appId);
                    yield this.config.imports();
                }
                // Load flow-client module
                const clientMod = yield import('./FlowClient');
                yield this.flowInitClient(clientMod);
                if (!serverSideRouting) {
                    // we use a custom tag for the flow app container
                    const tag = `flow-container-${appId.toLowerCase()}`;
                    this.container = flowRoot.$[appId] = document.createElement(tag);
                    this.container.id = appId;
                    // It might be that components created from server expect that their content has been rendered.
                    // Appending eagerly the container we avoid these kind of errors.
                    // Note that the client router will move this container to the outlet if the navigation succeed
                    this.container.style.display = 'none';
                    document.body.appendChild(this.container);
                }
                // hide flow progress indicator
                this.loadingFinished();
            }
            return this.response;
        });
    }
    loadScript(url) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                const script = document.createElement('script');
                script.onload = () => resolve();
                script.onerror = reject;
                script.src = url;
                document.body.appendChild(script);
            });
        });
    }
    injectAppIdScript(appId) {
        const appIdWithoutHashCode = appId.substring(0, appId.lastIndexOf('-'));
        const scriptAppId = document.createElement('script');
        scriptAppId.type = 'module';
        scriptAppId.setAttribute('data-app-id', appIdWithoutHashCode);
        document.body.append(scriptAppId);
    }
    // After the flow-client javascript module has been loaded, this initializes flow UI
    // in the browser.
    flowInitClient(clientMod) {
        return __awaiter(this, void 0, void 0, function* () {
            clientMod.init();
            // client init is async, we need to loop until initialized
            return new Promise((resolve) => {
                const intervalId = setInterval(() => {
                    // client `isActive() == true` while initializing or processing
                    const initializing = Object.keys($wnd.Vaadin.Flow.clients)
                        .filter((key) => key !== 'TypeScript')
                        .reduce((prev, id) => prev || $wnd.Vaadin.Flow.clients[id].isActive(), false);
                    if (!initializing) {
                        clearInterval(intervalId);
                        resolve();
                    }
                }, 5);
            });
        });
    }
    // Returns the `appConfig` object
    flowInitUi(serverSideRouting) {
        return __awaiter(this, void 0, void 0, function* () {
            // appConfig was sent in the index.html request
            const initial = $wnd.Vaadin && $wnd.Vaadin.TypeScript && $wnd.Vaadin.TypeScript.initial;
            if (initial) {
                $wnd.Vaadin.TypeScript.initial = undefined;
                return Promise.resolve(initial);
            }
            // send a request to the `JavaScriptBootstrapHandler`
            return new Promise((resolve, reject) => {
                const xhr = new XMLHttpRequest();
                const httpRequest = xhr;
                const currentPath = location.pathname || '/';
                const requestPath = `${currentPath}?v-r=init` + (serverSideRouting ? `&location=${encodeURI(this.getFlowRoute(location))}` : '');
                httpRequest.open('GET', requestPath);
                httpRequest.onerror = () => reject(new FlowUiInitializationError(`Invalid server response when initializing Flow UI.
        ${httpRequest.status}
        ${httpRequest.responseText}`));
                httpRequest.onload = () => {
                    const contentType = httpRequest.getResponseHeader('content-type');
                    if (contentType && contentType.indexOf('application/json') !== -1) {
                        resolve(JSON.parse(httpRequest.responseText));
                    }
                    else {
                        httpRequest.onerror();
                    }
                };
                httpRequest.send();
            });
        });
    }
    // Create shared connection state store and connection indicator
    addConnectionIndicator() {
        // add connection indicator to DOM
        ConnectionIndicator.create();
        // Listen to browser online/offline events and update the loading indicator accordingly.
        // Note: if flow-client is loaded, it instead handles the state transitions.
        $wnd.addEventListener('online', () => {
            if (!this.isFlowClientLoaded()) {
                // Send an HTTP HEAD request for sw.js to verify server reachability.
                // We do not expect sw.js to be cached, so the request goes to the
                // server rather than being served from local cache.
                // Require network-level failure to revert the state to CONNECTION_LOST
                // (HTTP error code is ok since it still verifies server's presence).
                $wnd.Vaadin.connectionState.state = ConnectionState.RECONNECTING;
                const http = new XMLHttpRequest();
                const serverRoot = location.pathname || '/';
                http.open('HEAD', serverRoot + (serverRoot.endsWith('/') ? '' : ' /') + 'sw.js');
                http.onload = () => {
                    $wnd.Vaadin.connectionState.state = ConnectionState.CONNECTED;
                };
                http.onerror = () => {
                    $wnd.Vaadin.connectionState.state = ConnectionState.CONNECTION_LOST;
                };
                http.send();
            }
        });
        $wnd.addEventListener('offline', () => {
            if (!this.isFlowClientLoaded()) {
                $wnd.Vaadin.connectionState.state = ConnectionState.CONNECTION_LOST;
            }
        });
    }
    offlineStubAction() {
        return __awaiter(this, void 0, void 0, function* () {
            yield import('./OfflineStub');
            const offlineStub = document.createElement('vaadin-offline-stub');
            this.response = undefined;
            let onlineListener;
            const removeOfflineStubAndOnlineListener = () => {
                if (onlineListener !== undefined) {
                    $wnd.Vaadin.connectionState.removeStateChangeListener(onlineListener);
                    onlineListener = undefined;
                }
            };
            offlineStub.onBeforeEnter = (ctx, _cmds, router) => {
                onlineListener = () => {
                    if ($wnd.Vaadin.connectionState.online) {
                        removeOfflineStubAndOnlineListener();
                        router.render(ctx, false);
                    }
                };
                $wnd.Vaadin.connectionState.addStateChangeListener(onlineListener);
            };
            offlineStub.onBeforeLeave = (_ctx, _cmds, _router) => {
                removeOfflineStubAndOnlineListener();
            };
            return offlineStub;
        });
    }
    isFlowClientLoaded() {
        return this.response !== undefined;
    }
}
class FlowUiInitializationError extends Error {
    constructor(message) {
        super(message);
    }
}
//# sourceMappingURL=Flow.js.map