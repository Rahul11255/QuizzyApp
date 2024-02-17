import './App.css';
import { Routes, Route } from 'react-router-dom';
import Quiz from './components/Quiz';
import Report from './components/Report';
import { DataProvider } from './UserContext';
import LoginScreen from './components/Login';

function App() {
  return (
    <DataProvider>
      <div className="App">
        <Routes>
          <Route path="/*" element={<LoginScreen />} />
          <Route path="/quiz" element={<Quiz />} />
          <Route path="/report" element={<Report />} />
        </Routes>
      </div>
    </DataProvider>
  );
}

export default App;
