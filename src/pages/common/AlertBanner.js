import { Alert } from 'react-bootstrap';

export default function AlertBanner({ variant, message }) {
  const alertMessage =
    message || 'An unexpected error ocurred. Please try again later.';
  const alertVariant = variant || 'danger';

  return (
    <Alert variant={alertVariant} style={{ backgroundColor: 'red' }}>
      {alertMessage}
    </Alert>
  );
}
