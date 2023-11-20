import React from 'react';
import { Modal, Drawer } from 'antd';

const ModalLayout = ({
  isOpen,
  closable,
  title,
  visible,
  // okText,
  cancelText,
  // loading,
  style,
  width,
  maxWidth,
  height,
  top,
  type,
  placement,
  bodyStyle,
  timer,
  footer,
  footerStyle,
  children,
  onChange,
  onOk,
  onCancel,
  centered,
}) => {
  /* 토글 */
  const toggleOnChange = () => {
    if (onChange) onChange(!isOpen);
  };

  /* OK버튼 클릭 시 발생이벤트 */
  const handleOk = () => {
    if (onOk) onOk();
    else toggleOnChange();
  };

  /* 취소버튼 클릭 시 발생이벤트 */
  const handleCancel = () => {
    if (onCancel) onCancel();
    else toggleOnChange();
  };

  /*  */
  const typeView = (type, children) => {
    switch (type) {
      case 'modal':
      case 'Modal':
      case 'MODAL':
        return (
          <Modal
            {...(title && { title })}
            width={width}
            visible={visible}
            onOk={handleOk}
            onCancel={handleCancel}
            cancelText={cancelText}
            {...(top && { style: { top } })}
            {...(style && { style: { top, ...style } })}
            {...(bodyStyle && { bodyStyle: { ...bodyStyle } })}
            footer={footer}
            footerStyle={footerStyle}
            centered={centered}
            closable={closable}
          >
            {children}
          </Modal>
        );

      case 'drawer':
      case 'Drawer':
      case 'DRAWER':
        return (
          <Drawer
            {...(title && { title })}
            width={width}
            height={height}
            // placement="right"
            closable={closable}
            placement={placement}
            // closable={false}
            onClose={handleCancel}
            visible={visible}
            bodyStyle={{ ...style }}
            {...(placement === 'left' ||
              (placement === 'right' && { contentWrapperStyle: { maxWidth } }))}
            footer={footer}
            footerStyle={footerStyle}
          >
            {children}
          </Drawer>
        );
      default:
        return null;
    }
  };

  /* RENDER */
  return typeView(type, children);
};

/* Default Props */
ModalLayout.defaultProps = {
  // top: 20,
  isOpen: false,
  closable: false,
  onChange: () => {},
  name: 'defaultModal',
  title: null,
  type: 'modal', // ['drawer']
  width: 1000,
  maxWidth: 1000, // Drawer에서만 적용
  height: '30%',
  onOk: () => {},
  onCancel: () => {},
  okText: 'OK',
  cancelText: 'Cancel',
  loading: false,
  style: {},
  bodyStyle: {},
  footer: null,
  footerStyle: {
    /* marginBottom: 20 */
  },
  centered: false,
  timer: null,
  // drawer options
  placement: 'right',
};

export default ModalLayout;
