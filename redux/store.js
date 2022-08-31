import { configureStore } from '@reduxjs/toolkit';
import { campsitesReducer } from '../screens/features/campsites/campsitesSlice';
import { commentsReducer } from '../screens/features/comments/commentsSlice';
import { partnersReducer } from '../screens/features/partners/partnersSlice';
import { promotionsReducer } from '../screens/features/promotions/promotionsSlice';

export const store = configureStore({
    reducer: {
        campsites: campsitesReducer,
        comments: commentsReducer,
        partners: partnersReducer,
        promotions: promotionsReducer
    }
});