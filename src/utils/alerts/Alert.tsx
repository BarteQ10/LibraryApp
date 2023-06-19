// utils/alerts/Alert.tsx
import React from 'react';
import { Alert as BootstrapAlert } from 'react-bootstrap';

interface AlertProps {
  message: string;
  variant: "success" | "danger" | "warning" | "info" | "primary" | "secondary" | "light" | "dark";
}

const Alert: React.FC<AlertProps> = ({ message, variant = "primary" }) => {
  return (
    <BootstrapAlert variant={variant} className='position-absolute top-0 alert-fixed-top'>
      {message}
    </BootstrapAlert>
  );
};

export default Alert;