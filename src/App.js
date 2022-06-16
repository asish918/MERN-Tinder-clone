import Dashboard from "./pages/Dashboard";
import OnBoarding from "./pages/Onboarding";
import Home from "./pages/Home";
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import cookies, { useCookies } from 'react-cookie'


const App = () => {
  const[cookies, setCookies, removeCookies] = useCookies(['user'])
  const authToken = cookies.AuthToken;

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        {authToken && <Route path="/dashboard" element={<Dashboard />} />}
        {authToken && <Route path="/onboarding" element={<OnBoarding />} />}
      </Routes>
    </BrowserRouter>
  )
}

export default App;
