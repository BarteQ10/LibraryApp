import React, { useEffect, useState } from "react";
import { Alert as BootstrapAlert, Fade } from "react-bootstrap";

export interface AlertObject {
  show: boolean,
  header: string,
  message: string,
  variant: AlertVariant,
};
type AlertVariant = 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info' | 'light' | 'dark';

export interface AlertProps {
  children?: React.ReactNode;
  header: string;
  message: string;
  variant: "success" | "danger" | "warning" | "info" | "primary" | "secondary" | "light" | "dark";
  show: boolean;
  onClose?: () => void; // Dodajemy nowy prop onClose
}

const Alert: React.FC<AlertProps> = ({ header, message, variant = "primary", show, onClose }) => {
  const [visible, setVisible] = useState(show);

  // Listen for changes on `show` prop
  useEffect(() => {
    setVisible(show);
  }, [show]);

  // Close handler that sets local state
  const handleClose = () => {
    setVisible(false);
    if(onClose) onClose();
  };
  return (
    <Fade in={show} unmountOnExit={true}>
      <BootstrapAlert className="alert-fixed" variant={variant} dismissible onClose={handleClose}> {/* Dodajemy onClose do BootstrapAlert */}
        <BootstrapAlert.Heading>{header}</BootstrapAlert.Heading>
        {message}
      </BootstrapAlert>
    </Fade>
  );
};

export default Alert;
