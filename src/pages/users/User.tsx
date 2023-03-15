import { Typography } from "antd";
import dayjs from "dayjs";
import styled from "styled-components";
import { IUser } from "../../@types";
import { ActionButton } from "../../atoms/ActionButton";
import { theme } from "../../Theme";
import { formatCurrency, formatViewDate, capitalizeFirst } from "../../utils";
import { TransactionContainer as UserContainer } from "../../components/containers";

const UserGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 2fr;
  grid-template-rows: repeat(6, 1fr);
  padding: 10px;
`;

export const User = ({
  user,
  onClick
}: {
  user: IUser;
  onClick: () => void;
}): JSX.Element => <UserContainer>
  <div style={{ textAlign: 'initial' }}>
    <UserGrid>
      <div style={{ gridArea: '1 / 1 / 2 / 2' }}>
        <Typography.Text style={{
          ...theme.texts.brandSubFont
        }}>
          <strong>Name:</strong>
        </Typography.Text>
      </div>
      <div style={{ gridArea: '1 / 2 / 2 / 3', textAlign: 'center' }}>
        <Typography.Text style={{
          ...theme.texts.brandSubFont
        }}>
          {user.name}
        </Typography.Text>
      </div>
      <div style={{ gridArea: '2 / 1 / 3 / 2' }}>
        <Typography.Text style={{
          ...theme.texts.brandSubFont
        }}>
          <strong>Nick name:</strong>
        </Typography.Text>
      </div>
      <div style={{ gridArea: '2 / 2 / 3 / 3', textAlign: 'center' }}>
        <Typography.Text style={{
          ...theme.texts.brandSubFont
        }}>
          {user.nickname}
        </Typography.Text>
      </div>
      <div style={{ gridArea: '3 / 1 / 4 / 2' }}>
        <Typography.Text style={{
          ...theme.texts.brandSubFont
        }}>
          <strong>Email:</strong>
        </Typography.Text>
      </div>
      <div style={{ gridArea: '3 / 2 / 4 / 3', textAlign: 'center' }}>
        <Typography.Text style={{
          ...theme.texts.brandSubFont
        }}>
          {user.email}
        </Typography.Text>
      </div>
      <div style={{ gridArea: '4 / 1 / 5 / 2' }}>
        <Typography.Text style={{
          ...theme.texts.brandSubFont
        }}>
          <strong>User Type:</strong>
        </Typography.Text>
      </div>
      <div style={{ gridArea: '4 / 2 / 5 / 3', textAlign: 'center' }}>
        <Typography.Text style={{
          ...theme.texts.brandSubFont
        }}>
          {user.user_type}
        </Typography.Text>
      </div>
      <div style={{ gridArea: '5 / 1 / 6 / 2' }}>
        <Typography.Text style={{
          ...theme.texts.brandSubFont
        }}>
          <strong>Type:</strong>
        </Typography.Text>
      </div>
      <div style={{ gridArea: '5 / 2 / 6 / 3', textAlign: 'center' }}>
        <Typography.Text style={{
          ...theme.texts.brandSubFont
        }}>
          {'okok'}
        </Typography.Text>
      </div>
      <div style={{ gridArea: '6 / 1 / 7 / 2' }}>
        <Typography.Text style={{
          ...theme.texts.brandSubFont
        }}>
          <strong>Status:</strong>
        </Typography.Text>
      </div>
      <div style={{ gridArea: '6 / 2 / 7 / 3', textAlign: 'center' }}>
        <Typography.Text style={{
          ...theme.texts.brandSubFont
        }}>
          Active
        </Typography.Text>
      </div>
    </UserGrid>
  </div>
  <ActionButton onClick={onClick} />
</UserContainer>;

