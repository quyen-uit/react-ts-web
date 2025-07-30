import Swal from 'sweetalert2';

interface ErrorAlertProps {
  title?: string;
  text?: string;
}

export const showErrorAlert = ({
  title = 'Error',
  text = 'Something went wrong!',
}: ErrorAlertProps) => {
  Swal.fire({
    title,
    text,
    icon: 'error',
  });
};
