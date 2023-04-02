import { Modal, Typography } from "antd";
import { theme } from "../../../Theme";

const TeamSelection = ({
  open,
  onCancel
}: {
  open: boolean;
  onCancel: () => void;
}): JSX.Element => {
  return (
    <Modal
      destroyOnClose
      maskClosable={false}
      closable={false}
      open={open}
      title={<Typography.Text
        style={{...theme.texts.brandFont }}
        > Select a Team
        </Typography.Text>}
      style={{
        maxWidth: 360,
        position: 'relative'
      }}
      // footer={footerComponents}
      onCancel={onCancel}
    >
      <>hello world</>
    </Modal>
  );
};

export default TeamSelection;