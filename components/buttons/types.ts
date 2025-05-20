export type Button = {
  text: string;
  isDisabled?: boolean;
  onPress: () => void;
  use: 'button';
};

export type TabButton = {
  use: 'tab';
  label: string;
  isActive: boolean;
  onPress: () => void;
};

export type PrimaryButtonProps = Button | TabButton;

export type BadgeProps = {
  title: string;
};
