import Swal from 'sweetalert2';

interface ConfirmAlertProps {
  title?: string;
  text?: string;
  onConfirm: () => void;
  onCancel?: () => void;
}

export const showConfirmAlert = ({
  title = 'Are you sure?',
  text = "You won't be able to revert this!",
  onConfirm,
  onCancel,
}: ConfirmAlertProps) => {
  Swal.fire({
    title,
    text,
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Yes, proceed!',
  }).then((result) => {
    if (result.isConfirmed) {
      onConfirm();
    } else {
      onCancel?.();
    }
  });
};
