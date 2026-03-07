import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { AuthProvider } from './Context/AuthContext'
import Header from './Components/Header'
import Footer from './Components/Footer'
import Home from './Pages/Home'
import Idea from './Pages/Idea'
import About from './Pages/About'
import Contact from './Pages/Contact'
import SignIn from './Pages/SignIn'
import SignUp from './Pages/SignUp'
import Dashboard from './Pages/Dashboard'
import Profile from './Pages/Profile'

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/idea" element={<Idea />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
        <Footer />
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App
