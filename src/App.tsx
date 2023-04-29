import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Top from '../src/pages/top';
import Counter from '../src/pages/counter';

const App = (): JSX.Element => {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route index element={<Top />} />
          <Route path="counter" element={<Counter />} />
          {/* <Route path="react_query" element={<ReactQuery />} /> */}
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
