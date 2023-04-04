import { Button, Modal, Typography } from "antd";
import { useState } from "react";
import { IUserTeam } from "../../@types";
import { theme } from "../../Theme";
import Alert from "../alert";
import { newUserTeam } from '../../generators/emptyObjects/index';
import { createUserTeam } from "../../api/core/UserTeam";
import { UserTeamForm } from "./UserTeamForm";
import dayjs from "dayjs";

export const UserTeamCreate = ({
  userLocked,
  open,
  closeModal,
  handleCreate
}: {
  userLocked?: boolean;
  open: boolean;
  closeModal: () => void;
  handleCreate: (userTeam: IUserTeam) => Promise<void>;
}): JSX.Element => {
  const [loading, setLoading] = useState(false);
  const [values, setValues] = useState<IUserTeam>(newUserTeam());

  const handleSubmit = async () => {
    if (Object.values(values).some(val => val === '')) {
      Alert({
        icon: 'error',
        text: 'All fields are required'
      });
      return;
    }

    setLoading(true);

    try {
      const userTeam = await createUserTeam({
        ...values,
        start_at: dayjs(values.start_at).format('YYYY-MM-DD'),
        end_at: dayjs(values.end_at).format('YYYY-MM-DD')
      });
      await handleCreate(userTeam);
    } catch (err: any) {
      const error = err?.errors?.[0] || err?.error || '';
      Alert({
        icon: 'error',
        text: (error || 'There was an error, please try again later.'),
      });
    } finally {
      setTimeout(() => {
        setValues(newUserTeam());
        setLoading(false);
        closeModal();
      }, 1000);
    }
  };

  const handleCancel = () => {
    setValues(newUserTeam());
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
        > New user team
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
      <UserTeamForm
        lockUserId={userLocked}
        values={values}
        setValues={setValues}
      />
    </Modal>
  );
};