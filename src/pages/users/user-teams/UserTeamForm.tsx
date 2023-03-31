import { DatePicker, Form, InputNumber, Select, Typography } from "antd";
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
      <Form.Item label={<Typography.Text style={{ ...theme.texts.brandSubFont }}>
        User
      </Typography.Text>}
        name='user_id'>
        <Typography.Text style={{ width: '100%', ...theme.texts.brandSubFont }}>
          <strong>Name:</strong> {user.name}, <strong>Email:</strong> {user.email}
        </Typography.Text>
      </Form.Item>
      <Form.Item label={<Typography.Text style={{ ...theme.texts.brandSubFont }}>
        Select Team
      </Typography.Text>}
        name='team_id'>
        <InputNumber
          min={1}
          style={{ width: '100%', ...theme.texts.brandSubFont }}
        />
      </Form.Item>
      <Form.Item label="Start Date" name='start_at'>
        <DatePicker
          style={{ width: '100%' }}
        />
      </Form.Item>
      <Form.Item label="End Date" name='end_at'>
        <DatePicker
          style={{ width: '100%' }}
        />
      </Form.Item>
      <Form.Item label='Status' name='status'>
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