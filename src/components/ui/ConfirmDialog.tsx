import React from 'react';
import { Modal } from './Modal';
import { Button } from './Button';
import { AlertTriangle } from 'lucide-react';

export interface ConfirmDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  isLoading?: boolean;
}

export const ConfirmDialog: React.FC<ConfirmDialogProps> = ({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  confirmText = 'Delete',
  cancelText = 'Cancel',
  isLoading = false,
}) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title={title} maxWidth="sm">
      <div className="space-y-4">
        <div className="flex items-start gap-3">
          <div className="p-2 rounded-full bg-crimson/20 text-crimson-accent shrink-0">
            <AlertTriangle className="w-5 h-5" />
          </div>
          <p className="text-sm text-text-secondary leading-relaxed pt-0.5">{message}</p>
        </div>

        <div className="flex items-center justify-end gap-3 pt-3 border-t border-border-subtle">
          <Button variant="ghost" size="sm" onClick={onClose} disabled={isLoading}>
            {cancelText}
          </Button>
          <Button variant="danger" size="sm" onClick={onConfirm} isLoading={isLoading}>
            {confirmText}
          </Button>
        </div>
      </div>
    </Modal>
  );
};
