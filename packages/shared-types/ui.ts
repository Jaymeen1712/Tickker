import type { ReactNode, ComponentProps } from "react";

// Common UI component props
export interface BaseComponentProps {
  className?: string;
  children?: ReactNode;
  id?: string;
  "data-testid"?: string;
}

// Button variants and sizes
export type ButtonVariant = 
  | "default" 
  | "destructive" 
  | "outline" 
  | "secondary" 
  | "ghost" 
  | "link";

export type ButtonSize = "default" | "sm" | "lg" | "icon";

export interface ButtonProps extends BaseComponentProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
  loading?: boolean;
  disabled?: boolean;
  asChild?: boolean;
  onClick?: () => void;
}

// Input types
export type InputType = 
  | "text" 
  | "email" 
  | "password" 
  | "number" 
  | "tel" 
  | "url" 
  | "search";

export interface InputProps extends BaseComponentProps {
  type?: InputType;
  placeholder?: string;
  value?: string;
  defaultValue?: string;
  disabled?: boolean;
  required?: boolean;
  error?: string;
  onChange?: (value: string) => void;
}

// Modal/Dialog types
export interface ModalProps extends BaseComponentProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title?: string;
  description?: string;
  size?: "sm" | "md" | "lg" | "xl" | "full";
}

// Form types
export interface FormFieldProps extends BaseComponentProps {
  label?: string;
  error?: string;
  required?: boolean;
  description?: string;
}

export interface FormProps extends BaseComponentProps {
  onSubmit: (data: Record<string, unknown>) => void | Promise<void>;
  loading?: boolean;
  disabled?: boolean;
}

// Table types
export interface TableColumn<T = unknown> {
  key: string;
  title: string;
  dataIndex?: keyof T;
  render?: (value: unknown, record: T, index: number) => ReactNode;
  sortable?: boolean;
  width?: string | number;
  align?: "left" | "center" | "right";
}

export interface TableProps<T = unknown> extends BaseComponentProps {
  columns: TableColumn<T>[];
  data: T[];
  loading?: boolean;
  pagination?: {
    current: number;
    pageSize: number;
    total: number;
    onChange: (page: number, pageSize: number) => void;
  };
  rowKey?: keyof T | ((record: T) => string);
  onRowClick?: (record: T, index: number) => void;
}

// Navigation types
export interface NavItem {
  label: string;
  href?: string;
  icon?: ReactNode;
  children?: NavItem[];
  active?: boolean;
  disabled?: boolean;
}

export interface BreadcrumbItem {
  label: string;
  href?: string;
  active?: boolean;
}

// Toast/Notification types
export type ToastType = "success" | "error" | "warning" | "info";

export interface ToastProps {
  type: ToastType;
  title: string;
  description?: string;
  duration?: number;
  action?: {
    label: string;
    onClick: () => void;
  };
}

// Loading states
export interface LoadingProps extends BaseComponentProps {
  size?: "sm" | "md" | "lg";
  text?: string;
  overlay?: boolean;
}

// Card types
export interface CardProps extends BaseComponentProps {
  title?: string;
  description?: string;
  footer?: ReactNode;
  hoverable?: boolean;
  bordered?: boolean;
}

// Avatar types
export interface AvatarProps extends BaseComponentProps {
  src?: string;
  alt?: string;
  size?: "sm" | "md" | "lg" | "xl";
  fallback?: string;
  online?: boolean;
}

// Badge types
export type BadgeVariant = "default" | "secondary" | "destructive" | "outline";

export interface BadgeProps extends BaseComponentProps {
  variant?: BadgeVariant;
  size?: "sm" | "md" | "lg";
}

// Dropdown/Select types
export interface SelectOption {
  label: string;
  value: string | number;
  disabled?: boolean;
  group?: string;
}

export interface SelectProps extends BaseComponentProps {
  options: SelectOption[];
  value?: string | number;
  defaultValue?: string | number;
  placeholder?: string;
  disabled?: boolean;
  multiple?: boolean;
  searchable?: boolean;
  clearable?: boolean;
  loading?: boolean;
  error?: string;
  onChange?: (value: string | number | (string | number)[]) => void;
}

// Layout types
export interface LayoutProps extends BaseComponentProps {
  header?: ReactNode;
  sidebar?: ReactNode;
  footer?: ReactNode;
  sidebarCollapsed?: boolean;
  onSidebarToggle?: () => void;
}

// Theme types
export type ThemeMode = "light" | "dark" | "system";

export interface ThemeContextValue {
  mode: ThemeMode;
  setMode: (mode: ThemeMode) => void;
  isDark: boolean;
}

// Responsive types
export type Breakpoint = "xs" | "sm" | "md" | "lg" | "xl" | "2xl";

export interface ResponsiveValue<T> {
  xs?: T;
  sm?: T;
  md?: T;
  lg?: T;
  xl?: T;
  "2xl"?: T;
}

// Animation types
export type AnimationType = 
  | "fade" 
  | "slide" 
  | "scale" 
  | "bounce" 
  | "spin" 
  | "pulse";

export interface AnimationProps {
  type?: AnimationType;
  duration?: number;
  delay?: number;
  repeat?: boolean | number;
}

// Event handler types
export type ClickHandler = (event: React.MouseEvent) => void;
export type ChangeHandler<T = string> = (value: T) => void;
export type SubmitHandler = (event: React.FormEvent) => void;
export type KeyboardHandler = (event: React.KeyboardEvent) => void;
