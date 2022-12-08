import { Outlet } from 'react-router-dom'

const Home = () => {
  return (
    <div
      className='Inicio'
      id='Inicio'
    >
      <Outlet />
    </div>
  )
}

export default Home
