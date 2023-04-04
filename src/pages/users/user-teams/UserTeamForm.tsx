import { DatePicker, Form, Select, Typography } from "antd";
import { useState } from "react";
import styled from "styled-components";
import { ITeam, IUser, IUserTeam } from "../../../@types";
import AddTo from "../../../atoms/AddTo";
import { theme } from "../../../Theme";
import TeamSelection from "./TeamSelection";
import { Team } from "../../teams/Team";
import BrandFontText from "../../../atoms/BrandFontText";

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
  const [team, setTeam] = useState<ITeam | null>(null);

  const handleSelection = (team: ITeam) => {
    setTeam(team);
    setValues({ ...values, team_id: team.id });
  };

  return (
    <Form
      name='user-team-form'
      form={form}
      layout='vertical'
      initialValues={values}
      onValuesChange={e => setValues({...values, ...e})}
      style={{ width: '100%' }}
    >
      <Form.Item label={BrandFontText('User')}
        name='user'>
        <UserData {...user} />
      </Form.Item>
      <Form.Item name='select_team'>
        {AddTo(`${team ? 'Change' : 'Select'} Team`, () => setShowTeam(true))}
      </Form.Item>
      {team && (<Form.Item name='selected_team' label={BrandFontText('Selected team')}>
          <Team team={team} />
      </Form.Item>)}
      <Form.Item label={BrandFontText('Start Date')} name='start_at'>
        <DatePicker
          style={{ width: '100%' }}
        />
      </Form.Item>
      <Form.Item label={BrandFontText('End Date')} name='end_at'>
        <DatePicker
          style={{ width: '100%' }}
        />
      </Form.Item>
      <Form.Item label={BrandFontText('Status')} name='status'>
        <Select
          style={{ width: '100%' }}
          options={[
            { value: 'active', label: 'Active' },
            { value: 'inactive', label: 'Inactive' }
          ]}
        />
      </Form.Item>
      <TeamSelection
        setTeam={handleSelection}
        open={showTeam}
        closeModal={() => setShowTeam(false)}
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
