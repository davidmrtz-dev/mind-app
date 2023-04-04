import styled from "styled-components";
import { IUser } from "../../../@types";
import { theme } from "../../../Theme";
import { BrandSubFontText } from "../../../atoms/text";

const UserDataContainer = styled.div`
  width: 100%;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
`;

export const UserData = (user: IUser): JSX.Element => {
  return<UserDataContainer>
    {BrandSubFontText('Name', {
      backgroundColor: theme.colors.grays.lighter,
      borderTopLeftRadius: 'inherit',
      borderTopRightRadius: 'inherit',
      width: '100%',
      paddingLeft: 5
    })}
    {BrandSubFontText(user.name, {
      backgroundColor: theme.colors.whites.lighter,
      width: '100%',
      paddingLeft: 5
    })}
    {BrandSubFontText('Email', {
      backgroundColor: theme.colors.grays.lighter,
      width: '100%',
      paddingLeft: 5
    })}
    {BrandSubFontText(user.email, {
      backgroundColor: theme.colors.whites.lighter,
      borderBottomLeftRadius: 'inherit',
      borderBottomRightRadius: 'inherit',
      width: '100%',
      paddingLeft: 5
    })}
  </UserDataContainer>;
};