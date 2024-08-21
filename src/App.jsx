import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Dashboard } from "./components/Dashboard/Dashboard";
import { useEffect, useState } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './Firebase/firebase';
import { Home } from './components/Home/Home';
import { ProtectedRoutes } from './Components/ProtectedRoutes/ProtectedRoutes';

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
    })

    return () => {
      unsubscribe();
    }
  }, [])

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/dashboard" element={<ProtectedRoutes user={user}><Dashboard /></ProtectedRoutes>} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App;
