import { DatePicker, Form, InputNumber, Select, Typography } from "antd";
import styled from "styled-components";
import { IUser, IUserTeam } from "../../../@types";
import { theme } from "../../../Theme";

export const UserTeamForm = ({
  values,
  setValues,
  user
}: {
  values: IUserTeam;
  setValues: (values: IUserTeam) => void;
  user: IUser;
}): JSX.Element => {
  const [form] = Form.useForm();

  return (
    <Form
      name='user-team-form'
      form={form}
      layout='vertical'
      initialValues={values}
      onValuesChange={e => setValues({...values, ...e})}
      style={{ width: '100%' }}
    >
      <Form.Item label={<Typography.Text style={{ ...theme.texts.brandFont }}>
        User
      </Typography.Text>}
        name='user'>
        <UserData {...user} />
      </Form.Item>
      <Form.Item label={<Typography.Text style={{ ...theme.texts.brandFont }}>
        Select Team
      </Typography.Text>}
        name='select_team'>
        <InputNumber
          min={1}
          style={{ width: '100%', ...theme.texts.brandFont }}
        />
      </Form.Item>
      <Form.Item label={<Typography.Text style={{ ...theme.texts.brandFont }}>
        Start Date
      </Typography.Text>} name='start_at'>
        <DatePicker
          style={{ width: '100%' }}
        />
      </Form.Item>
      <Form.Item label={<Typography.Text style={{ ...theme.texts.brandFont }}>
        End Date
      </Typography.Text>} name='end_at'>
        <DatePicker
          style={{ width: '100%' }}
        />
      </Form.Item>
      <Form.Item label={<Typography.Text style={{ ...theme.texts.brandFont }}>
        Status
      </Typography.Text>} name='status'>
        <Select
          style={{ width: '100%' }}
          options={[
            { value: 'active', label: 'Active' },
            { value: 'inactive', label: 'Inactive' }
          ]}
        />
      </Form.Item>
    </Form>
  );
};

const UserDataContainer = styled.div`
  width: 100%;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
`;

const UserData = (user: IUser): JSX.Element => {
  return<UserDataContainer>
    <Typography.Text
      style={{
        backgroundColor: theme.colors.grays.lighter,
        borderTopLeftRadius: 'inherit',
        borderTopRightRadius: 'inherit',
        width: '100%',
        paddingLeft: 5,
        ...theme.texts.brandSubFont
      }}>
      Name:
    </Typography.Text>
    <Typography.Text
      style={{
        backgroundColor: theme.colors.whites.lighter,
        width: '100%',
        paddingLeft: 5,
        ...theme.texts.brandSubFont
      }}>
      {user.name}
    </Typography.Text>
    <Typography.Text
      style={{
        backgroundColor: theme.colors.grays.lighter,
        width: '100%',
        paddingLeft: 5,
        ...theme.texts.brandSubFont
      }}>
      Email:
    </Typography.Text>
    <Typography.Text
      style={{
        backgroundColor: theme.colors.whites.lighter,
        borderBottomLeftRadius: 'inherit',
        borderBottomRightRadius: 'inherit',
        width: '100%',
        paddingLeft: 5,
        ...theme.texts.brandSubFont
      }}>
      {user.email}
    </Typography.Text>
  </UserDataContainer>;
};