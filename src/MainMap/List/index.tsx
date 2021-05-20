import React, { FC, useMemo } from 'react';
import { List, AutoSizer } from 'react-virtualized';
import { JobOffersLoadable } from '../useJobOffers';
import { JobOfferItem, jobOfferColors, hoveredJobOffer } from '../states/jobOffersState';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import hasValueLoadable from '../../utils/hasValueLoadable';
import createRenderer from './createRenderer';

const EMPTY_LIST: any[] = [];
const DEFAULT_HEIGHT = 80;

const JobOfferList: FC<{
  offers: JobOffersLoadable;
}> = ({ offers }) => {
  const colors = useRecoilValue(jobOfferColors);
  const setHoveredJobOffer = useSetRecoilState(hoveredJobOffer);
  const jobOffers: JobOfferItem[] = (hasValueLoadable(offers) && offers.contents?.list) || EMPTY_LIST;

  const rowRenderer = useMemo(() => createRenderer(setHoveredJobOffer, colors, jobOffers), [jobOffers, colors, setHoveredJobOffer]);

  return (
    <AutoSizer>
      {({ width, height }) => (
        <List height={height} width={width} rowCount={jobOffers.length} rowHeight={DEFAULT_HEIGHT} rowRenderer={rowRenderer} />
      )}
    </AutoSizer>
  );
};

export default JobOfferList;
