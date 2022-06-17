import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Index from './pages/Index';
import Preview from './pages/Preview';

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Index />} />
          <Route path='/preview' element={<Preview />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
