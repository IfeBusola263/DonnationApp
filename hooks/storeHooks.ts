import {TypedUseSelectorHook, useDispatch, useSelector} from 'react-redux';
import {AppDispatch, RootState} from '../store/store';

type DispatchFunction = () => AppDispatch;

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export const useAppDispatch: DispatchFunction = useDispatch;
