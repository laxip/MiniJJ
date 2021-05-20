import styled from 'styled-components';

export const DrawerContainer = styled.div`
  width: ${(p) => p.theme.listWidth}px;
  background: ${(p) => p.theme.colors.background};
  box-sizing: border-box;
  box-shadow: ${(p) => p.theme.shadows.modal};
  position: relative;
  z-index: ${(p) => p.theme.zIndices.modal};
`;
