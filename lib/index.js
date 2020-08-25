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
exports.show = function (options) {
    return function (view, ctx) {
        if (ctx === void 0) { ctx = {}; }
        var opts = record_1.merge(defaultOpts, options);
        var env = nunjucks.configure(opts.path, opts);
        return future_1.fromCallback(function (cb) { return env.render(view, ctx, function (e, content) {
            if (e)
                return cb(e);
            return cb(undefined, { type: 'text/html', content: content });
        }); });
    };
};
//# sourceMappingURL=index.js.map