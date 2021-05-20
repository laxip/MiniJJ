import React, { FC, useEffect, useMemo } from 'react';
import { useRecoilValueLoadable, useSetRecoilState } from 'recoil';
import { JobOfferItem, jobOffersSelector } from '../states/jobOffersState';
import { useParams, useHistory } from 'react-router-dom';
import { Container, Title } from './JobOffer.view';
import { defaultState, viewState } from '../states/viewState';

const JobOffer: FC<{
  handlePanToItem: (item: JobOfferItem) => {} | undefined;
}> = ({ handlePanToItem }) => {
  const match =
    useParams<{
      id: string;
    }>();
  const history = useHistory();
  const setDefaultViewState = useSetRecoilState(viewState);
  const jobOfferLoadable = useRecoilValueLoadable(jobOffersSelector);

  const id = match?.id;

  const offer = useMemo(() => {
    if (jobOfferLoadable.state === 'hasValue' && id) {
      return jobOfferLoadable.contents.find((item) => item.id === id);
    }

    return;
  }, [jobOfferLoadable, id]);

  useEffect(() => {
    if (offer) {
      const newView = handlePanToItem(offer);

      setDefaultViewState({
        ...defaultState,
        ...newView,
      });
    }

    return () => {
      setDefaultViewState(defaultState);
    };
  }, [handlePanToItem, setDefaultViewState, offer]);

  if (!offer) {
    return null;
  }

  return (
    <Container>
      <button
        onClick={() => {
          history.goBack();
        }}
      >
        Back
      </button>
      <Title>
        {offer.title} ({offer.experienceLevel})
      </Title>
      <div>
        {offer.companyName} from {offer.city}
      </div>
      {offer.salaryFrom && (
        <div>
          {offer.salaryFrom} - {offer.salaryTo} {offer.salaryCurrency}
        </div>
      )}
    </Container>
  );
};

export default JobOffer;
