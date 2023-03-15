import { useEffect, useState } from "react";
import styled from "styled-components";
import { IUser } from "../../@types";
import { getUsers } from "../../api/core/User";
import { LoadingMask } from "../../atoms/LoadingMask";
import Alert from "../../components/alert";
import Title from "../../components/title";
import { useAuthContext } from "../../context/AuthContext";
import { User } from "./User";

const UsersContainer = styled.div<{ reveal: boolean }>`
  opacity: ${p => p.reveal ? 1 : 0};
  transition: opacity 1s ease-in-out;
  min-height: 100vh;
`;

const UsersPage = (): JSX.Element => {
  const auth = useAuthContext();
  const [loading, setLoading] = useState(true);
  const [reveal, setReveal] = useState(false);
  const [users, setUsers] = useState<IUser []>([]);
  // const [user, setUser] = useState<IOutcome>(newOutcome('current'));

  const fetchUsers = async (): Promise<void> => {
    try {
      const data = await getUsers({ offset: 0, limit: 20 });
      setUsers(data.users);
      setTimeout(() => setLoading(false), 1500);
    } catch (err: any) {
      setTimeout(() => Alert({
        icon: 'error',
        title: 'Ops!',
        text: err.error || 'There was an error, please try again later'
      }), 1000);
    }
  };

  // const handleUserClick = (outcome: IUser) => {
  //   setOutcome(outcome);
  //   setShowUpdate(true);
  // };

  useEffect(() => {
    fetchUsers();
  }, []);

  useEffect(() => {
    if (!loading) setTimeout(() => setReveal(true), 250);
  }, [loading]);

  return (
    <>
      {Title('Users', () => {})}
      {loading
      ? <LoadingMask fixed />
      : <UsersContainer reveal={reveal}>
          {(users || []).map(user =>
            // <User
            //   key={user.id}
            //   user={user}
            //   onClick={() => handleUserClick(user)}
            // />
            <p>okok</p>
          )}
        </UsersContainer>
    }
    </>
  );
};

export default UsersPage;

