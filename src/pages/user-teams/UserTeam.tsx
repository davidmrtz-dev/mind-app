import { Typography } from "antd";
import styled from "styled-components";
import { IUserTeam } from "../../@types";
import { ActionButton } from "../../atoms/ActionButton";
import { theme } from "../../Theme";
import { TransactionContainer as UserTeamContainer } from "../../components/containers";
import { formatViewDate } from "../../utils";

const UserTeamGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 3fr;
  grid-template-rows: repeat(6, 1fr);
  padding: 10px;
`;

export const UserTeam = ({
  userTeam,
  onClick
}: {
  userTeam: IUserTeam;
  onClick: () => void;
}): JSX.Element => <UserTeamContainer>
  <div style={{ textAlign: 'initial' }}>
    <UserTeamGrid>
      <div style={{ gridArea: '1 / 1 / 2 / 2' }}>
        <Typography.Text style={{
          ...theme.texts.brandSubFont
        }}>
          <strong>User:</strong>
        </Typography.Text>
      </div>
      <div style={{ gridArea: '1 / 2 / 2 / 3', textAlign: 'center' }}>
        <Typography.Text style={{
          ...theme.texts.brandSubFont
        }}>
          {userTeam.user?.name}
        </Typography.Text>
      </div>
      <div style={{ gridArea: '2 / 1 / 3 / 2' }}>
        <Typography.Text style={{
          ...theme.texts.brandSubFont
        }}>
          <strong>Team:</strong>
        </Typography.Text>
      </div>
      <div style={{ gridArea: '2 / 2 / 3 / 3', textAlign: 'center' }}>
        <Typography.Text style={{
          ...theme.texts.brandSubFont
        }}>
          {userTeam.team?.name}
        </Typography.Text>
      </div>
      <div style={{ gridArea: '3 / 1 / 4 / 2' }}>
        <Typography.Text style={{
          ...theme.texts.brandSubFont
        }}>
          <strong>Start At:</strong>
        </Typography.Text>
      </div>
      <div style={{ gridArea: '3 / 2 / 4 / 3', textAlign: 'center' }}>
        <Typography.Text style={{
          ...theme.texts.brandSubFont
        }}>
          {formatViewDate(userTeam.start_at || '') || 'N/A'}
        </Typography.Text>
      </div>
      <div style={{ gridArea: '4 / 1 / 5 / 2' }}>
        <Typography.Text style={{
          ...theme.texts.brandSubFont
        }}>
          <strong>End Date:</strong>
        </Typography.Text>
      </div>
      <div style={{ gridArea: '4 / 2 / 5 / 3', textAlign: 'center' }}>
        <Typography.Text style={{
          ...theme.texts.brandSubFont
        }}>
          {formatViewDate(userTeam.end_at || '') || 'N/A'}
        </Typography.Text>
      </div>
      <div style={{ gridArea: '5 / 1 / 6 / 2' }}>
        <Typography.Text style={{
          ...theme.texts.brandSubFont
        }}>
          <strong>Status:</strong>
        </Typography.Text>
      </div>
      <div style={{ gridArea: '5 / 2 / 6 / 3', textAlign: 'center' }}>
        <Typography.Text style={{
          ...theme.texts.brandSubFont
        }}>
          {userTeam.status}
        </Typography.Text>
      </div>
      <div style={{ gridArea: '6 / 1 / 7 / 2' }}>
        <Typography.Text style={{
          ...theme.texts.brandSubFont
        }}>
          <strong>Email:</strong>
        </Typography.Text>
      </div>
      <div style={{ gridArea: '6 / 2 / 7 / 3', textAlign: 'center' }}>
        <Typography.Text style={{
          ...theme.texts.brandSubFont
        }}>
          {userTeam.user?.email}
        </Typography.Text>
      </div>
    </UserTeamGrid>
  </div>
  <ActionButton onClick={onClick} />
</UserTeamContainer>;