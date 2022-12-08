import Inicio from '../pages/libros/Inicio'
import Libro from '../pages/libros/Libro'
import Libros from '../pages/libros/Libros'
import Error from '../pages/error/Error'
import Login from '../pages/usuarios/Login'
import Register from '../pages/usuarios/Register'
import AuthProvider from '../authContext/AuthContext'
import { Route, Routes, BrowserRouter } from 'react-router-dom'

const Router = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route
            element={<Login />}
            path='/'
          />
          <Route
            element={<Register />}
            path='register'
          />
          <Route
            path='user'
            element={<Inicio />}
          >
            <Route
              element={<Libros />}
              path='libros'
            />
            <Route
              element={<Libro />}
              path='libro/:id'
            />
          </Route>

          <Route
            element={<Error />}
            path='*'
          />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  )
}

export default Router
