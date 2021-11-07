import React from 'react';
import { Modal } from 'antd';

const ImgModalLayout: React.FC<ImgModalLayoutProps> = ({
  isVisible, handleClose, children,
}) => (
  <Modal
    visible={isVisible}
    onCancel={handleClose}
    centered
    closable={false}
    footer={null}
    bodyStyle={{ padding: 0 }}
    width="auto"
		>
    {children}
  </Modal>
);

type ImgModalLayoutProps = {
  isVisible: boolean;
  handleClose: () => void;
};

export default ImgModalLayout;
