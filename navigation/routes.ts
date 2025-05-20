import {RootStackParamList} from '../utils/types';

type StackRoutesProps = {
  home: string;
};

export const StackRoutes: Record<
  keyof StackRoutesProps,
  keyof RootStackParamList
> = {
  home: 'Home',
};
