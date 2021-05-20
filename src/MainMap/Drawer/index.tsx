import React, { FC } from 'react';
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';
import JobOffer from '../JobOffer';
import List from '../List';
import { JobOffersLoadable } from '../useJobOffers';
import { DrawerContainer } from './Drawer.view';
import isLoadingLoadable from '../../utils/isLoadingLoadable';
import hasValueLoadable from '../../utils/hasValueLoadable';
import { useRecoilValue } from 'recoil';
import { mapSizesState } from '../states/viewState';
import usePanToItem from '../usePanToItem';

const Drawer: FC<{
  offers: JobOffersLoadable;
}> = ({ offers }) => {
  const isLoading = isLoadingLoadable(offers);
  const hasValue = hasValueLoadable(offers);

  const mapSizes = useRecoilValue(mapSizesState);

  const panToItem = usePanToItem(mapSizes);

  return (
    <DrawerContainer>
      {isLoading && <div>loading....</div>}

      <Router>
        <Switch>
          <Route exact path="/offer/:id">
            <JobOffer handlePanToItem={panToItem} />
          </Route>
        </Switch>

        {hasValue && <List offers={offers} />}
      </Router>
    </DrawerContainer>
  );
};

export default Drawer;
