interface BookCardParams {
  data: {
    title: string
    id: number
    thumbnail: string
  }
  setEditBook: React.Dispatch<React.SetStateAction<boolean>>
  editBook: boolean
  setDeleteBook: React.Dispatch<React.SetStateAction<boolean>>
  deleteBook: boolean
}
const BookCardOptions = ({
  data,
  setEditBook,
  editBook,
  deleteBook,
  setDeleteBook,
}: BookCardParams) => {
  return (
    <>
      <button
        className='editButton'
        onClick={() => {
          setEditBook(!editBook)
        }}
      >
        Editar libro
      </button>
      <button
        className='deleteButton'
        onClick={() => {
          setDeleteBook(!deleteBook)
        }}
      >
        Eliminar
      </button>
      <button
        className='closeButton'
        onClick={() => {
          document
            .getElementById(`carta${data.id}`)
            ?.classList.remove('opcionesDeCarta')
          document.getElementById(`carta${data.id}`)?.classList.add('ocultar')
        }}
      >
        Cerrar
      </button>
    </>
  )
}

export default BookCardOptions
