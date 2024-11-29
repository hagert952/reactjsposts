import Navbar from '../Navbar/Navbar';
import { Outlet } from 'react-router-dom';

export default function Layout() {
  return (<>
    {/* <h1>Layout</h1> */}
  <Navbar/>
    <div className="container mx-auto">

    <Outlet/>
    </div>
 
  </>
  )
}
