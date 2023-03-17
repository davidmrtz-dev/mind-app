import { Typography } from "antd";
import { useEffect, useState } from "react";
import styled from "styled-components";
import { IUser } from "../../@types";
import { getUser } from "../../api/core/User";
import { LoadingMask } from "../../atoms/LoadingMask";
import Alert from "../../components/alert";
import Title from "../../components/title";
import { useAuthContext } from "../../context/AuthContext";
import { newUser } from "../../generators/emptyObjects";
import { theme } from "../../Theme";
import { capitalizeFirst } from "../../utils";
import { User } from "../users/User";

const UserContainer = styled.div<{ reveal: boolean }>`
  opacity: ${p => p.reveal ? 1 : 0};
  transition: opacity 1s ease-in-out;
  min-height: 100vh;
`;

const UserGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 2fr;
  grid-template-rows: repeat(6, 1fr);
  padding: 10px;
`;

const Profile = (): JSX.Element => {
  const auth = useAuthContext();
  const [loading, setLoading] = useState(true);
  const [reveal, setReveal] = useState(false);
  const [user, setUser] = useState<IUser>(newUser('standard'));

  const fetchUser = async (): Promise<void> => {
    try {
      const user = await getUser(auth.user?.id || 0);
      setUser(user);
      setTimeout(() => setLoading(false), 1500);
    } catch (err: any) {
      setTimeout(() => Alert({
        icon: 'error',
        title: 'Ops!',
        text: err.error || 'There was an error, please try again later'
      }), 1000);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  useEffect(() => {
    if (!loading) setTimeout(() => setReveal(true), 250);
  }, [loading]);

  return(<>
    {Title('My Profile')}
    {loading
    ? <LoadingMask fixed />
    : <UserContainer reveal={reveal}>
        {user && (<div style={{ textAlign: 'initial' }}>
        <UserGrid>
          <div style={{ gridArea: '1 / 1 / 2 / 2' }}>
            <Typography.Text style={{
              ...theme.texts.brandSubFont
            }}>
              <strong>Name:</strong>
            </Typography.Text>
          </div>
          <div style={{ gridArea: '1 / 2 / 2 / 3', textAlign: 'center' }}>
            <Typography.Text style={{
              ...theme.texts.brandSubFont
            }}>
              {user.name}
            </Typography.Text>
          </div>
          <div style={{ gridArea: '2 / 1 / 3 / 2' }}>
            <Typography.Text style={{
              ...theme.texts.brandSubFont
            }}>
              <strong>Email:</strong>
            </Typography.Text>
          </div>
          <div style={{ gridArea: '2 / 2 / 3 / 3', textAlign: 'center' }}>
            <Typography.Text style={{
              ...theme.texts.brandSubFont
            }}>
              {user.email}
            </Typography.Text>
          </div>
          <div style={{ gridArea: '3 / 1 / 4 / 2' }}>
            <Typography.Text style={{
              ...theme.texts.brandSubFont
            }}>
              <strong>User Type:</strong>
            </Typography.Text>
          </div>
          <div style={{ gridArea: '3 / 2 / 4 / 3', textAlign: 'center' }}>
            <Typography.Text style={{
              ...theme.texts.brandSubFont
            }}>
              {capitalizeFirst(user.user_type)}
            </Typography.Text>
          </div>
          <div style={{ gridArea: '4 / 1 / 5 / 2' }}>
            <Typography.Text style={{
              ...theme.texts.brandSubFont
            }}>
              <strong>English Level:</strong>
            </Typography.Text>
          </div>
          <div style={{ gridArea: '4 / 2 / 5 / 3', textAlign: 'center' }}>
            <Typography.Text style={{
              ...theme.texts.brandSubFont
            }}>
              {user.profile?.english_level || 'N/A'}
            </Typography.Text>
          </div>
          <div style={{ gridArea: '5 / 1 / 6 / 2' }}>
            <Typography.Text style={{
              ...theme.texts.brandSubFont
            }}>
              <strong>Skills:</strong>
            </Typography.Text>
          </div>
          <div style={{ gridArea: '5 / 2 / 6 / 3', textAlign: 'center' }}>
            <Typography.Text style={{
              ...theme.texts.brandSubFont
            }}>
              {user.profile?.technical_knowledge || 'N/A'}
            </Typography.Text>
          </div>
          <div style={{ gridArea: '6 / 1 / 7 / 2' }}>
            <Typography.Text style={{
              ...theme.texts.brandSubFont
            }}>
              <strong>CV:</strong>
            </Typography.Text>
          </div>
          <div style={{ gridArea: '6 / 2 / 7 / 3', textAlign: 'center' }}>
            <Typography.Text style={{
              ...theme.texts.brandSubFont
            }}>
              {user.profile?.cv || 'N/A'}
            </Typography.Text>
          </div>
        </UserGrid>
      </div>)}
      </UserContainer>
    }
  </>);
};

export default Profile;
