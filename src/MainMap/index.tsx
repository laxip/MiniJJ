import React, { FC } from 'react';
import { AutoSizer, Size } from 'react-virtualized';
import { DefaultTheme, withTheme } from 'styled-components';
import { useRecoilValue, useRecoilValueLoadable } from 'recoil';

import Drawer from './Drawer';
import Map from './Map';
import useJobOfferColors from './useJobOfferColors';
import useJobOffers from './useJobOffers';
import { Container, AutoSizerWrapper } from './MainMap.view';
import { jobOffersSelector } from './states/jobOffersState';
import { viewState } from './states/viewState';

const MainMap: FC<{
  theme: DefaultTheme;
}> = ({ theme }) => {
  const zoom = useRecoilValue(viewState).zoom;
  const loadable = useRecoilValueLoadable(jobOffersSelector);

  const offers = useJobOffers(loadable, zoom);
  useJobOfferColors(offers, theme.offerColors);

  return (
    <Container>
      <Drawer offers={offers} />

      <AutoSizerWrapper>
        <AutoSizer>{({ width, height }: Size) => <Map width={width} height={height} offers={offers} />}</AutoSizer>
      </AutoSizerWrapper>
    </Container>
  );
};

export default withTheme(MainMap);
