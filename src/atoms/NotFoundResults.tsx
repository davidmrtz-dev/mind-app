import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { theme } from "../Theme";
import { faInbox } from "@fortawesome/free-solid-svg-icons";
import { BrandFontText } from "./text";
import styled from "styled-components";

const NotFoundContainer = styled.div`
  width: 100%;
  height: 120px;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
`;

export const NotFoundResults = (): JSX.Element => <NotFoundContainer>
  {BrandFontText('No results found')}
  <FontAwesomeIcon
    color={theme.colors.grays.normal}
    size='2x'
    icon={faInbox}
  />
</NotFoundContainer>;