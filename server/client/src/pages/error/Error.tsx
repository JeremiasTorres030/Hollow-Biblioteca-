import { Link } from 'react-router-dom'

const Error = () => {
  return (
    <div>
      <h1>Error 404</h1>
      <p>La página no existe</p>
      <Link to='/'>Volver al inicio</Link>
    </div>
  )
}

export default Error
