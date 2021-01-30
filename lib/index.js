"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.show = void 0;
var nunjucks = require("nunjucks");
var future_1 = require("@quenk/noni/lib/control/monad/future");
var record_1 = require("@quenk/noni/lib/data/record");
var defaultOpts = { autoescape: true, noCache: true, path: 'views' };
/**
 * show the result of parsing a template with optional context.
 */
var show = function (options) {
    return function (view, ctx) {
        if (ctx === void 0) { ctx = {}; }
        var opts = record_1.merge(defaultOpts, options);
        var env = nunjucks.configure(opts.path, opts);
        // XXX: We leave it to the user to specify ensure filters are proper
        // functions.
        if (record_1.isRecord(opts.filters))
            record_1.forEach(opts.filters, function (f, k) { return env.addFilter(k, f); });
        return future_1.fromCallback(function (cb) { return env.render(view, ctx, function (e, content) {
            if (e)
                return cb(e);
            return cb(undefined, { type: 'text/html', content: content });
        }); });
    };
};
exports.show = show;
//# sourceMappingURL=index.js.map