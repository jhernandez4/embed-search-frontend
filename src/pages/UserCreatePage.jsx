import { useState } from 'react';
import axios from 'axios';
import "./UserCreatePage.css"
import ErrorMessage from '../components/ErrorMessage/ErrorMessage';

const UserCreatePage = () => {
    const [username, setUsername] = useState('');
    const [bio, setBio] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const backendUrl = import.meta.env.VITE_BACKEND_URL;

    const handleSubmit = async (event) => {
        event.preventDefault();
        setIsLoading(true);
        setErrorMessage('');

        const userData = {
            username,
            bio: bio || null,
        };

        try {
            const response = await axios.post(`${backendUrl}/users`, userData);

            if (response.status === 200) {
                setUsername('');
                setBio('');
                alert('User created successfully!');
            }
        } catch (error) {
            if (error.response) {
                setErrorMessage(error.response.data.detail || 'An error occurred while creating the user.');
            } else if (error.request) {
                setErrorMessage('Network error. Please try again later.');
            } else {
                setErrorMessage('An error occurred. Please try again.');
            }
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="user-create-page">
            <form onSubmit={handleSubmit}>
                <h2>Create New User</h2>
                <div className="form-group">
                    <label htmlFor="username">Username</label>
                    <input
                        className="form-input"
                        type="text"
                        id="username"
                        name="username"
                        value={username}
                        autoComplete="off"
                        autoCorrect="false"
                        onChange={(e) => setUsername(e.target.value)}
                        maxLength={30}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="bio">Bio (Optional)</label>
                    <textarea
                        className="form-input form-textarea"
                        id="bio"
                        name="bio"
                        value={bio}
                        onChange={(e) => setBio(e.target.value)}
                        autoComplete='off'
                        autoCorrect='false'
                    />
                </div>
                {errorMessage && <p className="form-error">
                    <ErrorMessage message={errorMessage}/>
                </p>}
                <button className="form-button" type="submit" disabled={isLoading}>
                    {isLoading ? 'Creating...' : 'Create User'}
                </button>
            </form>
        </div>
    );
};

export default UserCreatePage;
