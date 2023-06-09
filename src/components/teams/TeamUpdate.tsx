import { Button, Modal, Typography } from "antd";
import { useCallback, useEffect, useState } from "react";
import { ITeam } from "../../@types";
import { deleteTeam, updateTeam } from "../../api/core/Team";
import { newTeam } from "../../generators/emptyObjects";
import { theme } from "../../Theme";
import Alert from "../alert";
import { TeamForm } from "./TeamForm";

export const TeamUpdate = ({
  team,
  open,
  closeModal,
  handleUpdate,
  handleDelete
}: {
  team: ITeam;
  open: boolean;
  closeModal: () => void;
  handleUpdate: (team: ITeam) => Promise<void>;
  handleDelete?: (id: number) => void;
}): JSX.Element => {
  const [loading, setLoading] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [confirm, setConfirm] = useState(false);
  const [values, setValues] = useState<ITeam>(newTeam());

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
      const team = await updateTeam({
        ...values
      });
      await handleUpdate(team);
    } catch (err: any) {
      const error = err?.errors?.[0] || err?.error || '';
      Alert({
        icon: 'error',
        text: (error || 'There was an error, please try again later.')
      });
    } finally {
      setTimeout(() => {
        setValues(newTeam());
        setLoading(false);
        closeModal();
      }, 1000);
    }
  }, [closeModal, handleUpdate, values]);

  const handleSubmitDelete = async () => {
    setDeleting(true);

    try {
      await deleteTeam(team.id);
      handleDelete && handleDelete(team.id);
    } catch (err: any) {
      const error = err?.errors?.[0] || err?.error || '';
      Alert({
        icon: 'error',
        text: (error || 'There was an error, please try again later.')
      });
    } finally {
      setTimeout(() => {
        setValues(newTeam());
        setDeleting(false);
        closeModal();
      }, 1000);
    }
  };

  const handleCancel = () => {
    setValues(newTeam());
    closeModal();
  };

  useEffect(() => {
    setValues(team);
  }, [team]);

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
    text: 'Are you sure you want to delete this team?',
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
        > Update team
        </Typography.Text>}
      style={{
        maxWidth: 360,
        position: 'relative'
      }}
      footer={footerComponents}
    >
      <TeamForm
        values={values}
        setValues={setValues}
      />
    </Modal>
  );
};