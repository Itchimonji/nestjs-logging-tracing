import { INestApplication } from "@nestjs/common";
import * as helmet from "helmet";
import { IncomingMessage, ServerResponse } from "http";

export const secureApplication = (app: INestApplication) => {
  app
    /**
     * this middleware sets the X-Download-Options to prevent Internet Explorer from executing downloads in your site’s context.
     * see: https://helmetjs.github.io/docs/ienoopen/
     */
    .use(helmet.noSniff())
    /**
     * the xssFilter middleware sets the X-XSS-Protection header to prevent reflected XSS attacks
     * see: https://helmetjs.github.io/docs/xss-filter/
     */
    .use(helmet.xssFilter())
    /**
     * the Referrer Policy module can control the behavior of the Referer header by setting the Referrer-Policy header.
     * see: https://helmetjs.github.io/docs/referrer-policy/
     */
    .use(helmet.referrerPolicy())
    /**
     * crossdomain middleware prevents Adobe Flash and Adobe Acrobat from loading-spinner content on your site.
     * see: https://helmetjs.github.io/docs/crossdomain/
     */
    .use(helmet.permittedCrossDomainPolicies())
    /**
     * this middleware sets the X-Download-Options to prevent Internet Explorer from executing downloads in your site’s context.
     * see:https://helmetjs.github.io/docs/ienoopen/
     */
    .use(helmet.ieNoOpen())
    /**
     * The Hide Powered-By middleware removes the X-Powered-By header to make it slightly harder for attackers to see what
     * potentially-vulnerable technology powers your site.
     * see: https://helmetjs.github.io/docs/hide-powered-by/
     */
    .use(helmet.hidePoweredBy())
    /**
     * this module sets the Strict-Transport-Security header to keep your users on HTTPS.
     * see: https://helmetjs.github.io/docs/hsts/
     */
    .use(helmet.hsts())
    /**
     * this middleware lets you disable browsers’ DNS prefetching by setting the X-DNS-Prefetch-Control header.
     * see: https://helmetjs.github.io/docs/dns-prefetch-control/
     */
    .use(helmet.dnsPrefetchControl())
    /**
     * Frameguard mitigates clickjacking attacks by setting the X-Frame-Options header.
     * see: https://helmetjs.github.io/docs/frameguard/
     */
    .use(helmet.frameguard())
    /**
     * the CSP module sets the Content-Security-Policy header which can help protect against malicious injection of
     * JavaScript, CSS, plugins, and more.
     * see:https://helmetjs.github.io/docs/csp/
     */
    // eslint-disable-next-line
    .use((err: any, req: IncomingMessage, res: ServerResponse, next: { (): any; (err?: Error | undefined): void }) => {
      const { url, method } = req;

      // exclude graphql playground
      if (method === "GET" && url === "/graphql") return next();

      const { host } = new URL("");

      helmet.contentSecurityPolicy({
        directives: {
          defaultSrc: ["'self'"],
          fontSrc: ["'self'", "report:"],
          styleSrc: ["'self'", "'unsafe-inline'", host],
          connectSrc: ["'self'", host],
          frameSrc: ["'self'", host],
          imgSrc: ["'self'", "report:", "validator.swagger.io", host],
          scriptSrc: ["'self'", host]
        }
      })(req, res, next);
    });
};
