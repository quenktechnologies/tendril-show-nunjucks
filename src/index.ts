import * as nunjucks from 'nunjucks';

import { Future, fromCallback } from '@quenk/noni/lib/control/monad/future';
import { isRecord, merge, forEach } from '@quenk/noni/lib/data/record';

import { Show, Content } from '@quenk/tendril/lib/app/show';

/**
 * Options for configuring the nunjucks view engine.
 */
export interface Options extends nunjucks.ConfigureOptions {

    [key: string]: any

    /**
     * path to templates.
     */
    path: string

}

const defaultOpts: Options = { autoescape: true, noCache: true, path: 'views' };

/**
 * show the result of parsing a template with optional context.
 */
export const show = (options: Options): Show =>
    (view: string, ctx: object = {}): Future<Content> => {

        let opts: Options = merge(<any>defaultOpts, options);

        let env = nunjucks.configure(opts.path, opts);

      // XXX: We leave it to the user to specify ensure filters are proper
      // functions.
        if (isRecord(opts.filters)) 
            forEach(opts.filters, (f, k) => env.addFilter(k, <any>f));

        return fromCallback(cb => env.render(view, ctx,
            (e: Error | null, content: string | null) => {

                if (e)
                    return cb(e);

                return cb(undefined, <Content>{ type: 'text/html', content });

            }));

    }
