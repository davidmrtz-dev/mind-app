import { Form, Input, Select } from "antd";
import Password from "antd/es/input/Password";
import TextArea from "antd/es/input/TextArea";
import { useCallback, useEffect, useState } from "react";
import styled from "styled-components";
import { FilterValues, ITeam, IUser } from "../../../@types";
import { getTeamsByUser, searchTeamsByUser } from "../../../api/core/Team";
import { LoadingMask } from "../../../atoms/LoadingMask";
import { newTeam } from "../../../generators/emptyObjects";
import { Team } from "../../../pages/teams/Team";
import { Search, UserTeamCreate, UserTeamUpdate } from "./user-teams";
import { theme } from "../../../Theme";
import Alert from "../../alert";
import AddTo from "../../../atoms/AddTo";
import { BrandFontText } from "../../../atoms/text";
import { useDebouncedState } from "../../../hooks/useDebouncedState";
import { NotFoundResults } from "../../../atoms/NotFoundResults";

const TeamsContainer = styled.div<{ reveal: boolean }>`
  opacity: ${p => p.reveal ? 1 : 0};
  transition: opacity 1s ease-in-out;
  display: flex;
  flex-direction: column;
`;

export const UserDetailsForm = ({
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
  const [addTo, setAddTo] = useState(false);
  const [team, setTeam] = useState<ITeam>(newTeam());
  const [update, setUpdate] = useState(false);
  const [searchTerm, setSearchTerm] = useDebouncedState<string>('', 100);
  const [filterValues, setFilterValues] = useState<FilterValues>();

  const displayUserTeams = () => {
    if (filterValues?.status) {
      return teams.filter(i => i.user_team?.status === filterValues.status);
    } else {
      return teams;
    }
  };

  const search = useCallback(async (keyword: string, dates: string []): Promise<void> => {
    try {
      setLoading(true);
      const data = await searchTeamsByUser({
        userId: values.id,
        keyword,
        start_at: dates[0],
        end_at: dates[1],
        offset: 0
      });
      setTeams(data.teams);
      setTimeout(() => setLoading(false), 1500);
    } catch(err: any) {
      const error = err?.errors?.[0] || err?.error || '';
      setTimeout(() => Alert({
        icon: 'error',
        title: 'Ops!',
        text: error || 'There was an error, please try again later'
      }), 1000);
    }
  }, [values]);

  const fetchTeams = useCallback(async (): Promise<void> => {
    try {
      const data = await getTeamsByUser({
        offset: 0,
        limit: 10,
        userId: values.id
      })
      setTeams(data.teams);
      setTimeout(() => setLoading(false), 1500);
    } catch (err: any) {
      setTimeout(() => Alert({
        icon: 'error',
        title: 'Ops!',
        text: err.error || 'There was an error, please try again later'
      }), 1000);
    }
  }, [values]);

  const refreshTeams = async (): Promise<void> => {
    setReveal(false);
    setLoading(true);
    fetchTeams();
  };

  const handleTeamClick = (team: ITeam) => {
    setTeam(team);
    setUpdate(true);
  };

  useEffect(() => {
    fetchTeams();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!loading) setTimeout(() => setReveal(true), 250);
  }, [loading]);

  useEffect(() => {
    if (
      searchTerm?.length > 2
      || filterValues?.dates.every(d => d)
    ) {
      search(searchTerm, filterValues?.dates || ['', '']);
    } else {
      fetchTeams();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchTerm, filterValues]);

  return (
    <Form
      name='user-form'
      form={form}
      layout='vertical'
      initialValues={values}
      onValuesChange={e => setValues({...values, ...e})}
      style={{ width: '100%' }}
    >
      <Form.Item label={BrandFontText('Name')}
        name='name'>
        <Input maxLength={20} style={{ ...theme.texts.brandSubFont }}/>
      </Form.Item>
      <Form.Item label={BrandFontText('Email')}
        name='email'>
        <Input maxLength={40} style={{ ...theme.texts.brandSubFont }}/>
      </Form.Item>
      {showPassword && (<Form.Item label={BrandFontText('Password')}
        name='password'>
        <Password maxLength={20} style={{ ...theme.texts.brandSubFont }}/>
      </Form.Item>)}
      <Form.Item label={BrandFontText('User Type')} name='user_type'>
        <Select
          style={{ width: '100%' }}
          options={[
            { value: 'standard', label: 'standard' },
            { value: 'admin', label: 'admin' }
          ]}
        />
      </Form.Item>
      <Form.Item label={BrandFontText('English Level')} name='english_level'>
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
      <Form.Item label={BrandFontText('Skills')}
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
      <Form.Item label={BrandFontText('CV')}
        name='cv'>
        <Input maxLength={20} style={{ ...theme.texts.brandSubFont }}/>
      </Form.Item>
      <Form.Item name='assign team' label={BrandFontText('Teams History')}>
        <>
          {AddTo('Assign Team', () => setAddTo(true))}
          <Search
            search={searchTerm}
            setSearch={setSearchTerm}
            values={{} as FilterValues}
            setValues={setFilterValues}
          />
          {loading
          ? <div style={{ width: '100%', height: 120, display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
              <LoadingMask />
            </div>
          : <TeamsContainer reveal={reveal}>
            {displayUserTeams().length > 0 ? (displayUserTeams()).map(team =>
              <Team
                key={team.id}
                team={team}
                onClick={() => handleTeamClick(team)}
              />
            ) : <NotFoundResults />}
          </TeamsContainer>
          }
          <UserTeamCreate
            user={values}
            open={addTo}
            closeModal={() => setAddTo(false)}
            handleCreate={refreshTeams}
          />
          <UserTeamUpdate
            user={values}
            team={team || {} as ITeam}
            open={update}
            closeModal={() => setUpdate(false)}
            handleUpdate={refreshTeams}
            handleDelete={refreshTeams}
          />
        </>
      </Form.Item>
    </Form>
  );
};

