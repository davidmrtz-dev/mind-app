import styled from "styled-components";

export const TeamsContainer = styled.div<{ reveal: boolean }>`
  opacity: ${p => p.reveal ? 1 : 0};
  transition: opacity 1s ease-in-out;
  display: flex;
  flex-direction: column;
`;