import { Form, Input, Typography } from "antd";
import styled from "styled-components";
import { IAccount } from "../../../@types";
import { Team } from "../../../pages/teams/Team";
import { theme } from "../../../Theme";

const TeamsContainer = styled.div<{ reveal: boolean }>`
  opacity: ${p => p.reveal ? 1 : 0};
  transition: opacity 1s ease-in-out;
  display: flex;
  flex-direction: column;
`;

export const AccountForm = ({
  values,
  setValues
}: {
  values: IAccount;
  setValues: (values: IAccount) => void;
}): JSX.Element => {
  const [form] = Form.useForm();

  return (
    <Form
      name='account-form'
      form={form}
      layout='vertical'
      initialValues={values}
      onValuesChange={e => setValues({...values, ...e})}
      style={{ width: '100%' }}
    >
      <Form.Item label={<Typography.Text style={{ ...theme.texts.brandFont }}>
        Name
      </Typography.Text>}
        name='name'>
        <Input maxLength={20} style={{ ...theme.texts.brandSubFont }}/>
      </Form.Item>
      <Form.Item label={<Typography.Text style={{ ...theme.texts.brandFont }}>
        Client Name
      </Typography.Text>}
        name='client_name'>
        <Input maxLength={20} style={{ ...theme.texts.brandSubFont }}/>
      </Form.Item>
      <Form.Item label={<Typography.Text style={{ ...theme.texts.brandFont }}>
        Manager Name
      </Typography.Text>}
        name='manager_name'>
        <Input maxLength={20} style={{ ...theme.texts.brandSubFont }}/>
      </Form.Item>
      {values.teams.length > 0 && (<Form.Item label={<Typography.Text style={{ ...theme.texts.brandFont }}>
        Teams
      </Typography.Text>}
        name='manager_name'>
          <TeamsContainer reveal={true}>
            {values.teams.map(t => <Team key={t.id} team={t} />)}
          </TeamsContainer>
      </Form.Item>)}
    </Form>
  );
};