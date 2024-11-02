import Home from './components/Home'
import Question1 from './components/Question1'
import { Routes, Route } from 'react-router-dom'

function App() {


  return (
 <>
 <Routes>
  <Route path="/" element={<Home/>} />
  <Route path="/question" element={<Question1/>}/>


 </Routes>
 </>
  )
}

export default App
