import { Button, Modal, Typography } from "antd";
import { useState } from "react";
import { IUser } from "../../../@types";
import { theme } from "../../../Theme";
import { newUser } from "../../../generators/emptyObjects/Users";
import { UserCreateForm } from "./UserCreateForm";
import Alert from "../../alert";
import { createUser } from "../../../api/core/User";

const UserCreate = ({
  open,
  closeModal,
  handleCreate
}: {
  open: boolean;
  closeModal: () => void;
  handleCreate: (user: IUser) => Promise<void>;
}): JSX.Element => {
  const [loading, setLoading] = useState(false);
  const [values, setValues] = useState<IUser>(newUser('standard'));

  const handleSubmit = async () => {
    if (Object.values(values).some(val => val === '')) {
      console.log(values);
      Alert({
        icon: 'error',
        text: 'All fields are required'
      });
      return;
    }

    setLoading(true);

    try {
      const user = await createUser({
        name: values.name,
        email: values.email,
        password: values.password,
        user_type: values.user_type,
        profile_attributes: {
          english_level: values.english_level || '',
          technical_knowledge: values.technical_knowledge || '',
          cv: values.cv || ''
        }
      });
      setTimeout(async () => {
        await handleCreate(user);
        setValues(newUser('standard'));
        setLoading(false);
        closeModal();
      }, 1000);
    } catch (err: any) {
      setTimeout(() => {
        const error = err.errors && err.errors.length && err.errors[0];
        Alert({
          icon: 'error',
          text: (error || 'There was an error, please try again later.'),
        });
        setValues(newUser('standard'));
        setLoading(false);
        closeModal();
      }, 1000);
    }
  };

  const handleCancel = () => {
    setValues(newUser('standard'));
    closeModal();
  };

  return (
    <Modal
      destroyOnClose
      maskClosable={false}
      closable={false}
      open={open}
      title={<Typography.Text
        style={{...theme.texts.brandFont, fontWeight: 'normal'}}
        > New user
        </Typography.Text>}
      style={{
        maxWidth: 360
      }}
      footer={[
        <Button key="cancel" onClick={handleCancel} disabled={loading}>
          <Typography.Text style={{ ...theme.texts.brandFont }}>
            Cancel
          </Typography.Text>
        </Button>,
        <Button key="submit" type="primary" loading={loading} onClick={handleSubmit}>
          <Typography.Text
            style={{ ...theme.texts.brandFont, color: theme.colors.whites.normal }}
          >
            Create
          </Typography.Text>
        </Button>
      ]}
    >
      <UserCreateForm
        values={values}
        setValues={setValues}
      />
    </Modal>
  );
};

export default UserCreate;