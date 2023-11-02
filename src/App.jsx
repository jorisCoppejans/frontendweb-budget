// src/App.jsx
import TransactionList from './components/transactions/TransactionList';
import PlacesList from './components/places/PlacesList';
import { ThemeContext, themes } from './context/Theme.context';
import { useContext } from 'react';
import { IoSunny, IoMoonSharp } from 'react-icons/io5';

function App() {
  return (
    <div className='App'>
      <Transaction />
    </div>
  );
}

export default App;
