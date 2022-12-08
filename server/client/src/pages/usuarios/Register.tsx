import { Field, Form, Formik } from 'formik'
import { useRegisterUserMutation } from '../../features/libros/libro-api-slice'
import { Link, useNavigate } from 'react-router-dom'
import * as Yup from 'yup'
import { useState } from 'react'

interface Values {
  email: string
  username: string
  password: string
}

const validationSchema = Yup.object().shape({
  email: Yup.string().required('Ingrese un correo electronico valido'),
  username: Yup.string().required('Ingrese un nombre de usuario valido'),
  password: Yup.string().required('Ingrese una contraseña valida'),
})

const Register = () => {
  const [createUser] = useRegisterUserMutation()
  const navigate = useNavigate()
  const [error, setError] = useState<string>('')

  return (
    <div className='Register'>
      <div className='registerCard'>
        <h1>Register</h1>
        {error && <p className='error'>{error}</p>}
        <Formik
          initialValues={{
            email: '',
            username: '',
            password: '',
          }}
          validationSchema={validationSchema}
          onSubmit={(values: Values) => {
            createUser(values)
              .unwrap()
              .then((res) => {
                if (res.ok) {
                  return navigate('/')
                }
                setError(res.msg)
              })
              .catch(() => {
                setError('Ocurrio un error')
              })
          }}
        >
          {({ isValid, errors, touched }) => (
            <Form>
              <label>Nombre de usuario</label>
              {errors.username && touched.username ? (
                <p className='error'>{errors.username}</p>
              ) : null}
              <Field
                name='username'
                placeholder='Ingrese nombre de usuario'
                type='text'
              />
              <label>Correo electronico</label>
              {errors.email && touched.email ? (
                <p className='error'>{errors.email}</p>
              ) : null}
              <Field
                name='email'
                placeholder='Ingrese un correo electronico'
                type='email'
              />
              <label>Contraseña</label>
              {errors.password && touched.password ? (
                <p className='error'>{errors.password}</p>
              ) : null}
              <Field
                name='password'
                placeholder='Ingrese una contraseña'
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
        <Link to={'/'}>Iniciar sesion</Link>
      </div>
    </div>
  )
}

export default Register
