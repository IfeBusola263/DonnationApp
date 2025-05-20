import {createSlice, PayloadAction} from '@reduxjs/toolkit';

const categories = [
  {
    id: 1,
    name: 'Highlight',
  },
  {
    id: 2,
    name: 'Environment',
  },
  {
    id: 3,
    name: 'Education',
  },
  {
    id: 4,
    name: 'Clothing and Accessories',
  },
  {
    id: 5,
    name: 'Household goods',
  },
  {
    id: 6,
    name: 'Electronics',
  },
  {
    id: 7,
    name: 'Toys and Games',
  },
  {
    id: 8,
    name: 'Sports Equipment',
  },
  {
    id: 9,
    name: 'Books and Media',
  },
  {
    id: 10,
    name: 'Health and Beauty Products',
  },
  {
    id: 11,
    name: 'Office supplies',
  },
  {
    id: 12,
    name: 'Tools and Hardware',
  },
  {
    id: 13,
    name: 'Art and Craft Supplies',
  },
];

export type Category = {
  id: number;
  name: string;
};

type CatState = {
  categories: Category[];
  activeCatId: number;
};

const initialState: CatState = {
  categories,
  activeCatId: 1,
};

const categorySlice = createSlice({
  name: 'categories',
  initialState,
  reducers: {
    clearCategory: () => {
      return initialState;
    },
    changeActiveCat: (state, action: PayloadAction<{id: number}>) => {
      state.activeCatId = action.payload.id;
    },
  },
});

export default categorySlice.reducer;
export const {changeActiveCat, clearCategory} = categorySlice.actions;
