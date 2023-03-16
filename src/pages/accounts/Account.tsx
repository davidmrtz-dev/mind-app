import { Typography } from "antd";
import styled from "styled-components";
import { IAccount } from "../../@types";
import { ActionButton } from "../../atoms/ActionButton";
import { theme } from "../../Theme";
import { TransactionContainer as AccountContainer } from "../../components/containers";
import { capitalizeFirst } from "../../utils";

const AccountGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 2fr;
  grid-template-rows: repeat(3, 1fr);
  padding: 10px;
`;

export const Account = ({
  account,
  onClick
}: {
  account: IAccount;
  onClick: () => void;
}): JSX.Element => <AccountContainer>
  <div style={{ textAlign: 'initial' }}>
    <AccountGrid>
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
          {capitalizeFirst(account.name)}
        </Typography.Text>
      </div>
      <div style={{ gridArea: '2 / 1 / 3 / 2' }}>
        <Typography.Text style={{
          ...theme.texts.brandSubFont
        }}>
          <strong>Client:</strong>
        </Typography.Text>
      </div>
      <div style={{ gridArea: '2 / 2 / 3 / 3', textAlign: 'center' }}>
        <Typography.Text style={{
          ...theme.texts.brandSubFont
        }}>
          {capitalizeFirst(account.client_name)}
        </Typography.Text>
      </div>
      <div style={{ gridArea: '3 / 1 / 4 / 2' }}>
        <Typography.Text style={{
          ...theme.texts.brandSubFont
        }}>
          <strong>Manager:</strong>
        </Typography.Text>
      </div>
      <div style={{ gridArea: '3 / 2 / 4 / 3', textAlign: 'center' }}>
        <Typography.Text style={{
          ...theme.texts.brandSubFont
        }}>
          {capitalizeFirst(account.manager_name)}
        </Typography.Text>
      </div>
    </AccountGrid>
  </div>
  <ActionButton onClick={onClick} />
</AccountContainer>;