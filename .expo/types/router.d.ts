/* eslint-disable */
import * as Router from 'expo-router';

export * from 'expo-router';

declare module 'expo-router' {
  export namespace ExpoRouter {
    export interface __routes<T extends string | object = string> {
      hrefInputParams: { pathname: Router.RelativePathString, params?: Router.UnknownInputParams } | { pathname: Router.ExternalPathString, params?: Router.UnknownInputParams } | { pathname: `/`; params?: Router.UnknownInputParams; } | { pathname: `/login`; params?: Router.UnknownInputParams; } | { pathname: `/_sitemap`; params?: Router.UnknownInputParams; } | { pathname: `/barcode`; params?: Router.UnknownInputParams; } | { pathname: `/barcode/Overlay`; params?: Router.UnknownInputParams; } | { pathname: `/scanner`; params?: Router.UnknownInputParams; } | { pathname: `/scanner/Overlay`; params?: Router.UnknownInputParams; };
      hrefOutputParams: { pathname: Router.RelativePathString, params?: Router.UnknownOutputParams } | { pathname: Router.ExternalPathString, params?: Router.UnknownOutputParams } | { pathname: `/`; params?: Router.UnknownOutputParams; } | { pathname: `/login`; params?: Router.UnknownOutputParams; } | { pathname: `/_sitemap`; params?: Router.UnknownOutputParams; } | { pathname: `/barcode`; params?: Router.UnknownOutputParams; } | { pathname: `/barcode/Overlay`; params?: Router.UnknownOutputParams; } | { pathname: `/scanner`; params?: Router.UnknownOutputParams; } | { pathname: `/scanner/Overlay`; params?: Router.UnknownOutputParams; };
      href: Router.RelativePathString | Router.ExternalPathString | `/${`?${string}` | `#${string}` | ''}` | `/login${`?${string}` | `#${string}` | ''}` | `/_sitemap${`?${string}` | `#${string}` | ''}` | `/barcode${`?${string}` | `#${string}` | ''}` | `/barcode/Overlay${`?${string}` | `#${string}` | ''}` | `/scanner${`?${string}` | `#${string}` | ''}` | `/scanner/Overlay${`?${string}` | `#${string}` | ''}` | { pathname: Router.RelativePathString, params?: Router.UnknownInputParams } | { pathname: Router.ExternalPathString, params?: Router.UnknownInputParams } | { pathname: `/`; params?: Router.UnknownInputParams; } | { pathname: `/login`; params?: Router.UnknownInputParams; } | { pathname: `/_sitemap`; params?: Router.UnknownInputParams; } | { pathname: `/barcode`; params?: Router.UnknownInputParams; } | { pathname: `/barcode/Overlay`; params?: Router.UnknownInputParams; } | { pathname: `/scanner`; params?: Router.UnknownInputParams; } | { pathname: `/scanner/Overlay`; params?: Router.UnknownInputParams; };
    }
  }
}
