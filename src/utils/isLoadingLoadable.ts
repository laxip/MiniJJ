export interface State {
  state: 'loading' | 'hasValue' | 'hasError';
}

const isLoadingLoadable = <T extends State>(loadable: T) => {
  return loadable.state === 'loading';
};

export default isLoadingLoadable;
