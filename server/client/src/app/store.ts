import { configureStore } from '@reduxjs/toolkit'

import userReducer, { libroApi } from '../features/libros/libro-api-slice'

export const store = configureStore({
  reducer: {
    user: userReducer,
    [libroApi.reducerPath]: libroApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(libroApi.middleware),
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
