import { useEffect, useState } from 'react'
import './App.css'
import { Search, X } from 'lucide-react'
import axios from 'axios';
import UserProfileCard from './components/UserProfileCard/UserProfileCard';
import ErrorMessage from './components/ErrorMessage/ErrorMessage';

function App() {
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const [value, setValue] = useState("");
  const [usersList, setUsersList] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get(`${backendUrl}/users`);
        setUsersList(response.data);
        console.log(response.data);
      } catch(error) {
        setError(error?.response?.data?.message || 'Failed to fetch users')
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchUsers();
  }, [])

  return (
    <div className="users-page">
      <h1>Users</h1>
      <div className="user-search-section">
        <div className="user-search-bar">
          <Search/>
          <input
          value={value}
          onChange={(e) => setValue(e.target.value)}
          className="user-search-input"
          placeholder='Enter a username'
          />
        </div>
        <button className="clear-input-button"><X/></button>
        <button>Search</button>
      </div>

      {error && (
        <div className="user-search-error">
          <ErrorMessage message={error}/>
        </div>
      )}

      <ul className="user-list">
        <UserProfileCard/>
      </ul>
    </div>
  )
}

export default App
