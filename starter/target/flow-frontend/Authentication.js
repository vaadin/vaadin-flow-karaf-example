var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
/**
 * A helper method for Spring Security based form login.
 * @param username
 * @param password
 * @param options defines additional options, e.g, the loginProcessingUrl, failureUrl, defaultSuccessUrl etc.
 */
export function login(username, password, options) {
    return __awaiter(this, void 0, void 0, function* () {
        let result;
        try {
            const data = new FormData();
            data.append('username', username);
            data.append('password', password);
            const loginProcessingUrl = options && options.loginProcessingUrl ? options.loginProcessingUrl : '/login';
            const response = yield fetch(loginProcessingUrl, { method: 'POST', body: data });
            const failureUrl = options && options.failureUrl ? options.failureUrl : '/login?error';
            const defaultSuccessUrl = options && options.defaultSuccessUrl ? options.defaultSuccessUrl : '/';
            // this assumes the default Spring Security form login configuration (handler URL and responses)
            if (response.ok && response.redirected && response.url.endsWith(failureUrl)) {
                result = {
                    error: true,
                    errorTitle: 'Incorrect username or password.',
                    errorMessage: 'Check that you have entered the correct username and password and try again.'
                };
            }
            else if (response.ok && response.redirected && response.url.endsWith(defaultSuccessUrl)) {
                // TODO: find a more efficient way to get a new CSRF token
                // parsing the full response body just to get a token may be wasteful
                const token = getCsrfTokenFromResponseBody(yield response.text());
                if (token) {
                    window.Vaadin.TypeScript = window.Vaadin.TypeScript || {};
                    window.Vaadin.TypeScript.csrfToken = token;
                    result = {
                        error: false,
                        errorTitle: '',
                        errorMessage: '',
                        token
                    };
                }
            }
        }
        catch (e) {
            result = {
                error: true,
                errorTitle: e.name,
                errorMessage: e.message
            };
        }
        return (result || {
            error: true,
            errorTitle: 'Error',
            errorMessage: 'Something went wrong when trying to login.'
        });
    });
}
/**
 * A helper method for Spring Security based form logout
 * @param options defines additional options, e.g, the logoutUrl.
 */
export function logout(options) {
    return __awaiter(this, void 0, void 0, function* () {
        // this assumes the default Spring Security logout configuration (handler URL)
        const logoutUrl = options && options.logoutUrl ? options.logoutUrl : '/logout';
        try {
            const response = yield fetch(logoutUrl);
            // TODO: find a more efficient way to get a new CSRF token
            // parsing the full response body just to get a token may be wasteful
            const token = getCsrfTokenFromResponseBody(yield response.text());
            window.Vaadin.TypeScript.csrfToken = token;
        }
        catch (error) {
            // clear the token if the call fails
            delete window.Vaadin.TypeScript.csrfToken;
            throw error;
        }
    });
}
const getCsrfTokenFromResponseBody = (body) => {
    const match = body.match(/window\.Vaadin = \{TypeScript: \{"csrfToken":"([0-9a-zA-Z\\-]{36})"}};/i);
    return match ? match[1] : undefined;
};
/**
 * A helper class for handling invalid sessions during an endpoint call.
 * E.g., you can use this to show user a login page when the session has expired.
 */
export class InvalidSessionMiddleware {
    constructor(onInvalidSessionCallback) {
        this.onInvalidSessionCallback = onInvalidSessionCallback;
    }
    invoke(context, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const clonedContext = Object.assign({}, context);
            clonedContext.request = context.request.clone();
            const response = yield next(context);
            if (response.status === 401) {
                const loginResult = yield this.onInvalidSessionCallback();
                if (loginResult.token) {
                    clonedContext.request.headers.set('X-CSRF-Token', loginResult.token);
                    return next(clonedContext);
                }
            }
            return response;
        });
    }
}
//# sourceMappingURL=Authentication.js.map