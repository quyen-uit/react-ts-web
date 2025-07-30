import Swal from 'sweetalert2';

interface WarningAlertProps {
  title?: string;
  text?: string;
}

export const showWarningAlert = ({
  title = 'Warning',
  text = '',
}: WarningAlertProps) => {
  Swal.fire({
    title,
    text,
    icon: 'warning',
  });
};
