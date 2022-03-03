export type Props = {
  managers: string[];
  error?: string;
  onAdd: (address: string) => void;
  onRemove: (address: string) => void;
};
