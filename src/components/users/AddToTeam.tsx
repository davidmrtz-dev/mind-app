import { Button, Typography } from "antd";
import styled from "styled-components"
import { theme } from "../../Theme";

const AddToTeamWrapper = styled.div`
  background-color: ${p => p.theme.colors.grays.light};
  width: 100%;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 10px;
  border-radius: 10px;
  margin-bottom: 10px;
`;

const AddToTeam = (text: string, setOpen?: () => void): JSX.Element => <AddToTeamWrapper>
  <Typography.Text style={{
    ...theme.texts.brandFont,
    paddingLeft: 5
  }}>
    {text}
  </Typography.Text>
  {setOpen && (<Button
    style={{
      ...theme.texts.brandSubFont,
      width: 46
    }}
    onClick={() => setOpen()}
    >
      +
    </Button>)}
</AddToTeamWrapper>;

export default AddToTeam;
