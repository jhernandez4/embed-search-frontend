import './NoUsersFoundMessage.css';

const NoUsersFoundMessage = ({ name }) => {
  if (!name) return null;

  return (
    <div className="no-users-container">
      <p className="no-users-message">
        No users were found matching the name <strong>{`${name}`}</strong>.
      </p>
    </div>
  );
};

export default NoUsersFoundMessage;
