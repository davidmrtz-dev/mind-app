import styled from "styled-components";
import { ITeam } from "../../../../@types";
import { theme } from "../../../../Theme";
import { BrandSubFontText } from "../../../../atoms/text";

const TeamDataContainer = styled.div`
  width: 100%;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
`;

export const TeamData = (team: ITeam): JSX.Element => {
  return<TeamDataContainer>
    {BrandSubFontText('Name', {
      backgroundColor: theme.colors.grays.light,
      borderTopLeftRadius: 'inherit',
      borderTopRightRadius: 'inherit',
      width: '100%',
      paddingLeft: 5
    })}
    {BrandSubFontText(team.name, {
      backgroundColor: theme.colors.whites.lighter,
      width: '100%',
      paddingLeft: 5
    })}
    {BrandSubFontText('Account', {
      backgroundColor: theme.colors.grays.light,
      width: '100%',
      paddingLeft: 5
    })}
    {BrandSubFontText(team.account?.name || '', {
      backgroundColor: theme.colors.whites.lighter,
      borderBottomLeftRadius: 'inherit',
      borderBottomRightRadius: 'inherit',
      width: '100%',
      paddingLeft: 5
    })}
    {BrandSubFontText('Manager', {
      backgroundColor: theme.colors.grays.light,
      width: '100%',
      paddingLeft: 5
    })}
    {BrandSubFontText(team.account?.manager_name || '', {
      backgroundColor: theme.colors.whites.lighter,
      borderBottomLeftRadius: 'inherit',
      borderBottomRightRadius: 'inherit',
      width: '100%',
      paddingLeft: 5
    })}
    {BrandSubFontText('Client', {
      backgroundColor: theme.colors.grays.light,
      width: '100%',
      paddingLeft: 5
    })}
    {BrandSubFontText(team.account?.client_name || '', {
      backgroundColor: theme.colors.whites.lighter,
      borderBottomLeftRadius: 'inherit',
      borderBottomRightRadius: 'inherit',
      width: '100%',
      paddingLeft: 5
    })}
  </TeamDataContainer>;
};