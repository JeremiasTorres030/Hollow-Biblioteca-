import { useGetAllBooksQuery } from '../../features/libros/libro-api-slice'
import FileUploader from '../../components/FileUploader'
import Barra from '../../components/Barra'
import BookCard from '../../components/BookCard'
import { useState } from 'react'

interface data {
  title: string
  id: number
  thumbnail: string
}

const Libros = () => {
  const { data, refetch } = useGetAllBooksQuery()

  const [FormFileUploader, setFormFileUploader] = useState<boolean>(false)

  return (
    <div className='Libros'>
      <h1>Biblioteca</h1>
      <Barra />
      <div className='lista'>
        <div className='cartaDeSubida'>
          {FormFileUploader ? (
            <div className='opcionesDeCarta'>
              <FileUploader
                reFetch={refetch}
                FormFileUploader={FormFileUploader}
                setFormFileUploader={setFormFileUploader}
              />
            </div>
          ) : (
            <button
              onClick={() => {
                setFormFileUploader(!FormFileUploader)
              }}
            >
              + Añadir libro
            </button>
          )}
        </div>
        {data &&
          data?.map((data: data) => {
            return (
              <BookCard
                key={data.id}
                data={data}
                reFetch={refetch}
              />
            )
          })}
      </div>
      <div className='espacio'></div>
    </div>
  )
}

export default Libros
