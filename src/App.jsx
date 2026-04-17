import { useEffect, useState } from 'react'
import Home from './pages/home/home';
import { Splash } from './components/Splash/Splash';
import './App.css'

function App() {
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setShowSplash(false), 2400);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {showSplash ? <Splash onFinish={() => setShowSplash(false)} /> : <Home />}
    </>
  );
}

export default App
