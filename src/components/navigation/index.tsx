import { Link, useHistory } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faTimes, faPeopleGroup } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';
import { Button, Drawer, Space, Typography } from 'antd';
import { theme } from '../../Theme';
import { useStyletron } from "styletron-react";
import { useAuthContext } from '../../context/AuthContext';
import Alert from '../alert';
import styled from 'styled-components';

const NavigationContainer = styled.div`
  width: 360px;
  height: 5em;
  background-color: ${props => props.theme.colors.whites.lighter};
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 30px;
  cursor: default;
`;

const Navigation = (): JSX.Element => {
  const auth = useAuthContext();
  const history = useHistory();
  const [css] = useStyletron();
  const [show, setShow] = useState(false);
  const [date] = useState(new Date());

  const menuBtnStyles = css({
    ...theme.texts.brandSubFont,
    backgroundColor: theme.colors.whites.lighter,
    borderColor: theme.colors.whites.lighter,
    textAlign: 'initial',
    color: theme.colors.blacks.normal,
    ':hover': {
      color: `${theme.colors.grays.darker} !important`,
      borderColor: `${theme.colors.grays.darker} !important`,
    }
  });

  const dateStyles = css({
    ...theme.texts.brandFont,
    color: theme.colors.blacks.normal
  });

  const handleLogout = async () => {
    try {
      await auth.unauthenticate();
      history.push('/login');
    } catch (err: any) {
      setTimeout(() => {
        const error = err.errors && err.errors.length && err.errors[0];
        Alert({
          icon: 'error',
          text: (error || 'There was an error, please try again later.'),
        });
      }, 1000);
    }
    setShow(false);
  }

  return (
    <NavigationContainer>
      <Typography className={dateStyles}>Today, {date.toLocaleDateString()}</Typography>
      {!show && (<FontAwesomeIcon
        color={theme.colors.blacks.normal}
        size='lg'
        style={{ cursor: 'pointer', zIndex: 1000 }}
        icon={faBars} onClick={() => setShow(true)}/>)
      }
      {show && (<FontAwesomeIcon
        color={theme.colors.blacks.normal}
        size='lg'
        style={{ cursor: 'pointer', zIndex: 1000 }}
        icon={faTimes} onClick={() => setShow(false)}/>)
      }
      <Drawer
        placement={'top'}
        onClose={() => setShow(false)}
        open={show}
        key={'top'}
        closable={false}
        style={{
          width: 360,
          height: 'auto',
          position: 'absolute',
          left: 0,
          right: 0,
          marginLeft: 'auto',
          marginRight: 'auto'
        }}
        bodyStyle={{
          display: 'flex',
          flexDirection: 'column',
          boxShadow: 'none !important',
          backgroundColor: `${theme.colors.whites.lighter}`,
          padding: 16
        }}
        contentWrapperStyle={{
          boxShadow: 'none'
        }}
      >
        {auth.isAuthenticated ?
          <Space direction="vertical">
            {auth.user?.user_type !== 'standard' ? <><Link to='/users'>
              <Button
                block
                onClick={() => setShow(false)}
                className={menuBtnStyles}
              >
                Users
              </Button>
            </Link>
            <Link to='/accounts'>
              <Button
                block
                onClick={() => setShow(false)}
                className={menuBtnStyles}
              >
                Accounts
              </Button>
            </Link>
            <Link to='/teams'>
              <Button
                block
                onClick={() => setShow(false)}
                className={menuBtnStyles}
              >
                Teams
              </Button>
            </Link></> : <Link to='/profile'>
              <Button
                block
                onClick={() => setShow(false)}
                className={menuBtnStyles}
              >
                Profile
              </Button>
            </Link>}
            <Link to='/about'>
              <Button
                block
                onClick={() => setShow(false)}
                className={menuBtnStyles}
              >
                About
              </Button>
            </Link>
            <Link to='/login'>
              <Button
                block
                onClick={handleLogout}
                className={menuBtnStyles}
              >
                Logout
              </Button>
            </Link>
            <FooterNav />
          </Space> :
          <Space direction="vertical">
            <Link to='/login'>
              <Button
                block
                onClick={() => setShow(false)}
                className={menuBtnStyles}
              >
                Login
              </Button>
            </Link>
            <Link to='/about'>
              <Button
                block
                onClick={() => setShow(false)}
                className={menuBtnStyles}
              >
                About
              </Button>
            </Link>
            <FooterNav />
          </Space>
        }
      </Drawer>
    </NavigationContainer>
  );
};

const FooterNav = () => <div style={{
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    cursor: 'default',
    paddingTop: 10
  }}>
    <FontAwesomeIcon
      color={theme.colors.blacks.normal}
      size='1x'
      icon={faPeopleGroup}
    />
    <Typography style={{
      ...theme.texts.brandFont,
      paddingLeft: 10,
      color: theme.colors.blacks.normal
    }}
    >
      Mind App
    </Typography>
</div>;

export default Navigation;