import Swal from 'sweetalert2';

interface NotificationAlertProps {
  title?: string;
  text?: string;
  icon?: 'success' | 'error' | 'warning' | 'info' | 'question';
}

export const showNotificationAlert = ({
  title = 'Notification',
  text = '',
  icon = 'success',
}: NotificationAlertProps) => {
  Swal.fire({
    title,
    text,
    icon,
  });
};
