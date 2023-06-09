import { Button, Typography } from "antd";
import styled from "styled-components"
import { theme } from "../Theme";

const AddToWrapper = styled.div`
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

const AddTo = (text: string, setOpen?: () => void): JSX.Element => <AddToWrapper>
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
</AddToWrapper>;

export default AddTo;
