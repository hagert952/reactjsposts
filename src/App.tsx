
import './App.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Home from './components/Home/Home';
import Layout from './components/Layout/Layout';
import Posts from './components/posts/posts';
import Updateform from './components/updateform/updateform';
const x=createBrowserRouter(
[
{path:"",element:<Layout/>,children:[
  {index :true,element:<Home/> },
  {path:"Home",element:<Home/>}
  ,{path:"/post",element:<Posts/>}
,{path:"/updateform/:postId",element:<Updateform/>}
]


}
]
);
function App() {
  // const [count, setCount] = useState(0)

  return (
    <>
       <RouterProvider router={x}></RouterProvider></>
  )
}

export default App
