// Interfaz para configuración de componentes de interfaz
export interface UIComponentProps {
  className?: string;
  style?: React.CSSProperties;
  children?: React.ReactNode;
}

// Interfaz para configuración de botones
export interface ButtonProps extends UIComponentProps {
  variant?: "primary" | "secondary" | "danger" | "outline";
  size?: "small" | "medium" | "large";
  disabled?: boolean;
  onClick?: () => void;
}

// Interfaz para configuración de modal
export interface ModalProps extends UIComponentProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
}
