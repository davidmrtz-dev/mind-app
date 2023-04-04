import { faRemove } from "@fortawesome/free-solid-svg-icons";
import { Typography } from "antd";
import { ITeam } from "../../@types";
import { ActionButton } from "../../atoms/ActionButton";
import { theme } from "../../Theme";
import { capitalizeFirst } from "../../utils";
import styled from "styled-components";

const TeamContainer = styled.div<{
  selected: boolean;
  selectable: boolean;
}>`
  background-color: ${p => p.theme.colors.grays.light};
  border: ${p => p.selected ? `solid 2px ${p.theme.colors.blues.normal}` : 'none'};
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
  margin: ${p => p.selected ? '3' : '5'}px 0;
  padding: 5px 10px;
  cursor: ${p => p.selectable ? 'pointer' : 'default'};
  position: relative;
`;

const ItemWrapper = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
`;

export const Team = ({
  team,
  selected,
  onSelect,
  onClickUpdate,
  onClickDelete
}: {
  team: ITeam;
  selected?: boolean;
  onSelect?: () => void;
  onClickUpdate?: () => void;
  onClickDelete?: () => void;
}): JSX.Element => <TeamContainer
  onClick={onSelect}
  selectable={onSelect ? true : false}
  selected={selected || false}
>
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
      backgroundColor:
        team.user_team.status === 'active'
          ? theme.colors.succeed
          : theme.colors.warning,
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
  {onClickUpdate && (<ActionButton onClick={onClickUpdate} />)}
  {onClickDelete && (
    <ActionButton onClick={onClickDelete} icon={faRemove} />
  )}
</TeamContainer>;