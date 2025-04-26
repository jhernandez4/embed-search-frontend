import { useEffect, useRef, useState } from 'react'
import './App.css'
import { Search, X } from 'lucide-react'
import axios from 'axios';
import UserProfileCard from './components/UserProfileCard/UserProfileCard';
import ErrorMessage from './components/ErrorMessage/ErrorMessage';
import UserLoaderCard from './components/UserLoaderCard/UserLoaderCard';

function App() {
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const [value, setValue] = useState("");
  const [usersList, setUsersList] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const searchInputRef = useRef(null);

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
  }, []);

  const handleSearchIconClick = () => {
    if (searchInputRef.current) {
      searchInputRef.current.focus();
    }
  };

  const handleInputClear = () => {
    setValue("");
  }

  return (
    <div className="users-page">
      <h1>Users</h1>
      <div className="user-search-section">
        <div className="user-search-bar">
          <button onClick={handleSearchIconClick} className="user-search-icon user-search-inline">
            <Search/>
          </button>
          <input
          ref={searchInputRef}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          className="user-search-input"
          placeholder='Enter a username'
          />
          <button onClick={handleInputClear} className="clear-input-button user-search-inline">
            <X/>
          </button>
        </div>
        <button>Search</button>
      </div>

      {error && (
        <div className="user-search-error">
          <ErrorMessage message={error}/>
        </div>
      )}
      
      <ul className="user-list">
        {isLoading && (
            [...Array(10)].map((_, index) => (
              <UserLoaderCard key={index}/>
            ))
        )}

        {usersList.map((user) => (
          <UserProfileCard
            key={user.id}
            profile_picture_url={user.profile_picture}
            username={user.username}
            bio={user.bio}
          />
        ))}

      </ul>
    </div>
  )
}

export default App
