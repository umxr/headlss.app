/**
 * Implement Gatsby's SSR (Server Side Rendering) APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/ssr-apis/
 */

import wrapReduxProvider from "./src/utils/wrapReduxProvider";

export const wrapRootElement = wrapReduxProvider;
