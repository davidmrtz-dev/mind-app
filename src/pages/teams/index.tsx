import { useEffect, useState } from "react";
import styled from "styled-components";
import { ITeam } from "../../@types";
import { getTeams } from "../../api/core/Team";
import { LoadingMask } from "../../atoms/LoadingMask";
import Alert from "../../components/alert";
import { TeamCreate } from "../../components/teams";
import Title from "../../components/title";
import { newTeam } from "../../generators/emptyObjects";
import { Team } from "./Team";

const TeamsContainer = styled.div<{ reveal: boolean }>`
  opacity: ${p => p.reveal ? 1 : 0};
  transition: opacity 1s ease-in-out;
  min-height: 100vh;
`;

const TeamsPage = (): JSX.Element => {
  const [loading, setLoading] = useState(true);
  const [reveal, setReveal] = useState(false);
  const [team, setTeam] = useState<ITeam>(newTeam());
  const [teams, setTeams] = useState<ITeam []>([]);
  const [showNew, setShowNew] = useState(false);
  const [showUpdate, setShowUpdate] = useState(false);

  const fetchTeams = async (): Promise<void> => {
    try {
      const data = await getTeams({ offset: 0, limit: 20 });
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

  const handleTeamClick = (team: ITeam) => {
    setTeam(team);
    setShowUpdate(true);
  };

  const handleCreate = async (team: ITeam) => {
    if (teams.length) {
      setTeams(teams => [team, ...teams]);
    }
  };

  useEffect(() => {
    fetchTeams();
  }, []);

  useEffect(() => {
    if (!loading) setTimeout(() => setReveal(true), 250);
  }, [loading]);

  return(<>
    {Title('Teams', () => setShowNew(true))}
    {loading
    ? <LoadingMask fixed />
    : <TeamsContainer reveal={reveal}>
        {(teams || []).map(team =>
          <Team
            key={team.id}
            team={team}
            onClick={() => handleTeamClick(team)}
          />
        )}
      </TeamsContainer>
    }
    <TeamCreate
      open={showNew}
      closeModal={() => setShowNew(false) }
      handleCreate={handleCreate}
    />
  </>);
};

export default TeamsPage;