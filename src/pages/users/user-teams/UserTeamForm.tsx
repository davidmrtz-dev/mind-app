import { DatePicker, Form, Select, Typography } from "antd";
import { useState } from "react";
import styled from "styled-components";
import { IUser, IUserTeam } from "../../../@types";
import AddTo from "../../../atoms/AddTo";
import { theme } from "../../../Theme";
import TeamSelection from "./TeamSelection";

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
  const [showTeam, setShowTeam] = useState(false);

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
      <Form.Item name='select_team'>
        {AddTo('Select Team', () => setShowTeam(true))}
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
      <TeamSelection
        setTeam={(teamId) => {
          setValues({...values, team_id: teamId, user_id: user.id});
        }}
        open={showTeam}
        onCancel={() => setShowTeam(false)}
        userId={user.id}
      />
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
