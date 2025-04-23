import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  return (
    <div className="users-page">
      <h1>Users</h1>
      <div className="user-search-bar">      
        <input placeholder='Enter a username'/>
      </div>
      <ul className="user-list">
        <li>Example item</li>
      </ul>
    </div>
  )
}

export default App
