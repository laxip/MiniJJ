import React, { ComponentProps, ComponentType, FC, useEffect } from 'react';
import { StaticMap as _StaticMap } from 'react-map-gl';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { MapView } from '@deck.gl/core';
import DeckGL from '@deck.gl/react';

import { mapSizesState, viewState } from '../states/viewState';
import useJobOffersLayer from './useJobOffersLayer';
import { JobOffersLoadable } from '../useJobOffers';

const StaticMap = _StaticMap as unknown as ComponentType<Omit<ComponentProps<typeof _StaticMap>, 'width' | 'height'>>;

const MAP_VIEW = new MapView({ repeat: true });

const MapContent: FC<{
  width: number;
  height: number;
  offers: JobOffersLoadable;
}> = ({ width, height, offers }) => {
  const [viewStateHistory, setViewState] = useRecoilState(viewState);
  const setSizes = useSetRecoilState(mapSizesState);

  const layers = [...useJobOffersLayer(offers.contents?.map)];

  const changeViewState = (state: any) => {
    setViewState({ ...state.viewState });
  };

  useEffect(() => {
    if (width && height) {
      setSizes({
        width,
        height,
      });
    }
  }, [width, height, setSizes]);

  return (
    <DeckGL
      layers={layers}
      views={MAP_VIEW as any}
      initialViewState={viewStateHistory}
      controller={{ dragRotate: false }}
      onViewStateChange={changeViewState}
    >
      <StaticMap mapStyle={process.env.REACT_APP_TILES_PROVIDER_URL} reuseMaps={true} />
    </DeckGL>
  );
};

export default MapContent;
