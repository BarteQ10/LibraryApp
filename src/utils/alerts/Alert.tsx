import React from "react";
import { Alert as BootstrapAlert, Fade } from "react-bootstrap";

export interface AlertProps {
  children?: React.ReactNode;
  header: string;
  message: string;
  variant:
    | "success"
    | "danger"
    | "warning"
    | "info"
    | "primary"
    | "secondary"
    | "light"
    | "dark";
  show: boolean;
  onClose?: () => void; // Dodajemy nowy prop onClose
}

const Alert: React.FC<AlertProps> = ({
  header,
  message,
  variant = "primary",
  show,
  onClose, // Pobieramy onClose z propsów
}) => {
  return (
    <Fade in={show} unmountOnExit={true}>
      <BootstrapAlert className="alert-fixed" variant={variant} dismissible onClose={onClose}> {/* Dodajemy onClose do BootstrapAlert */}
        <BootstrapAlert.Heading>{header}</BootstrapAlert.Heading>
        {message}
      </BootstrapAlert>
    </Fade>
  );
};

export default Alert;
