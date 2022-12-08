import { Field, Formik, Form } from 'formik'
import { Link, useNavigate } from 'react-router-dom'
import { useLoginUserMutation } from '../../features/libros/libro-api-slice'
import { useAppDispatch } from '../../app/hooks'
import { login } from '../../features/libros/libro-api-slice'
import * as Yup from 'yup'
import { useState } from 'react'

interface Values {
  username: string
  password: string
}

const validationSchema = Yup.object().shape({
  username: Yup.string().required('Ingrese un nombre de usuario valido'),
  password: Yup.string().required('Ingrese una contraseña valida'),
})

const Login = () => {
  const [loginUser] = useLoginUserMutation()
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const [error, setError] = useState<string | undefined>('')
  return (
    <div className='Login'>
      <div className='loginCard'>
        <h1>Iniciar sesion</h1>
        {error && <p className='error'>{error}</p>}
        <Formik
          initialValues={{
            username: '',
            password: '',
          }}
          validationSchema={validationSchema}
          onSubmit={(values: Values) => {
            loginUser(values)
              .unwrap()
              .then((res) => {
                if (res.token) {
                  dispatch(login(res))
                  localStorage.setItem('token', res.token)
                  navigate('/user/libros')
                }
              })
              .catch(() => {
                setError('El nombre de usuario o la contraseña son incorrectos')
              })
          }}
        >
          {({ errors, touched, isValid }) => (
            <Form>
              <label>Nombre de usuario</label>
              {errors.username && touched.username ? (
                <p className='error'>{errors.username}</p>
              ) : null}
              <Field
                name='username'
                placeholder='Ingrese su nombre de usuario'
                type='text'
              />
              <label>Contraseña</label>
              {errors.password && touched.password ? (
                <p className='error'>{errors.password}</p>
              ) : null}
              <Field
                name='password'
                placeholder='Ingrese su contraseña'
                type='password'
              />
              <button
                type='submit'
                disabled={!isValid}
              >
                Enviar
              </button>
            </Form>
          )}
        </Formik>
        <Link to={'/register'}>Registrarse</Link>
      </div>
    </div>
  )
}

export default Login
