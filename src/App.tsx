import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/header';
import Top from '../src/pages/top';
import Counter from '../src/pages/counter';
import ReactQuery from '../src/pages/react_query';

const App = (): JSX.Element => {
  return (
    <>
      <Header />
      <BrowserRouter>
        <Routes>
          <Route index element={<Top />} />
          <Route path="counter" element={<Counter />} />
          <Route path="react_query" element={<ReactQuery />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
