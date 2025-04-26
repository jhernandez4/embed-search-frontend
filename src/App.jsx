import { useEffect, useState } from 'react'
import './App.css'
import { Search, X } from 'lucide-react'
import axios from 'axios';

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
      <ul className="user-list">
        <li className="user-list-item">
          <img className="user-profile-picture" src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"/>
          <div className="user-info">
            <p>Username</p>
            <small>Bio</small>
          </div>
        </li>
      </ul>
    </div>
  )
}

export default App
