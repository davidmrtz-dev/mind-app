import { Button, Modal } from "antd";
import { useEffect, useState } from "react";
import styled from "styled-components";
import { ITeam } from "../../../@types";
import { getTeamsByUser } from "../../../api/core/Team";
import { LoadingMask } from "../../../atoms/LoadingMask";
import Alert from "../../../components/alert";
import { theme } from "../../../Theme";
import { Team } from "../../teams/Team";
import { BrandFontText } from "../../../atoms/text";

const TeamsContainer = styled.div<{ reveal: boolean }>`
  opacity: ${p => p.reveal ? 1 : 0};
  transition: opacity 1s ease-in-out;
  display: flex;
  flex-direction: column;
`;

type ITeamSelect = ITeam & { selected?: boolean };

const TeamSelection = ({
  open,
  userId,
  handleSelect
}: {
  open: boolean;
  userId: number;
  handleSelect: (team: ITeam) => void;
}): JSX.Element => {
  const [teams, setTeams] = useState<ITeamSelect []>([]);
  const [loading, setLoading] = useState(true);
  const [reveal, setReveal] = useState(false);

  const markSelection = (teamId: number) => {
    if (teams.length) {
      const updatedTeams = teams.map(team => {
        if (team.id === teamId) {
          return {...team, selected: true};
        } else {
          return {...team, selected: false};
        }
      });
      setTeams(updatedTeams);
    }
  };

  const onSelect = () => {
    const team = teams.find(team => team.selected);
    if (team) {
      handleSelect(team);
    }
  };

  const disabled = teams.every(team => !team.selected);

  useEffect(() => {
    const fetchTeams = async (): Promise<void> => {
      try {
        const data = await getTeamsByUser({
          offset: 0,
          limit: 10,
          userId: userId,
          excludeUser: true
        });
        setTeams(data.teams);
        setTimeout(() => setLoading(false), 1500);
      } catch (err: any) {
        setTimeout(() => Alert({
          icon: 'error',
          title: 'Ops!',
          text: err.error || 'There was an error, please try again later'
        }), 1000);
      }
    };

    fetchTeams();
  }, [userId]);

  useEffect(() => {
    if (!loading) setTimeout(() => setReveal(true), 250);
  }, [loading]);

  const footerComponents = [
    <Button
      key="submit"
      type="primary"
      loading={loading}
      disabled={disabled}
      onClick={onSelect}
      style={{
        backgroundColor:
          disabled ? theme.colors.grays.normal : theme.colors.blues.normal
      }}
    >
      {BrandFontText('Select', {
        color: theme.colors.whites.normal
      })}
    </Button>
  ];

  return (
    <Modal
      destroyOnClose
      maskClosable={false}
      closable={false}
      open={open}
      title={BrandFontText('Select a Team')}
      style={{
        maxWidth: 360,
        position: 'relative'
      }}
      footer={footerComponents}
    >
      {loading
      ? <div style={{ width: '100%', height: 120, display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
          <LoadingMask />
        </div>
      : <TeamsContainer reveal={reveal}>
        {(teams || []).map(team =>
          <Team
            onSelect={() => markSelection(team.id)}
            selected={team.selected}
            key={team.id}
            team={team}
          />
        )}
      </TeamsContainer>
      }
    </Modal>
  );
};

export default TeamSelection;