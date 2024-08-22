export type CommandPlaceholder = {
  commandParameters: string[];
  message: string;
  setMessage: (message: string) => void;
  inputRef: React.RefObject<HTMLInputElement>;
};
