import { Form, Input, Select, Typography } from "antd";
import Password from "antd/es/input/Password";
import TextArea from "antd/es/input/TextArea";
import { useEffect, useState } from "react";
import { ITeam, IUser } from "../../@types";
import { getTeamsByUser } from "../../api/core/Team";
import { deleteUserTeam } from "../../api/core/UserTeam";
import { LoadingMask } from "../../atoms/LoadingMask";
import { newTeam } from "../../generators/emptyObjects";
import { Team } from "../../pages/teams/Team";
import { theme } from "../../Theme";
import Alert from "../alert";
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
  const [loading, setLoading] = useState(true);
  const [reveal, setReveal] = useState(false);
  const [teams, setTeams] = useState<ITeam []>([]);
  const [destroy, setDestroy] = useState(false);
  const [team, setTeam] = useState<ITeam>(newTeam());

  const fetchTeams = async (): Promise<void> => {
    try {
      const data = await getTeamsByUser({ offset: 0, limit: 5, userId: values.id })
      setTeams(data.teams);
      setTimeout(() => setLoading(false), 1500);
    } catch (err: any) {
      setTimeout(() => Alert({
        icon: 'error',
        title: 'Ops!',
        text: err.error || 'There was an error, please try again later'
      }), 1000);
    }
  };

  const handleDestroyTeamClick = (team: ITeam) => {
    setDestroy(true);
    setTeam(team);
  }

  const handleDelete = (id: number) => {
    if (teams.length) {
      const udpatedTeams = teams.filter(team => team.id !== id);
      setTeams(udpatedTeams);
    }
  }

  const handleSubmitDelete = async () => {
    if (!team?.user_team) return;

    try {
      await deleteUserTeam(team.user_team?.id);
      setTimeout(async () => {
        handleDelete(team.id);
        setTeam(newTeam());
        setDestroy(false);
      }, 1000);
    } catch (err: any) {
      setTimeout(() => {
        const error = err?.errors?.[0] || '';
        Alert({
          icon: 'error',
          text:(error || 'There was an error, please try again later.')
        });
        setTeam(newTeam());
        setDestroy(false);
      }, 1000);
    }
  };

  useEffect(() => {
    fetchTeams();
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (!loading) setTimeout(() => setReveal(true), 250);
  }, [loading]);

  if (destroy) Alert({
    icon: 'warning',
    text: 'Are you sure you want to remove this user from this team?',
    showCancelButton: true
  }).then(result => {
    setDestroy(false);
    if (result.isConfirmed) {
      handleSubmitDelete();
    }
  });

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
      <Form.Item label={<Typography.Text style={{ ...theme.texts.brandFont }}>
        Teams History
      </Typography.Text>}
        name='manager_name' style={{ minHeight: 560 }}>
          {loading
          ? <div style={{ width: '100%', height: 540, display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
              <LoadingMask />
            </div>
          : <TeamsContainer reveal={reveal}>
            {(teams || []).map(team =>
              <Team
                key={team.id}
                team={team}
                onClickDelete={() => handleDestroyTeamClick(team)} />
            )}
          </TeamsContainer>
          }
      </Form.Item>
    </Form>
  );
};