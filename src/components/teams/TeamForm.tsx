import { Form, Input, InputNumber, Typography } from "antd";
import { theme } from "../../Theme";

export const TeamForm = <T,>({
  values,
  setValues
}: {
  values: T;
  setValues: (values: T) => void;
}): JSX.Element => {
  const [form] = Form.useForm();

  return (
    <Form
      name='team-form'
      form={form}
      layout='vertical'
      initialValues={values as undefined}
      onValuesChange={e => setValues({...values, ...e})}
      style={{ width: '100%' }}
    >
      <Form.Item label={<Typography.Text style={{ ...theme.texts.brandSubFont }}>
        Name
      </Typography.Text>}
        name='name'>
        <Input maxLength={20} style={{ ...theme.texts.brandSubFont }}/>
      </Form.Item>
      <Form.Item label={<Typography.Text style={{ ...theme.texts.brandSubFont }}>
        Account Id
      </Typography.Text>}
        name='account_id'>
        <InputNumber
          min={1}
          style={{ width: '100%', ...theme.texts.brandSubFont }}
        />
      </Form.Item>
    </Form>
  );
};