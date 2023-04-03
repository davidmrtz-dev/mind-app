import { Modal, Typography } from "antd";
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
  onCancel,
  userId
}: {
  open: boolean;
  onCancel: () => void;
  userId: number;
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

  const handleSelect = () => {};

  useEffect(() => {
    fetchTeams();
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (!loading) setTimeout(() => setReveal(true), 250);
  }, [loading]);

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
      // footer={footerComponents}
      onCancel={onCancel}
    >
      {loading
      ? <div style={{ width: '100%', height: 120, display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
          <LoadingMask />
        </div>
      : <TeamsContainer reveal={reveal}>
        {(teams || []).map(team =>
          <Team
            onSelect={handleSelect}
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