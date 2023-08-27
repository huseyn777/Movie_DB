import { PrimeReactProvider } from 'primereact/api';
import MovieTable from './MovieTable';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MovieDetail from './MovieDetail';
import { RecoilRoot } from 'recoil';

function App() {
  return (
    <RecoilRoot>
      <PrimeReactProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<MovieTable />}></Route>
            <Route path="/movieDetail" element={<MovieDetail />} />
          </Routes>
        </BrowserRouter>
      </PrimeReactProvider>
    </RecoilRoot>

  );
}

export default App;
