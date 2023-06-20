// utils/alerts/Alert.tsx
import React from "react";
import { Alert as BootstrapAlert, Fade } from "react-bootstrap";

interface AlertProps {
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
}

const Alert: React.FC<AlertProps> = ({
  header,
  message,
  variant = "primary",
  show,
}) => {
  return (
    <Fade in={show} unmountOnExit={true}>
      <BootstrapAlert className="alert-fixed" variant={variant} dismissible>
        <BootstrapAlert.Heading>{header}</BootstrapAlert.Heading>
        {message}
      </BootstrapAlert>
    </Fade>
  );
};

export default Alert;
