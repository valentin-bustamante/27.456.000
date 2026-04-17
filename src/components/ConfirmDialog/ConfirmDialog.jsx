import { Button } from "../Button/Button";
import styles from "./ConfirmDialog.module.css";

export function ConfirmDialog({ open, title, message, onConfirm, onCancel, confirmText = "Eliminar", cancelText = "Cancelar" }) {
  if (!open) {
    return null;
  }

  return (
    <div className={styles.overlay} onClick={onCancel} role="dialog" aria-modal="true">
      <div className={styles.panel} onClick={(e) => e.stopPropagation()}>
        <div className={styles.badge}>Eliminar</div>
        <h3 className={styles.title}>{title}</h3>
        <p className={styles.message}>{message}</p>

        <div className={styles.actions}>
          <Button type="button" variant="secondary" size="medium" onClick={onCancel}>
            {cancelText}
          </Button>
          <Button type="button" variant="danger" size="medium" onClick={onConfirm}>
            {confirmText}
          </Button>
        </div>
      </div>
    </div>
  );
}
