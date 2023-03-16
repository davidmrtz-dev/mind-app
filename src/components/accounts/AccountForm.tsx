import { Form, Input, Typography } from "antd";
import { IAccount } from "../../@types";
import { theme } from "../../Theme";

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
      <Form.Item label={<Typography.Text style={{ ...theme.texts.brandSubFont }}>
        Name
      </Typography.Text>}
        name='name'>
        <Input maxLength={20} style={{ ...theme.texts.brandSubFont }}/>
      </Form.Item>
      <Form.Item label={<Typography.Text style={{ ...theme.texts.brandSubFont }}>
        Client Name
      </Typography.Text>}
        name='client_name'>
        <Input maxLength={20} style={{ ...theme.texts.brandSubFont }}/>
      </Form.Item>
      <Form.Item label={<Typography.Text style={{ ...theme.texts.brandSubFont }}>
        Manager Name
      </Typography.Text>}
        name='manager_name'>
        <Input maxLength={20} style={{ ...theme.texts.brandSubFont }}/>
      </Form.Item>
    </Form>
  );
};