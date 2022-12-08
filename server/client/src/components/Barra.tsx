import {
  useLogoutUserMutation,
  logout,
  useCloseBookMutation,
} from '../features/libros/libro-api-slice'
import { useNavigate, useLocation, useParams } from 'react-router-dom'
import { useAppDispatch } from '../app/hooks'
import { BiLogOut, BiHome, BiDownArrowAlt, BiUpArrowAlt } from 'react-icons/bi'
import { useState } from 'react'

const Barra = () => {
  const [ocultarBarra, setOcultarBarra] = useState<boolean>(false)
  const [logoutUser] = useLogoutUserMutation()
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const { pathname } = useLocation()

  return (
    <div className='Barra'>
      <button
        className='ocultarBarra'
        onClick={() => {
          setOcultarBarra(!ocultarBarra)
        }}
      >
        {ocultarBarra ? <BiUpArrowAlt /> : <BiDownArrowAlt />}
      </button>
      <div></div>
      {ocultarBarra ? (
        <></>
      ) : (
        <>
          <button
            onClick={() => {
              logoutUser()
              localStorage.removeItem('token')
              dispatch(logout())
              navigate('/')
            }}
          >
            <BiLogOut />
          </button>
          {pathname === '/user/libros' ? (
            <div></div>
          ) : (
            <button
              onClick={() => {
                navigate('/user/libros')
              }}
            >
              <BiHome />
            </button>
          )}
        </>
      )}
    </div>
  )
}

export default Barra
