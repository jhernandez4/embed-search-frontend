import { useState } from 'react'
import './App.css'
import { Search } from 'lucide-react'

function App() {
  return (
    <div className="users-page">
      <h1>Users</h1>
      <div className="user-search-bar">      
        <Search/>
        <input className="user-search-input" placeholder='Enter a username'/>
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
