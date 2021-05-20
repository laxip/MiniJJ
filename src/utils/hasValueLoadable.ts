import type { State } from './isLoadingLoadable';

const hasValueLoadable = <T extends State>(loadable: T) => {
  return loadable.state === 'hasValue';
};

export default hasValueLoadable;
