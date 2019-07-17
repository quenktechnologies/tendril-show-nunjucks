import * as nunjucks from 'nunjucks';
import { Show } from '@quenk/tendril/lib/app/show';
/**
 * Options for configuring the nunjucks view engine.
 */
export interface Options extends nunjucks.ConfigureOptions {
    [key: string]: any;
    /**
     * path to templates.
     */
    path: string;
}
/**
 * show the result of parsing a template with optional context.
 */
export declare const show: (options: Options) => Show;
