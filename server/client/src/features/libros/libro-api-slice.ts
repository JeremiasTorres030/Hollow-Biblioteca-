import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '../../app/store'

interface libroData {
  id: number
  file: string
  path_file: string
  title: string
  thumbnail: string
}

interface userData {
  user: {
    id: number
    username: string
    email: string
  }
  token: string
  msg?: string
}

const initialState: userData = {
  user: {
    email: '',
    id: 0,
    username: '',
  },
  token: '',
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    login(state, action: PayloadAction<userData>) {
      state.user = action.payload.user
      state.token = action.payload.token
    },
    logout(state) {
      state.token = ''
      state.user = {
        email: '',
        id: 0,
        username: '',
      }
    },
  },
})

export const libroApi = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API_URL,
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as RootState).user.token
      if (token !== '') {
        headers.set('Authorization', `Token ${token}`)
      }
    },
  }),
  endpoints: (builder) => ({
    getAllBooks: builder.query<Array<libroData>, void>({
      query: () => 'libros/',
    }),
    deleteBook: builder.mutation<{ ok: boolean; msg: string }, number>({
      query: (body) => {
        return { url: `libros/${body}/`, method: 'DELETE' }
      },
    }),
    editBook: builder.mutation<
      { ok: boolean; msg: string },
      { id: number; title: string; thumbnail: string }
    >({
      query: (body) => {
        return { url: `libros/${body.id}/`, method: 'PUT', body: body }
      },
    }),
    closeBook: builder.mutation<void, string>({
      query: (body) => {
        return {
          url: `pdf/${body}/`,
          method: 'DELETE',
        }
      },
    }),
    registerUser: builder.mutation<
      { ok: boolean; msg: string },
      { username: string; password: string; email: string }
    >({
      query: (body) => {
        return {
          url: 'user/',
          method: 'POST',
          body,
        }
      },
    }),
    loginUser: builder.mutation<
      userData,
      { username: string; password: string }
    >({
      query: (body) => {
        return {
          url: 'user/login/',
          method: 'POST',
          body,
        }
      },
    }),
    logoutUser: builder.mutation<void, void>({
      query: () => {
        return {
          url: 'user/logout/',
          method: 'POST',
          body: {},
        }
      },
    }),
  }),
})

export const {
  useGetAllBooksQuery,
  useRegisterUserMutation,
  useLoginUserMutation,
  useLogoutUserMutation,
  useDeleteBookMutation,
  useEditBookMutation,
  useCloseBookMutation,
} = libroApi

export const { login, logout } = userSlice.actions
export default userSlice.reducer
