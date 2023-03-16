import { Button, Modal, Typography } from "antd";
import { useState } from "react";
import { IAccount, IOutcome, TransactionType } from "../../@types";
import { createOutcome } from "../../api/core/Outcome";
import { theme } from "../../Theme";
import Alert from "../alert";
import { newAccount, newOutcome } from '../../generators/emptyObjects/index';
import dayjs from "dayjs";
import { createAccount } from "../../api/core/Account";
import { AccountForm } from "./AccountForm";

export const AccountCreate = ({
  open,
  closeModal,
  handleCreate
}: {
  open: boolean;
  closeModal: () => void;
  handleCreate: (account: IAccount) => Promise<void>;
}): JSX.Element => {
  const [loading, setLoading] = useState(false);
  const [values, setValues] = useState<IAccount>(newAccount());

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
      const account = await createAccount({
        ...values
      });
      setTimeout(async () => {
        await handleCreate(account);
        setValues(newAccount());
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
        setValues(newAccount());
        setLoading(false);
        closeModal();
      }, 1000);
    }
  };

  const handleCancel = () => {
    setValues(newAccount());
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
        > New account
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
      <AccountForm
        values={values}
        setValues={setValues}
      />
    </Modal>
  );
};