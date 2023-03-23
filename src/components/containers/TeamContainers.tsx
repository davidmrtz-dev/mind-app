import styled from "styled-components";

export const TeamContainer = styled.div`
  background-color: ${p => p.theme.colors.grays.light};
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
  margin: 5px 0;
  padding: 5px 10px;
  cursor: default;
  position: relative;
`;

export const ItemWrapper = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
`;