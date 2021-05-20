import styled from 'styled-components';

export const Container = styled.div`
  padding: 30px;
  position: absolute;
  z-index: 2;
  background: ${(p) => p.theme.colors.background};
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  overflow-y: scroll;
`;

export const Title = styled.div`
  margin-top: 40px;
  font-size: 40px;
`;
