import { Button, Modal, Typography } from "antd";
import dayjs from "dayjs";
import { useCallback, useEffect, useState } from "react";
import { IUserTeam } from "../../@types";
import { deleteUserTeam, updateUserTeam } from "../../api/core/UserTeam";
import { newUserTeam } from "../../generators/emptyObjects";
import { theme } from "../../Theme";
import Alert from "../alert";
import { UserTeamForm } from "./UserTeamForm";

export const UserTeamUpdate = ({
  userTeam,
  open,
  closeModal,
  handleUpdate,
  handleDelete
}: {
  userTeam: IUserTeam;
  open: boolean;
  closeModal: () => void;
  handleUpdate: (userTeam: IUserTeam) => Promise<void>;
  handleDelete?: (id: number) => void;
}): JSX.Element => {
  const [loading, setLoading] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [confirm, setConfirm] = useState(false);
  const [values, setValues] = useState<IUserTeam>(newUserTeam());

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
      const userTeam = await updateUserTeam({
        ...values,
        start_at: dayjs(values.start_at).format('YYYY-MM-DD'),
        end_at: dayjs(values.end_at).format('YYYY-MM-DD')
      });
      await handleUpdate(userTeam);
    } catch (err: any) {
      const error = err?.errors?.[0] || err?.error || '';
      Alert({
        icon: 'error',
        text: (error || 'There was an error, please try again later.')
      });
    } finally {
      setTimeout(() => {
        setValues(newUserTeam());
        setLoading(false);
        closeModal();
      }, 1000);
    }
  }, [closeModal, handleUpdate, values]);

  const handleSubmitDelete = async () => {
    setDeleting(true);

    try {
      await deleteUserTeam(userTeam.id);
      handleDelete && handleDelete(userTeam.id);
    } catch (err: any) {
      const error = err?.errors?.[0] || err?.error || '';
      Alert({
        icon: 'error',
        text: (error || 'There was an error, please try again later.')
      });
    } finally {
      setTimeout(() => {
        setValues(newUserTeam());
        setDeleting(false);
        closeModal();
      }, 1000);
    }
  };

  const handleCancel = () => {
    setValues(newUserTeam());
    closeModal();
  };

  useEffect(() => {
    setValues({
      ...userTeam,
      start_at: dayjs(userTeam.start_at),
      end_at: dayjs(userTeam.end_at)
    });
  }, [userTeam]);

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
    text: 'Are you sure you want to delete this user team relation?',
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
        style={{...theme.texts.brandFont, fontWeight: 'normal'}}
        > Update user team
        </Typography.Text>}
      style={{
        maxWidth: 360,
        position: 'relative'
      }}
      footer={footerComponents}
    >
      <UserTeamForm
        values={values}
        setValues={setValues}
      />
    </Modal>
  );
};