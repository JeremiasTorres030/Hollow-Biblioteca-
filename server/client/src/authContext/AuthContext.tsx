import {
  useContext,
  createContext,
  useLayoutEffect,
  useState,
  useEffect,
} from 'react'
import { useAppDispatch } from '../app/hooks'
import { login } from '../features/libros/libro-api-slice'
import { useNavigate } from 'react-router-dom'

const contextAuth = createContext({})

export const useAuth = () => {
  const context = useContext(contextAuth)
  return context
}

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const [authenticated, setAuthenticated] = useState<boolean>(false)

  useLayoutEffect(() => {
    const token = localStorage.getItem('token')
    if (token) {
      setAuthenticated(true)
      dispatch(
        login({
          user: {
            email: '',
            id: 0,
            username: '',
          },
          token: token,
        })
      )
    }
  }, [])

  useEffect(() => {
    if (authenticated) {
      navigate('/user/libros')
    }
  }, [authenticated])

  return <contextAuth.Provider value={{}}>{children}</contextAuth.Provider>
}

export default AuthProvider
