declare module '@deck.gl/extensions' {
  export type Props = {
    dash?: boolean;
    highPrecisionDash?: boolean;
    offset?: boolean;
  };

  export class PathStyleExtension {
    constructor(props: Props);
  }

  export type PathStyleExtensionLayerProps<D = any> = {
    getDashArray?: ((d: D) => [number, number]) | readonly [number, number];
    dashJustified?: boolean;
    getOffset?: ((d: D) => number) | number;
  };
}
