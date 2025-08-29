// types/delete.ts

export type DeleteWarningProps = {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void | Promise<void>;
};
