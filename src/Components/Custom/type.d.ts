type customButtonType = {
  children: ReactNode;
  className?: string;
  [key: string]: unknown;
  color?: string;
};
type customInputSelect = {
  label?: string;
  message?: string | undefined;
  defaultValue?: string | number;
  setValue: (name, value, { shouldValidate: boolean }) => void;
  children: ReactNode;
  [key: string]: HTMLInputTypeAttribute;
  labelClassName?: string;
  className?: string;
};
