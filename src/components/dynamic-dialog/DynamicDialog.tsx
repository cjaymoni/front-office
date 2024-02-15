import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { useState } from "react";

export const DynamicDialog = (props: {
  open: boolean;
  onClose: () => void;
  componentToRender: React.ReactNode;
}) => {
  const [visible, setVisible] = useState(props.open);
  const footerContent = (
    <div>
      <Button
        label="No"
        icon="pi pi-times"
        onClick={() => setVisible(false)}
        className="p-button-text"
      />
      <Button
        label="Yes"
        icon="pi pi-check"
        onClick={() => setVisible(false)}
        autoFocus
      />
    </div>
  );

  return (
    <Dialog
      header="Header"
      visible={visible}
      style={{ width: "50vw" }}
      onHide={() => setVisible(false)}
      footer={footerContent}
      appendTo="self"
    >
      {props.componentToRender}
    </Dialog>
  );
};
