import { Button, Modal, Typography } from "antd";
import { useCallback, useEffect, useState } from "react";
import { IUser } from "../../@types";
import { deleteUser, updateUser } from "../../api/core/User";
import { newUser } from "../../generators/emptyObjects";
import { theme } from "../../Theme";
import Alert from "../alert";
import { UserForm } from "./UserForm";

export const UserUpdate = ({
  user,
  open,
  closeModal,
  handleUpdate,
  handleDelete
}: {
  user: IUser;
  open: boolean;
  closeModal: () => void;
  handleUpdate: (user: IUser) => Promise<void>;
  handleDelete?: (id: number) => void;
}): JSX.Element => {
  const [loading, setLoading] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [confirm, setConfirm] = useState(false);
  const [values, setValues] = useState<IUser>(newUser('standard'));

  const handleSubmitUpdate = useCallback(async () => {
    if (Object.values(values).some(val => val === '')) {
      Alert({
        icon: 'error',
        text: 'All fields are required'
      });
      return;
    }

    setLoading(true);

    try {
      const user = await updateUser({
        id: values.id,
        name: values.name,
        email: values.email,
        user_type: values.user_type,
        profile_attributes: {
          english_level: values.english_level || '',
          technical_knowledge: values.technical_knowledge || '',
          cv: values.cv || ''
        }
      });
      setTimeout(async () => {
        await handleUpdate(user);
        setValues(newUser('standard'));
        setLoading(false);
        closeModal();
      }, 1000);
    } catch (err: any) {
      setTimeout(() => {
        const error = err.errors && err.errors.length && err.errors[0];
        Alert({
          icon: 'error',
          text: (error || 'There was an error, please try again later.')
        });
        setValues(newUser('standard'));
        setLoading(false);
        closeModal();
      }, 1000);
    }
  }, [closeModal, handleUpdate, values]);

  const handleSubmitDelete = async () => {
    setDeleting(true);

    try {
      await deleteUser(user.id);
      setTimeout(async () => {
        handleDelete && handleDelete(user.id);
        setValues(newUser('standard'));
        setDeleting(false);
        closeModal();
      }, 1000);
    } catch (err: any) {
      setTimeout(() => {
        const error = err.errors && err.errors.length && err.errors[0];
        Alert({
          icon: 'error',
          text: (error || 'There was an error, please try again later.')
        });
        setValues(newUser('standard'));
        setDeleting(false);
        closeModal();
      }, 1000);
    }
  };

  const handleCancel = () => {
    setValues(newUser('standard'));
    closeModal();
  };

  useEffect(() => {
    setValues({
      ...user,
      english_level: user.profile?.english_level,
      technical_knowledge: user.profile?.technical_knowledge,
      cv: user.profile?.cv
    });
  }, [user]);

  const footerComponents = [
    <Button
      key="cancel"
      onClick={handleCancel}
      disabled={loading || deleting}
    >
      <Typography.Text style={{ ...theme.texts.brandFont }}>
        Cancel
      </Typography.Text>
    </Button>,
    <Button
      key="submit"
      type="primary"
      loading={loading}
      disabled={deleting}
      onClick={handleSubmitUpdate}
      style={{ backgroundColor: theme.colors.blues.normal }}
    >
      <Typography.Text style={{
        ...theme.texts.brandFont,
        color: theme.colors.whites.normal
      }}
      >
        Update
      </Typography.Text>
    </Button>
  ];

  if (handleDelete) {
    footerComponents.push(<Button style={{
      backgroundColor: theme.colors.warning
    }}
      key="delete"
      onClick={() => setConfirm(true)}
      disabled={loading}
      loading={deleting}
    >
    <Typography.Text
      style={{
        ...theme.texts.brandFont,
        color: theme.colors.whites.normal
      }}
    >
      Delete
    </Typography.Text>
  </Button>);
  }

  if (confirm) Alert({
    icon: 'warning',
    text: 'Are you sure you want to delete this user?',
    showCancelButton: true
  }).then(result => {
    setConfirm(false);
    if (result.isConfirmed) {
      handleSubmitDelete();
    }
  });

  return (
    <Modal
      destroyOnClose
      maskClosable={false}
      closable={false}
      open={open}
      title={<Typography.Text
        style={{...theme.texts.brandFont }}
        > User Details
        </Typography.Text>}
      style={{
        maxWidth: 360,
        position: 'relative'
      }}
      footer={footerComponents}
    >
      <UserForm
        values={values}
        setValues={setValues}
        showPassword={false}
      />
    </Modal>
  );
};