import { Typography } from "antd";
import { ITeam } from "../../@types";
import { ActionButton } from "../../atoms/ActionButton";
import { ItemWrapper, TeamContainer } from "../../components/containers";
import { theme } from "../../Theme";
import { capitalizeFirst } from "../../utils";

export const Team = ({
  team,
  onClick
}: {
  team: ITeam;
  onClick?: () => void;
}): JSX.Element => <TeamContainer>
  <ItemWrapper>
    <Typography.Text style={{
      ...theme.texts.brandSubFont,
      width: '30%'
    }}>
      <strong>Name:</strong>
    </Typography.Text>
    <Typography.Text style={{
      ...theme.texts.brandSubFont
    }}>
      {capitalizeFirst(team.name)}
    </Typography.Text>
  </ItemWrapper>
  {team.user_team?.start_at &&(<ItemWrapper>
    <Typography.Text style={{
      ...theme.texts.brandSubFont,
      width: '30%'
    }}>
      <strong>Start At:</strong>
    </Typography.Text>
    <Typography.Text style={{
      ...theme.texts.brandSubFont
    }}>
      {team.user_team.start_at as string}
    </Typography.Text>
  </ItemWrapper>)}
  {team.user_team?.end_at &&(<ItemWrapper>
    <Typography.Text style={{
      ...theme.texts.brandSubFont,
      width: '30%'
    }}>
      <strong>End At:</strong>
    </Typography.Text>
    <Typography.Text style={{
      ...theme.texts.brandSubFont
    }}>
      {team.user_team.end_at as string}
    </Typography.Text>
  </ItemWrapper>)}
  {team.user_team?.status &&(<ItemWrapper>
    <Typography.Text style={{
      ...theme.texts.brandSubFont,
      width: '30%'
    }}>
      <strong>Status:</strong>
    </Typography.Text>
    <Typography.Text style={{
      ...theme.texts.brandSubFont,
      backgroundColor: team.user_team.status === 'active' ? 'green' : 'red',
      borderRadius: 5,
      padding: '0 5px'
    }}>
      {capitalizeFirst(team.user_team.status)}
    </Typography.Text>
  </ItemWrapper>)}
  {team.account?.name && (<ItemWrapper>
    <Typography.Text style={{
      ...theme.texts.brandSubFont,
      width: '30%'
    }}>
      <strong>Account:</strong>
    </Typography.Text>
    <Typography.Text style={{
      ...theme.texts.brandSubFont
    }}>
      {capitalizeFirst(team.account.name)}
    </Typography.Text>
  </ItemWrapper>)}
  {team.account?.client_name && (<ItemWrapper>
    <Typography.Text style={{
      ...theme.texts.brandSubFont,
      width: '30%'
    }}>
      <strong>Client:</strong>
    </Typography.Text>
    <Typography.Text style={{
      ...theme.texts.brandSubFont
    }}>
      {capitalizeFirst(team.account.client_name)}
    </Typography.Text>
  </ItemWrapper>)}
  {onClick && (<ActionButton onClick={onClick} />)}
</TeamContainer>;