import { WebMercatorViewport } from '@math.gl/web-mercator';
import KDBush from 'kdbush';
import { useCallback, useMemo } from 'react';
import { useRecoilValueLoadable } from 'recoil';
import { JobOfferItem, jobOffersSelector } from './states/jobOffersState';
import { MapSizesState } from './states/viewState';

const ZOOM_RADIUS = 50;
const MIN_ZOOM_FOR_SELECTION = 3;
const BINSEARCH_STOP_DISTANCE = 0.01;

const usePanToItem = (sizes?: MapSizesState) => {
  const loadable = useRecoilValueLoadable(jobOffersSelector);

  const viewport = useMemo(() => {
    if (!sizes) {
      return;
    }

    return new WebMercatorViewport({
      width: sizes.width,
      height: sizes.height,
      longitude: 0,
      latitude: 0,
      zoom: 0,
    });
  }, [sizes]);

  const tree = useMemo(() => {
    if (loadable.state === 'hasValue' && viewport) {
      const data = loadable.contents;
      const projectedData = data.map((item) => viewport.project([item.longitude, item.latitude]));

      return new KDBush(projectedData);
    }

    return;
  }, [loadable, viewport]);

  const callback = useCallback(
    (item: JobOfferItem) => {
      if (!(tree && viewport)) {
        return;
      }

      const position = viewport.project([item.longitude, item.latitude]);

      let left = 0;
      let right = 2 * ZOOM_RADIUS;

      while (right - left >= BINSEARCH_STOP_DISTANCE) {
        const middle = (right + left) / 2;

        const howManyItemsInRadius = tree.within(position[0], position[1], middle).length - 1;

        if (howManyItemsInRadius >= 1) {
          right = middle;
        } else {
          left = middle;
        }
      }

      let r = (right + left) / 2; // distance to nearest item

      const howManyTimesIncreaseDistance = ZOOM_RADIUS / r;

      const zoom = Math.max(Math.log2(howManyTimesIncreaseDistance), MIN_ZOOM_FOR_SELECTION);

      return {
        longitude: item.longitude,
        latitude: item.latitude,
        zoom,
      };
    },
    [tree, viewport],
  );

  return callback;
};

export default usePanToItem;
