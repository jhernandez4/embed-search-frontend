import "./UserLoaderCard.css";

function UserLoaderCard() {
    return (
        <li className="user-list-item">
            <div className="user-profile-picture skeleton-circle"></div>
            <div className="user-info skeleton-user-info">
                <div className="skeleton-line username-skeleton"></div>
                <div className="skeleton-line bio-skeleton"></div>
            </div>
        </li>
    );
}

export default UserLoaderCard;
