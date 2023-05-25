import { Button, Modal } from "antd";
import { useState } from "react";
import { IUser, IUserTeam } from "../../../../@types";
import { theme } from "../../../../Theme";
import { newUserTeam } from '../../../../generators/emptyObjects/index';
import { createUserTeam } from "../../../../api/core/UserTeam";
import UserTeamForm from "./user-team-form";
import dayjs from "dayjs";
import Alert from "../../../alert";
import { BrandFontText } from "../../../../atoms/text";

export const UserTeamCreate = ({
  open,
  closeModal,
  handleCreate,
  user
}: {
  open: boolean;
  closeModal: () => void;
  handleCreate: () => Promise<void>;
  user: IUser;
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
      await createUserTeam({
        ...values,
        user_id: user.id,
        start_at: dayjs(values.start_at).format('YYYY-MM-DD'),
        end_at: dayjs(values.end_at).format('YYYY-MM-DD')
      });
      await handleCreate();
    } catch (err: any) {
      const error = err?.errors?.[0] || err?.error || '';
      Alert({
        icon: 'error',
        text: (error || 'There was an error, please try again later.'),
      });
    } finally {
      setTimeout(() => {
        handleClose();
        setLoading(false);
      }, 1000);
    }
  };

  const handleClose = () => {
    setValues(newUserTeam());
    closeModal();
  };

  return (
    <Modal
      destroyOnClose
      maskClosable={false}
      closable={false}
      open={open}
      title={BrandFontText('Assign Team')}
      style={{
        maxWidth: 360
      }}
      footer={[
        <Button key="cancel" onClick={handleClose} disabled={loading}>
          {BrandFontText('Cancel')}
        </Button>,
        <Button key="submit" type="primary" loading={loading} onClick={handleSubmit}>
          {BrandFontText('Create', { color: theme.colors.whites.normal })}
        </Button>
      ]}
    >
      <UserTeamForm
        user={user}
        values={values}
        setValues={setValues}
      />
    </Modal>
  );
};