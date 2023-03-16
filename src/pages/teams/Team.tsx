import { Typography } from "antd";
import styled from "styled-components";
import { IAccount, ITeam } from "../../@types";
import { ActionButton } from "../../atoms/ActionButton";
import { theme } from "../../Theme";
import { TransactionContainer as TeamContainer } from "../../components/containers";
import { capitalizeFirst } from "../../utils";

const TeamGrid = styled.div`
  display: grid;
  grid-template-columns: 2fr 2fr;
  grid-template-rows: repeat(3, 1fr);
  padding: 10px;
`;

export const Team = ({
  team,
  onClick
}: {
  team: ITeam;
  onClick: () => void;
}): JSX.Element => <TeamContainer>
  <div style={{ textAlign: 'initial' }}>
    <TeamGrid>
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
          {capitalizeFirst(team.name)}
        </Typography.Text>
      </div>
      <div style={{ gridArea: '2 / 1 / 3 / 2' }}>
        <Typography.Text style={{
          ...theme.texts.brandSubFont
        }}>
          <strong>Account:</strong>
        </Typography.Text>
      </div>
      <div style={{ gridArea: '2 / 2 / 3 / 3', textAlign: 'center' }}>
        <Typography.Text style={{
          ...theme.texts.brandSubFont
        }}>
          {capitalizeFirst(team.account?.name || '')}
        </Typography.Text>
      </div>
      <div style={{ gridArea: '3 / 1 / 4 / 2' }}>
        <Typography.Text style={{
          ...theme.texts.brandSubFont
        }}>
          <strong>Client:</strong>
        </Typography.Text>
      </div>
      <div style={{ gridArea: '3 / 2 / 4 / 3', textAlign: 'center' }}>
        <Typography.Text style={{
          ...theme.texts.brandSubFont
        }}>
          {capitalizeFirst(team.account?.client_name || '')}
        </Typography.Text>
      </div>
    </TeamGrid>
  </div>
  <ActionButton onClick={onClick} />
</TeamContainer>;