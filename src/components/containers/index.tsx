import styled from 'styled-components';

export const LayoutContainer = styled.div`
  background:
    linear-gradient(
      25deg,
      ${props => props.theme.colors.whites.lighter} 35%,
      ${props => props.theme.colors.whites.normal} 100%)
    ;
  max-width: 360px;
`;

export const LayoutContent = styled.div`
  padding: 0 16px;
`;

export const LoadingWrapper = styled.div<{height?: string}>`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: ${p => p.height || '250px'};
`;

export const AppMainContainer = styled.div`
  background-color: ${props => props.theme.colors.grays.light};
  display: flex;
  justify-content: center;
  min-height: 100vh;
`;

export const ElementContainer = styled.div`
  background-color: ${p => p.theme.colors.grays.light};
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
  margin: 5px 0;
  cursor: default;
  position: relative;
`;

