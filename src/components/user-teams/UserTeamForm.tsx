import { DatePicker, Form, InputNumber, Select, Typography } from "antd";
import { IUserTeam } from "../../@types";
import { theme } from "../../Theme";

export const UserTeamForm = ({
  values,
  setValues
}: {
  values: IUserTeam;
  setValues: (values: IUserTeam) => void;
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
        User Id
      </Typography.Text>}
        name='user_id'>
        <InputNumber
          min={1}
          style={{ width: '100%', ...theme.texts.brandSubFont }}
        />
      </Form.Item>
      <Form.Item label={<Typography.Text style={{ ...theme.texts.brandSubFont }}>
        Team Id
      </Typography.Text>}
        name='team_id'>
        <InputNumber
          min={1}
          style={{ width: '100%', ...theme.texts.brandSubFont }}
        />
      </Form.Item>
      <Form.Item label="Start date" name='start_at'>
        <DatePicker
          style={{ width: '100%' }}
        />
      </Form.Item>
      <Form.Item label="End date" name='end_at'>
        <DatePicker
          style={{ width: '100%' }}
        />
      </Form.Item>
      <Form.Item label='User Type' name='status'>
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