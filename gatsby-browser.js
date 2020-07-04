/**
 * Implement Gatsby's Browser APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/browser-apis/
 */

import wrapWithProvider from "./src/utils/wrapReduxProvider";

export const wrapRootElement = wrapWithProvider;
