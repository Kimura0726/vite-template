import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/header';
import Top from '../src/pages/top';
import Counter from '../src/pages/counter';
import ReactQuery from '../src/pages/react_query';
import Draftjs from '../src/pages/draftjs';
import DraftjsRead from '../src/pages/draftjsRead';

const App = (): JSX.Element => {
  return (
    <>
      <Header />
      <BrowserRouter>
        <Routes>
          <Route index element={<Top />} />
          <Route path="counter" element={<Counter />} />
          <Route path="react_query" element={<ReactQuery />} />
          <Route path="draftjs" element={<Draftjs />} />
          <Route path="draftjsRead" element={<DraftjsRead />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
