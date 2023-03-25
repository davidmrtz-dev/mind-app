import { Form, Input, Select, Typography } from "antd";
import Password from "antd/es/input/Password";
import TextArea from "antd/es/input/TextArea";
import { IUser } from "../../@types";
import { Team } from "../../pages/teams/Team";
import { theme } from "../../Theme";
import { TeamsContainer } from "../containers";

export const UserForm = ({
  values,
  setValues,
  showPassword
}: {
  values: IUser;
  setValues: (values: IUser) => void;
  showPassword: boolean;
}): JSX.Element => {
  const [form] = Form.useForm();

  return (
    <Form
      name='user-form'
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
        Email
      </Typography.Text>}
        name='email'>
        <Input maxLength={40} style={{ ...theme.texts.brandSubFont }}/>
      </Form.Item>
      {showPassword && (<Form.Item label={<Typography.Text style={{ ...theme.texts.brandFont }}>
        Password
      </Typography.Text>}
        name='password'>
        <Password maxLength={20} style={{ ...theme.texts.brandSubFont }}/>
      </Form.Item>)}
      <Form.Item label={<Typography.Text style={{ ...theme.texts.brandFont }}>
        User Type
      </Typography.Text>} name='user_type'>
        <Select
          style={{ width: '100%' }}
          options={[
            { value: 'standard', label: 'standard' },
            { value: 'admin', label: 'admin' }
          ]}
        />
      </Form.Item>
      <Form.Item label={<Typography.Text style={{ ...theme.texts.brandFont }}>
        English Level
      </Typography.Text>} name='english_level'>
        <Select
          style={{ width: '100%' }}
          options={[
            { value: 'a1', label: 'A1' },
            { value: 'a2', label: 'A2' },
            { value: 'b1', label: 'B1' },
            { value: 'b2', label: 'B2' },
            { value: 'c1', label: 'C1' },
            { value: 'c2', label: 'C2' },
          ]}
        />
      </Form.Item>
      <Form.Item label={<Typography.Text style={{ ...theme.texts.brandFont }}>
        Skills
      </Typography.Text>}
        name='technical_knowledge'>
        <TextArea
          allowClear
          showCount
          style={{
            ...theme.texts.brandSubFont,
            resize: 'none'
          }}
        />
      </Form.Item>
      <Form.Item label={<Typography.Text style={{ ...theme.texts.brandFont }}>
        CV
      </Typography.Text>}
        name='cv'>
        <Input maxLength={20} style={{ ...theme.texts.brandSubFont }}/>
      </Form.Item>
      {values.teams && values.teams.length > 0 && (<Form.Item label={<Typography.Text style={{ ...theme.texts.brandFont }}>
        Teams History
      </Typography.Text>}
        name='manager_name'>
          <TeamsContainer>
            {values.teams.map(t => <Team key={t.id} team={t} />)}
          </TeamsContainer>
      </Form.Item>)}
    </Form>
  );
};