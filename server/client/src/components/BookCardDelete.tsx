import { useDeleteBookMutation } from '../features/libros/libro-api-slice'

interface BookCardParams {
  data: {
    title: string
    id: number
    thumbnail: string
  }
  reFetch: () => void
  setDeleteBook: React.Dispatch<React.SetStateAction<boolean>>
  deleteBook: boolean
}

const BookCardDelete = ({
  data,
  reFetch,
  deleteBook,
  setDeleteBook,
}: BookCardParams) => {
  const [deleteBookAction, { isLoading }] = useDeleteBookMutation()

  return (
    <>
      <p>
        Eliminar el libro <strong>{data.title}</strong>?
      </p>
      <button
        onClick={(e) => {
          deleteBookAction(data.id)
            .unwrap()
            .then((res) => {
              if (res.ok) {
                reFetch()
                return setDeleteBook(!deleteBook)
              }
            })
        }}
        disabled={isLoading}
      >
        Aceptar
      </button>
      <button
        onClick={() => {
          setDeleteBook(!deleteBook)
        }}
      >
        Cancelar
      </button>
    </>
  )
}

export default BookCardDelete
