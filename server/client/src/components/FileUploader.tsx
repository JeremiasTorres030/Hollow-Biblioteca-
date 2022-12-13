import { Field, Form, Formik } from 'formik'
import { useState } from 'react'
import axios from 'axios'
import { useAppSelector } from '../app/hooks'
import * as Yup from 'yup'

interface FileUploaderParams {
  reFetch: () => void
  FormFileUploader: boolean
  setFormFileUploader: React.Dispatch<React.SetStateAction<boolean>>
}

interface Values {
  title: string
  user_id: number
}

const FileUploader = ({
  reFetch,
  FormFileUploader,
  setFormFileUploader,
}: FileUploaderParams) => {
  const [archivo, setArchivo] = useState<File | null | undefined>(null)
  const [error, setError] = useState<string>('Enviar')
  const [nombreArchivo, setNombreArchivo] = useState<string | undefined>('')

  const userAndToken = useAppSelector((state) => {
    return {
      user: state.user.user,
      token: state.user.token,
    }
  })

  const ValidationSchema = Yup.object().shape({
    title: Yup.string().required(),
    thumbnail: Yup.string(),
  })

  return (
    <div className='FileUploader'>
      <h1>Subir archivo</h1>
      <Formik
        initialValues={{
          title: '',
          user_id: userAndToken.user.id,
        }}
        validationSchema={ValidationSchema}
        onSubmit={async (values: Values) => {
          setError('')
          await axios
            .post(
              `${import.meta.env.VITE_API_URL}libros/`,
              {
                ...values,
                file: archivo,
              },
              {
                headers: {
                  Authorization: `Token ${userAndToken.token}`,
                  'Content-Type': 'multipart/form-data',
                },
              }
            )
            .then((res) => {
              if (res.data.ok) {
                reFetch()
                return setFormFileUploader(!FormFileUploader)
              }
            })
            .catch(() => {
              setError('Hubo un error al subir el archivo')
            })
        }}
      >
        {({ isSubmitting, isValid }) => (
          <Form>
            <label>Titulo</label>
            <Field
              name='title'
              placeholder='Introduzca un titulo'
              type='text'
            />
            <label>Imagen de portada</label>
            <Field
              placeholder='Coloque una url'
              name='thumbnail'
              type='text'
            />

            <label>Libro</label>
            <label className='inputFile'>
              {nombreArchivo ? nombreArchivo : 'Seleccione un archivo'}

              <input
                onChange={(e) => {
                  setError('')
                  if (e.target.files?.item(0)?.size! > 50000000) {
                    return setError(
                      'El archivo es demasiado grande (limite maximo de 50mb).'
                    )
                  }
                  setArchivo(e.target.files?.item(0))
                  setNombreArchivo(e.target.files?.item(0)?.name)
                }}
                type='file'
                accept='application/pdf'
                required
              />
            </label>
            <button
              type='submit'
              disabled={
                (archivo === null && isValid) ||
                isSubmitting ||
                !isValid ||
                error.length > 0
              }
            >
              {isSubmitting ? 'Subiendo..' : error ? error : 'Enviar'}
            </button>
          </Form>
        )}
      </Formik>
      <button
        className='closeButtonUploader'
        onClick={() => {
          setFormFileUploader(!FormFileUploader)
        }}
      >
        Cerrar
      </button>
    </div>
  )
}

export default FileUploader
