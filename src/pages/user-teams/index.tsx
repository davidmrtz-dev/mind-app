import { useEffect, useState } from "react";
import styled from "styled-components";
import { IUserTeam } from "../../@types";
import { getUserTeams } from "../../api/core/UserTeam";
import { LoadingMask } from "../../atoms/LoadingMask";
import Alert from "../../components/alert";
import Title from "../../components/title";
import { UserTeamCreate } from "../../components/user-teams";
import { newUserTeam } from "../../generators/emptyObjects";
import { UserTeam } from "./UserTeam";

const UserTeamsContainer = styled.div<{ reveal: boolean }>`
  opacity: ${p => p.reveal ? 1 : 0};
  transition: opacity 1s ease-in-out;
  min-height: 100vh;
`;

const UserTeamsPage = (): JSX.Element => {
  const [loading, setLoading] = useState(true);
  const [reveal, setReveal] = useState(false);
  const [userTeam, setUserTeam] = useState<IUserTeam>(newUserTeam());
  const [userTeams, setUserTeams] = useState<IUserTeam []>([]);
  const [showNew, setShowNew] = useState(false);
  const [showUpdate, setShowUpdate] = useState(false);

  const fetchUserTeams = async (): Promise<void> => {
    try {
      const data = await getUserTeams({ offset: 0, limit: 20 });
      setUserTeams(data.user_teams);
      setTimeout(() => setLoading(false), 1500);
    } catch (err: any) {
      setTimeout(() => Alert({
        icon: 'error',
        title: 'Ops!',
        text: err.error || 'There was an error, please try again later'
      }), 1000);
    }
  };

  const handleUserTeamClick = (userTeam: IUserTeam) => {
    setUserTeam(userTeam);
    setShowUpdate(true);
  };

  const handleCreate = async (userTeam: IUserTeam) => {
    if (userTeams.length) {
      setUserTeams(userTeams => [userTeam, ...userTeams]);
    }
  };

  useEffect(() => {
    fetchUserTeams();
  }, []);

  useEffect(() => {
    if (!loading) setTimeout(() => setReveal(true), 250);
  }, [loading]);

  return(<>
    {Title('User Teams', () => setShowNew(true))}
    {loading
    ? <LoadingMask fixed />
    : <UserTeamsContainer reveal={reveal}>
        {(userTeams || []).map(userTeam =>
          <UserTeam
            key={userTeam.id}
            userTeam={userTeam}
            onClick={() => handleUserTeamClick(userTeam)}
          />
        )}
      </UserTeamsContainer>
    }
    <UserTeamCreate
      open={showNew}
      closeModal={() => setShowNew(false) }
      handleCreate={handleCreate}
    />
  </>);
};

export default UserTeamsPage;