import styled from "styled-components";
import { IUser } from "../../../@types";
import { Typography } from "antd";
import { theme } from "../../../Theme";

const UserDataContainer = styled.div`
  width: 100%;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
`;

export const UserData = (user: IUser): JSX.Element => {
  return<UserDataContainer>
    <Typography.Text
      style={{
        backgroundColor: theme.colors.grays.lighter,
        borderTopLeftRadius: 'inherit',
        borderTopRightRadius: 'inherit',
        width: '100%',
        paddingLeft: 5,
        ...theme.texts.brandSubFont
      }}>
      Name:
    </Typography.Text>
    <Typography.Text
      style={{
        backgroundColor: theme.colors.whites.lighter,
        width: '100%',
        paddingLeft: 5,
        ...theme.texts.brandSubFont
      }}>
      {user.name}
    </Typography.Text>
    <Typography.Text
      style={{
        backgroundColor: theme.colors.grays.lighter,
        width: '100%',
        paddingLeft: 5,
        ...theme.texts.brandSubFont
      }}>
      Email:
    </Typography.Text>
    <Typography.Text
      style={{
        backgroundColor: theme.colors.whites.lighter,
        borderBottomLeftRadius: 'inherit',
        borderBottomRightRadius: 'inherit',
        width: '100%',
        paddingLeft: 5,
        ...theme.texts.brandSubFont
      }}>
      {user.email}
    </Typography.Text>
  </UserDataContainer>;
};