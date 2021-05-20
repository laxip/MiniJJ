import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const RowContainer = styled.div`
  padding: 5px 10px;
  box-sizing: border-box;
`;

export const Offer = styled(({ markerColor, ...props }) => <Link {...props} />)<{
  markerColor: number[];
}>`
  border-left: 6px solid ${(p) => (p.markerColor ? `rgb(${p.markerColor.join(',')})` : p.theme.colors.secondary)};
  border-radius: 6px;
  box-shadow: 0 2px 8px #0000001f;
  box-sizing: border-box;
  padding: 5px;
  display: flex;
  text-decoration: none;
`;

export const ImageWrapper = styled.div`
  margin: 5px 10px;
  margin-right: 30px;
  width: 150px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex: none;
`;

export const Image = styled.img`
  max-height: 40px;
  max-width: 150px;
  display: block;
`;

export const Title = styled.div`
  font-weight: 500;
`;

export const About = styled.div`
  flex-grow: 1;
  display: flex;
  justify-content: space-between;
  color: ${(p) => p.theme.colors.primary};
`;

export const LeftColumn = styled.div``;

export const RightColumn = styled.div`
  text-align: right;
  min-width: 200px;
`;

export const Pan = styled.div``;

export const Salary = styled.div`
  color: ${(p) => p.theme.colors.highlight};
  font-size: 18px;
`;

export const Place = styled.div`
  font-size: 11px;
  color: ${(p) => p.theme.colors.secondary};
`;
