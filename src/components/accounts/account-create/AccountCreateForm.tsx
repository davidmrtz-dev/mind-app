import { Form, Input, Typography } from "antd";
import styled from "styled-components";
import { IAccount } from "../../../@types";
import { Team } from "../../../pages/teams/Team";
import { theme } from "../../../Theme";
import { BrandFontText } from "../../../atoms/text";

const TeamsContainer = styled.div<{ reveal: boolean }>`
  opacity: ${p => p.reveal ? 1 : 0};
  transition: opacity 1s ease-in-out;
  display: flex;
  flex-direction: column;
`;

export const AccountCreateForm = ({
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
      <Form.Item label={BrandFontText('Name')}
        name='name'>
        <Input maxLength={20} style={{ ...theme.texts.brandSubFont }}/>
      </Form.Item>
      <Form.Item label={BrandFontText('Client Name')}
        name='client_name'>
        <Input maxLength={20} style={{ ...theme.texts.brandSubFont }}/>
      </Form.Item>
      <Form.Item label={BrandFontText('Manager Name')}
        name='manager_name'>
        <Input maxLength={20} style={{ ...theme.texts.brandSubFont }}/>
      </Form.Item>
    </Form>
  );
};