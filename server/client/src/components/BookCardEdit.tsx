import { Formik, Field, Form } from 'formik'
import { useEditBookMutation } from '../features/libros/libro-api-slice'
import * as Yup from 'yup'

interface BookCardParams {
  data: {
    title: string
    id: number
    thumbnail: string
  }
  reFetch: () => void
  setEditBook: React.Dispatch<React.SetStateAction<boolean>>
  editBook: boolean
}

const BookCardEdit = ({
  data,
  reFetch,
  editBook,
  setEditBook,
}: BookCardParams) => {
  const [editBookAction] = useEditBookMutation()
  const validationSchema = Yup.object().shape({
    title: Yup.string().required('Ingrese un nuevo título'),
    thumbnail: Yup.string().required('Ingrese una nueva portada'),
  })

  return (
    <>
      <Formik
        initialValues={{
          title: data.title,
          thumbnail: data.thumbnail,
        }}
        onSubmit={(values) => {
          editBookAction({
            id: data.id,
            title: values.title,
            thumbnail: values.thumbnail,
          })
            .unwrap()
            .then((res) => {
              if (res.ok) {
                setEditBook(!editBook)
                document
                  .getElementById(`carta${data.id}`)
                  ?.classList.remove('opcionesDeCarta')
                document
                  .getElementById(`carta${data.id}`)
                  ?.classList.add('ocultar')
                return reFetch()
              }
            })
        }}
        validationSchema={validationSchema}
      >
        {({ isSubmitting, isValid, touched, errors }) => (
          <Form>
            <label>Título nuevo</label>
            {errors.title && touched.title ? <p>{errors.title}</p> : null}
            <Field
              type='text'
              name='title'
              placeholder='Ingrese el nuevo título'
            />
            <label>Nueva portada</label>
            {errors.thumbnail && touched.thumbnail ? (
              <p>{errors.thumbnail}</p>
            ) : null}
            <Field
              type='text'
              name='thumbnail'
              placeholder='Ingrese una nueva portada'
            />
            <button
              type='submit'
              disabled={isSubmitting || !isValid}
            >
              Enviar
            </button>
          </Form>
        )}
      </Formik>
      <button
        onClick={() => {
          setEditBook(!editBook)
        }}
      >
        Cancelar
      </button>
    </>
  )
}

export default BookCardEdit
