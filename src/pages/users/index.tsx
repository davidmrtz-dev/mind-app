import { useEffect, useState } from "react";
import styled from "styled-components";
import { IUser } from "../../@types";
import { getUsers } from "../../api/core/User";
import { LoadingMask } from "../../atoms/LoadingMask";
import Alert from "../../components/alert";
import Title from "../../components/title";
import { UserCreate, UserUpdate } from "../../components/users";
import { newUser } from "../../generators/emptyObjects";
import { User } from "./User";

const UsersContainer = styled.div<{ reveal: boolean }>`
  opacity: ${p => p.reveal ? 1 : 0};
  transition: opacity 1s ease-in-out;
  min-height: 100vh;
`;

const UsersPage = (): JSX.Element => {
  const [loading, setLoading] = useState(true);
  const [reveal, setReveal] = useState(false);
  const [users, setUsers] = useState<IUser []>([]);
  const [user, setUser] = useState<IUser>(newUser('standard'));
  const [showNew, setShowNew] = useState(false);
  const [showUpdate, setShowUpdate] = useState(false);

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

  const handleUserClick = (user: IUser) => {
    setUser(user);
    setShowUpdate(true);
  };

  const handleCreate = async (user: IUser) => {
    if (users.length) {
      setUsers(users => [user, ...users]);
    }
  };

  const handleUpdateClose = () => {
    setShowUpdate(false);
    setUser(newUser('standard'));
  };

  const handleUpdate = async (user: IUser) => {
    if (users.length) {
      const updatedUsers = users.map(usr => {
        if (usr.id === user.id) {
          return user;
        } else {
          return usr;
        }
      });
      setUsers(updatedUsers);
    }
  };

  const handleDelete = (id: number) => {
    if (users.length) {
      const updatedUsers = users.filter(usr => usr.id !== id);
      setUsers(updatedUsers);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  useEffect(() => {
    if (!loading) setTimeout(() => setReveal(true), 250);
  }, [loading]);

  return (
    <>
      {Title('Users', () => setShowNew(true))}
      {loading
      ? <LoadingMask fixed />
      : <UsersContainer reveal={reveal}>
          {(users || []).map(user =>
            <User
              key={user.id}
              user={user}
              onClick={() => handleUserClick(user)}
            />
          )}
        </UsersContainer>
    }
    <UserCreate
      open={showNew}
      closeModal={() => setShowNew(false)}
      handleCreate={handleCreate}
    />
    <UserUpdate
      user={user}
      open={showUpdate}
      closeModal={handleUpdateClose}
      handleUpdate={handleUpdate}
      handleDelete={handleDelete}
    />
    </>
  );
};

export default UsersPage;

