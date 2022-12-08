import { useParams } from 'react-router-dom'
import Barra from '../../components/Barra'
import { useCloseBookMutation } from '../../features/libros/libro-api-slice'

const Libro = () => {
  const { id } = useParams()
  const [closeBook] = useCloseBookMutation()

  return (
    <div className='Libro'>
      <Barra />
      <iframe
        onLoad={() => {
          if (id !== undefined) {
            closeBook(id)
          }
        }}
        src={`${import.meta.env.VITE_API_URL}pdf/${id}/`}
      ></iframe>
    </div>
  )
}

export default Libro
