import { CSSProperties } from 'react';

export type Position =
  | '-webkit-sticky'
  | 'absolute'
  | 'fixed'
  | 'relative'
  | 'static'
  | 'sticky';

export type CssKeyObject = {
  [key: string]: CSSProperties;
};
