import { JobOffersLoadable } from './useJobOffers';
import { useEffect } from 'react';
import { useSetRecoilState } from 'recoil';
import { jobOfferColors } from './states/jobOffersState';
import hasValueLoadable from '../utils/hasValueLoadable';

const useJobOfferColors = (loadable: JobOffersLoadable, colors: Array<number[]>) => {
  const setColors = useSetRecoilState(jobOfferColors);

  useEffect(() => {
    if (hasValueLoadable(loadable)) {
      const dictionary: {
        [k: string]: number[];
      } = {};

      let colorIterator = 0;

      loadable.contents?.list?.forEach((item) => {
        const type = item.markerIcon;

        if (!dictionary.hasOwnProperty(type)) {
          dictionary[type] = colors[colorIterator];

          // duplicate last color
          colorIterator = Math.min(colorIterator + 1, colors.length - 1);
        }
      });

      setColors(dictionary);
    }
  }, [loadable, colors, setColors]);
};

export default useJobOfferColors;
