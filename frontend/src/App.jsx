import { Route, Routes } from "react-router-dom"
import { HomePage, LoginPage, SignUpPage } from "./Pages"


function App() {

  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignUpPage />} />
      </Routes>
    </>
  )
}

export default App
