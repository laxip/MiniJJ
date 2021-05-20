import { ListRowRenderer } from 'react-virtualized';
import { About, Image, ImageWrapper, LeftColumn, Offer, Place, RightColumn, RowContainer, Salary, Title } from './List.view';
import React from 'react';
import { JobOfferItem } from '../states/jobOffersState';

const createRenderer = (
  setHoveredJobOffer: (arg?: string | null) => void,
  colors: { [k: string]: number[] },
  jobOffers: JobOfferItem[],
) => {
  const renderer: ListRowRenderer = ({ key, style, index }) => {
    const offer = jobOffers[index];

    const type = offer.markerIcon;

    return (
      <RowContainer key={key} style={style}>
        <Offer
          to={`/offer/${offer.id}`}
          markerColor={colors[type]}
          onMouseEnter={() => {
            setHoveredJobOffer(offer.pointerId);
          }}
          onMouseLeave={() => {
            setHoveredJobOffer(null);
          }}
        >
          <ImageWrapper>
            <Image src={offer.companyLogoUrl} />
          </ImageWrapper>
          <About>
            <LeftColumn>
              <Title>{offer.title}</Title>
            </LeftColumn>

            <RightColumn>
              <Salary>
                {offer.salaryFrom} - {offer.salaryTo}
              </Salary>
              <Place>
                {offer.companyName} from {offer.city}
              </Place>
            </RightColumn>
          </About>
        </Offer>
      </RowContainer>
    );
  };

  return renderer;
};

export default createRenderer;
