import { Loadable } from 'recoil';
import { JobOfferItem } from './states/jobOffersState';
import { useMemo } from 'react';
import { point } from '@turf/turf';
import Supercluster from 'supercluster';
import { BBox } from 'geojson';

const WORLD_BBOX = [-180, -90, 180, 90] as BBox;
const SUPERCLUSTER_RADIUS = 10;
const SUPERCLUSTER_MAX_ZOOM = 16;

export type JobOfferPoint = {
  id: string;
  icon?: string;
  count?: number;
  type: 'count' | 'offer';
  coordinates: [number, number] | number[];
};

export type JobOffersLoadable<
  T = {
    list: JobOfferItem[];
    map: JobOfferPoint[];
  } | null,
> = {
  state: 'hasValue' | 'loading' | 'hasError';
  contents: T;
};

const useJobOffers = (loadable: Loadable<JobOfferItem[]>, _zoom?: number): JobOffersLoadable => {
  const zoom = (_zoom || 5) >> 0;

  const itemDictionary = useMemo(() => {
    if (loadable.state === 'hasValue') {
      const dictionary: {
        [key: string]: JobOfferItem;
      } = {};

      loadable.contents.forEach((item) => {
        dictionary[item.id] = item;
      });

      return dictionary;
    }

    return null;
  }, [loadable]);

  const clusterIndex = useMemo(() => {
    if (loadable.state === 'hasValue') {
      const points = loadable.contents.map((offer) => {
        return point([offer.longitude, offer.latitude], {
          id: offer.id,
        });
      });

      const cluster = new Supercluster({
        radius: SUPERCLUSTER_RADIUS,
        maxZoom: SUPERCLUSTER_MAX_ZOOM,
      });

      cluster.load(points);

      return cluster;
    }

    return null;
  }, [loadable]);

  const data = useMemo(() => {
    if (clusterIndex && zoom && itemDictionary) {
      const clusters = clusterIndex.getClusters(WORLD_BBOX, zoom);

      const points: JobOfferPoint[] = [];
      const pairs: {
        [k: string]: string;
      } = {};

      clusters.forEach((cluster) => {
        if (cluster.id) {
          const children = clusterIndex.getLeaves(cluster.id as number, Infinity);
          const clusterId = cluster?.id?.toString();

          children.forEach((child) => {
            pairs[child.properties.id] = clusterId;
          });

          points.push({
            id: clusterId,
            count: cluster.properties.point_count,
            type: 'count',
            coordinates: cluster.geometry.coordinates,
          });
        } else {
          const id = cluster.properties.id;

          pairs[id] = id;

          points.push({
            id,
            icon: itemDictionary[id].markerIcon,
            type: 'offer',
            coordinates: cluster.geometry.coordinates,
          });
        }
      });

      const items = loadable.contents.map((item: JobOfferItem) => ({
        ...item,
        pointerId: pairs[item.id],
      }));

      return {
        list: items,
        map: points,
      };
    }

    return null;
  }, [clusterIndex, itemDictionary, zoom, loadable.contents]);

  return {
    state: loadable.state,
    contents: data,
  };
};

export default useJobOffers;
