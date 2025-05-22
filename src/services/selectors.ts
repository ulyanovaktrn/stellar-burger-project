import { RootState } from './store';
import { ingredientsSlice } from './slices/ingredients-slice';

export const ingredientsSelector = ingredientsSlice.selectors;
