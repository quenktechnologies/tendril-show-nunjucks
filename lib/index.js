"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.show = void 0;
const nunjucks = require("nunjucks");
const future_1 = require("@quenk/noni/lib/control/monad/future");
const record_1 = require("@quenk/noni/lib/data/record");
const defaultOpts = { autoescape: true, noCache: true, path: 'views' };
/**
 * show the result of parsing a template with optional context.
 */
const show = (options) => (view, ctx = {}) => {
    let opts = record_1.merge(defaultOpts, options);
    let env = nunjucks.configure(opts.path, opts);
    // XXX: We leave it to the user to specify ensure filters are proper
    // functions.
    if (record_1.isRecord(opts.filters))
        record_1.forEach(opts.filters, (f, k) => env.addFilter(k, f));
    return future_1.fromCallback(cb => env.render(view, ctx, (e, content) => {
        if (e)
            return cb(e);
        return cb(undefined, { type: 'text/html', content });
    }));
};
exports.show = show;
//# sourceMappingURL=index.js.map