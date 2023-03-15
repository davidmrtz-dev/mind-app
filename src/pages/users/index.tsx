import { Typography } from "antd";
import { useAuthContext } from "../../context/AuthContext";
import { theme } from "../../Theme";

const UsersPage = (): JSX.Element => {
  const auth = useAuthContext();

  return (
    <>
      <Typography style={{
        ...theme.texts.brandH5
      }}>
        Hi, {auth.user?.name}
      </Typography>
      <br />
    </>
  );
};

export default UsersPage;

