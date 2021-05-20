import { useRecoilValue } from 'recoil';
import { JobOfferPoint } from '../useJobOffers';
import { ScatterplotLayer, TextLayer } from '@deck.gl/layers';
import { hoveredJobOffer, jobOfferColors } from '../states/jobOffersState';
import { RGBAColor } from '@deck.gl/core/utils/color';

const useJobOffersLayer = (data?: JobOfferPoint[]) => {
  const hoveredJobOfferId = useRecoilValue(hoveredJobOffer)?.toString();
  const colors = useRecoilValue(jobOfferColors);

  const textLayer = new TextLayer<JobOfferPoint>({
    id: 'text-layer',
    data,
    pickable: true,
    getPosition: (d) => d.coordinates as [number, number],
    getText: (d) => {
      return (d.type === 'count' ? d?.count?.toString() : '') || '';
    },
    getSize: 18,
    getAngle: 0,
    getTextAnchor: 'middle',
    getAlignmentBaseline: 'center',
    getColor: [255, 255, 255],
    getPixelOffset: [15, -15],
    backgroundColor: [0, 0, 0],
  });

  const iconLayer = new ScatterplotLayer<JobOfferPoint>({
    id: 'icon-layer',
    data,
    pickable: true,
    stroked: false,
    filled: true,
    radiusUnits: 'pixels',
    radiusScale: 1,
    radiusMinPixels: 10,
    radiusMaxPixels: 30,
    getPosition: (d) => d.coordinates as [number, number],
    getRadius: (d) => (d.id === hoveredJobOfferId ? 30 : 15),
    getFillColor: (d) => {
      const icon = d.icon || '';
      if (colors.hasOwnProperty(icon)) {
        return colors[icon] as RGBAColor;
      } else {
        return [200, 200, 200];
      }
    },
    updateTriggers: {
      getRadius: hoveredJobOfferId,
    },
  });

  return [iconLayer, textLayer];
};

export default useJobOffersLayer;
