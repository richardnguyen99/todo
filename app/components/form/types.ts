export type InputProps = {
  initialValue?: string;
  showState?: boolean;

  onChangeCallback?: (value: string) => void;
  onBlurCallback?: (value: string) => void;
  onValidateCallback?: (value: string) => boolean;
};
