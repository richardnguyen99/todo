export type InputVariantType = "primary" | "success" | "danger";

export type InputProps = {
  initialValue?: string;
  variant: InputVariantType;
  showState?: boolean;

  onChangeCallback?: (value: string) => void;
  onBlurCallback?: (value: string) => void;
  onValidateCallback?: (value: string) => boolean;
};
