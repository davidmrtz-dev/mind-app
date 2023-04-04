import { Button, Modal, Typography } from "antd";
import { useEffect, useState } from "react";
import styled from "styled-components";
import { ITeam } from "../../../@types";
import { getTeamsByUser } from "../../../api/core/Team";
import { LoadingMask } from "../../../atoms/LoadingMask";
import Alert from "../../../components/alert";
import { theme } from "../../../Theme";
import { Team } from "../../teams/Team";

const TeamsContainer = styled.div<{ reveal: boolean }>`
  opacity: ${p => p.reveal ? 1 : 0};
  transition: opacity 1s ease-in-out;
  display: flex;
  flex-direction: column;
`;

type ITeamSelect = ITeam & { selected?: boolean };

const TeamSelection = ({
  open,
  closeModal,
  userId,
  setTeam
}: {
  open: boolean;
  closeModal: () => void;
  userId: number;
  setTeam: (teamId: number) => void;
}): JSX.Element => {
  const [teams, setTeams] = useState<ITeamSelect []>([]);
  const [loading, setLoading] = useState(true);
  const [reveal, setReveal] = useState(false);

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

  const handleSelect = (teamId: number) => {
    if (teams.length) {
      const updatedTeams = teams.map(team => {
        if (team.id === teamId) {
          return {...team, selected: !team.selected};
        } else {
          return {...team, selected: false};
        }
      });
      setTeams(updatedTeams);
    }
  };

  const handleCancel = () => {
    setTeams(teams.map(team => ({...team, selected: false})));
    closeModal();
  };

  const handleSubmit = () => {
    const selected = teams.find(team => team.selected);
    if (selected) {
      setTeam(selected.id);
      closeModal();
    }
  };

  const disabled = teams.every(team => !team.selected);

  useEffect(() => {
    fetchTeams();
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (!loading) setTimeout(() => setReveal(true), 250);
  }, [loading]);

  const footerComponents = [
    <Button
      key="cancel"
      onClick={handleCancel}
      disabled={loading}
    >
      <Typography.Text style={{ ...theme.texts.brandFont }}>
        Cancel
      </Typography.Text>
    </Button>,
    <Button
      key="submit"
      type="primary"
      loading={loading}
      disabled={disabled}
      onClick={handleSubmit}
      style={{
        backgroundColor:
          disabled ? theme.colors.grays.normal : theme.colors.blues.normal
      }}
    >
      <Typography.Text style={{
        ...theme.texts.brandFont,
        color: theme.colors.whites.normal
      }}
      >
        Select
      </Typography.Text>
    </Button>
  ];

  return (
    <Modal
      destroyOnClose
      maskClosable={false}
      closable={false}
      open={open}
      title={<Typography.Text
        style={{...theme.texts.brandFont }}
        > Select a Team
        </Typography.Text>}
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
            onSelect={() => handleSelect(team.id)}
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