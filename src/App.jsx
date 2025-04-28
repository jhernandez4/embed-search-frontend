import { useEffect, useRef, useState } from 'react'
import './App.css'
import { Search, X } from 'lucide-react'
import axios from 'axios';
import UserProfileCard from './components/UserProfileCard/UserProfileCard';
import ErrorMessage from './components/ErrorMessage/ErrorMessage';
import UserLoaderCard from './components/UserLoaderCard/UserLoaderCard';
import NoUsersFoundMessage from './components/NoUsersFoundMessage/NoUsersFoundMessage';
import Dropdown from './components/Dropdown/Dropdown';

function App() {
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const [value, setValue] = useState("");
  const [usersList, setUsersList] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isDeleting, setIsDeleting] = useState(false);
  const [deleteError, setDeleteError] = useState(null);

  // For no user found message
  const [searchQuery, setSearchQuery] = useState("");

  // For dropdown
  const [selectedOption, setSelectedOption] = useState('like-search');

  // Search types for backend endpoints
  const options = [
    { value: 'like-search', label: 'Like' },
    { value: 'psql-search', label: 'PSQL' },
    { value: 'tfidf-search', label: 'TF-IDF' },
  ];

  const searchInputRef = useRef(null);

  // Fetch users on page load and input change
  useEffect(() => {
    const fetchUsersOnSearch = async () => {
      try {
        setIsLoading(true);

        let response;

        if (value === "") {
          // Get all users
          response = await axios.get(`${backendUrl}/users`);
        }
        else {
          // Use the selected search type when the input is non-empty
          response = await axios.get(`${backendUrl}/users/${selectedOption}`, {
            params: {
              "username": value 
            }
          });
        }

        setUsersList(response.data);
        console.log(response.data);
        setError(null);
        setSearchQuery(value);
      } catch(error) {
        setError(error?.response?.data?.message || 'Failed to fetch users')
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchUsersOnSearch();
  }, [value])

  const handleSelectChange = (event) => {
    setSelectedOption(event.target.value);
    setValue("");
  };

  const handleOnChange = async (e) => {
    setValue(e.target.value) 
  }

  const handleSearchIconClick = () => {
    if (searchInputRef.current) {
      searchInputRef.current.focus();
    }
  };

  const handleUserDelete = async (userId) => {
    try {
      setIsDeleting(true);  
      setDeleteError(null); 

      const response = await axios.delete(`${backendUrl}/users/${userId}`);
      
      // If the delete operation is successful, remove the user from the usersList
      setUsersList((prevList) => prevList.filter(user => user.id !== userId));
    } catch (error) {
      setDeleteError(error?.response?.data?.message || 'Failed to delete user');
      console.error(error);
    } finally {
      setIsDeleting(false); 
    }
  }

  const handleInputClear = () => {
    setValue("");
  }

  return (
    <div className="users-page">
      <h1>Users</h1>
      <div className="user-search-section">
        <Dropdown
        value={selectedOption}
        options={options}
        onChange={handleSelectChange}
        />
        <div className="user-search-bar">
          <button onClick={handleSearchIconClick} className="user-search-icon user-search-inline">
            <Search/>
          </button>
          <input
          ref={searchInputRef}
          value={value}
          onChange={handleOnChange}
          className="user-search-input"
          placeholder='Enter a username'
          autoComplete='off'
          spellCheck='false'
          />
          <button onClick={handleInputClear} className="clear-input-button user-search-inline">
            <X/>
          </button>
        </div>
      </div>

      <h3>Showing {`${usersList.length}`} results</h3>

      {error && (
        <div className="user-search-message">
          <ErrorMessage message={error}/>
        </div>
      )}
      
      {!error && !isLoading && usersList.length === 0 && (
        <div className="user-search-message">
          <NoUsersFoundMessage name={searchQuery}/>
        </div>
      )}
      
      <ul className="user-list">
        {/* Skeleton loaders for users */}
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
            handleDelete={() => handleUserDelete(user.id)}
            isLoading={isDeleting}
          />
        ))}

      </ul>
    </div>
  )
}

export default App
