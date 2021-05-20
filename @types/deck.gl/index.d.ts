import * as DeckTypings from '@danmarshall/deckgl-typings';

declare module 'deck.gl' {
  export namespace DeckTypings {}

  export type HoverInfo = {
    picked?: boolean;
    object: {
      [k: string]: any;
    };
    layer?: null | {
      id: string;
    };
    index: number;
  };
}
