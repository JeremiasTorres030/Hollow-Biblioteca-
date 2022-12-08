import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import BookCardDelete from './BookCardDelete'
import BookCardEdit from './BookCardEdit'
import BookCardOptions from './BookCardOptions'

interface BookCardParams {
  data: {
    title: string
    id: number
    thumbnail: string
  }
  reFetch: () => void
}

const BookCard = ({ data, reFetch }: BookCardParams) => {
  const [deleteBook, setDeleteBook] = useState<boolean>(false)
  const [editBook, setEditBook] = useState<boolean>(false)
  const navigate = useNavigate()

  return (
    <div
      className='carta'
      onClick={(e) => {
        navigate(`/user/libro/${data.id}`)
      }}
    >
      <div
        className='ocultar'
        id={`carta${data.id}`}
        onClick={(e) => {
          e.stopPropagation()
        }}
      >
        {deleteBook || editBook ? (
          deleteBook ? (
            <BookCardDelete
              data={data}
              reFetch={reFetch}
              setDeleteBook={setDeleteBook}
              deleteBook={deleteBook}
            />
          ) : (
            <BookCardEdit
              data={data}
              reFetch={reFetch}
              editBook={editBook}
              setEditBook={setEditBook}
            />
          )
        ) : (
          <BookCardOptions
            data={data}
            editBook={editBook}
            setEditBook={setEditBook}
            deleteBook={deleteBook}
            setDeleteBook={setDeleteBook}
          />
        )}
      </div>
      <div className='contenidoDeCarta'>
        <p>{data.title}</p>
        <img
          src={
            data.thumbnail ||
            'https://res.cloudinary.com/drifqbdtu/image/upload/v1669833009/Lectura/Libro-Abierto-B%C3%A1sico_nqspcx.jpg'
          }
          onError={({ currentTarget }) => {
            currentTarget.onerror = null
            currentTarget.src =
              'https://res.cloudinary.com/drifqbdtu/image/upload/v1669833009/Lectura/Libro-Abierto-B%C3%A1sico_nqspcx.jpg'
          }}
          alt='Imagen de libro'
          loading='lazy'
        />
        <div className='titleAndOptions'>
          <button
            className='openOptionsButton'
            onClick={(e) => {
              e.stopPropagation()
              document
                .getElementById(`carta${data.id}`)
                ?.classList.remove('ocultar')
              document
                .getElementById(`carta${data.id}`)
                ?.classList.add('opcionesDeCarta')
            }}
            disabled={deleteBook || editBook}
          >
            ...
          </button>
        </div>
      </div>
    </div>
  )
}

export default BookCard
