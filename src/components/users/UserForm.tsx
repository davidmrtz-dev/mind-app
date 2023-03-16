import { Form, Input, Select, Typography } from "antd";
import Password from "antd/es/input/Password";
import TextArea from "antd/es/input/TextArea";
import { IUserNew } from "../../@types";
import { theme } from "../../Theme";

export const UserForm = ({
  values,
  setValues,
  showPassword
}: {
  values: IUserNew;
  setValues: (values: IUserNew) => void;
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
      <Form.Item label={<Typography.Text style={{ ...theme.texts.brandSubFont }}>
        Name
      </Typography.Text>}
        name='name'>
        <Input maxLength={20} style={{ ...theme.texts.brandSubFont }}/>
      </Form.Item>
      <Form.Item label={<Typography.Text style={{ ...theme.texts.brandSubFont }}>
        Email
      </Typography.Text>}
        name='email'>
        <Input maxLength={40} style={{ ...theme.texts.brandSubFont }}/>
      </Form.Item>
      {showPassword && (<Form.Item label={<Typography.Text style={{ ...theme.texts.brandSubFont }}>
        Password
      </Typography.Text>}
        name='password'>
        <Password maxLength={20} style={{ ...theme.texts.brandSubFont }}/>
      </Form.Item>)}
      <Form.Item label='User Type' name='user_type'>
        <Select
          style={{ width: '100%' }}
          options={[
            { value: 'standard', label: 'standard' },
            { value: 'admin', label: 'admin' }
          ]}
        />
      </Form.Item>
      <Form.Item label='English Level' name='english_level'>
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
      <Form.Item label={<Typography.Text style={{ ...theme.texts.brandSubFont }}>
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
      <Form.Item label={<Typography.Text style={{ ...theme.texts.brandSubFont }}>
        CV
      </Typography.Text>}
        name='cv'>
        <Input maxLength={20} style={{ ...theme.texts.brandSubFont }}/>
      </Form.Item>
    </Form>
  );
};