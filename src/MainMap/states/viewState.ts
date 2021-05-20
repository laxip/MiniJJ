import { atom } from 'recoil';
import { easeCubic } from 'd3-ease';
import { FlyToInterpolator } from 'react-map-gl';
import { ViewStateProps } from '@deck.gl/core/lib/deck';

export const DEFAULT_TRANSITION_DURATION = 1000;
export const DEFAULT_TRANSITION_INTERPOLATOR = new FlyToInterpolator();

export const defaultState: ViewStateProps = {
  bearing: 0,
  latitude: 51.75, // ~Lodz
  longitude: 19.45,
  minZoom: 2,
  maxZoom: 16,
  pitch: 0,
  transitionDuration: DEFAULT_TRANSITION_DURATION,
  // @ts-ignore
  transitionInterpolator: DEFAULT_TRANSITION_INTERPOLATOR,
  transitionEasing: easeCubic,
  zoom: 5.3,
};

export const viewState = atom<ViewStateProps>({
  key: 'viewState',
  default: defaultState,
});

export type MapSizesState = {
  width: number;
  height: number;
};

export const mapSizesState = atom<MapSizesState | undefined>({
  key: 'mapSizesState',
  default: undefined,
});
