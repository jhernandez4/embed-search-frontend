import { Trash2 } from "lucide-react";
import "./UserProfileCard.css"

function UserProfileCard({
    profile_picture_url="https://i.imgur.com/vIaC7Uq.png",
    username="DEFAULT_USERNAME",
    bio="Bio",
    handleDelete,
    isLoading
}) {
    return (
        <li className="user-list-item">
          <img className="user-profile-picture" src={profile_picture_url}/>
          <div className="user-info">
            <p>{username}</p>
            <small>{bio}</small>
          </div>
          <button onClick={handleDelete} disabled={isLoading} className="user-delete-button">
            <Trash2/>
          </button>
        </li>
    )
}

export default UserProfileCard;