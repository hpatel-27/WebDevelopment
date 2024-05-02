import React from 'react';
// import Button from 'react-bootstrap/Button';
import '../css/Profile.css'; // Assuming the Profile will use similar styling to Home

const Profile = () => {
  return (
    <div className='profile-container'>
      <div className='side-bar'>
        {/* This part for the side bar */}
        <button variant="primary" className="new-group-btn">New Group</button>
        <div className="sidebar">
          <div className="site">google.com</div>
          <div className="site">amazon.com</div>
          <div className="site">youtube.com</div>
          <div className="site">discord.com</div>
        </div>
      </div>
      <div className="main-content">
          <h1>Profile</h1>
        <div className="profile-header">
        </div>
        <div className="profile-info">
          <div className="profile-info-section">
            <label>
              User Email:
              <input type="email" placeholder="fake@email.com" className="profile-input" />
            </label>
            <label>
              Username:
              <input type="text" placeholder="fake" className="profile-input" />
            </label>
            <label>
              Password:
              <input type="password" placeholder="********" className="profile-input" />
            </label>
            <button variant="primary" className="update-profile-btn">Update Profile</button>
          </div>
        </div>
        <div className="change-password-section">
          <h2>Change Password</h2>
          <form>
            <label>
              Enter Your Old Password:
              <input type="password" className="password-input" />
            </label>
            <label>
              Enter New Password:
              <input type="password" className="password-input" />
            </label>
            <label>
              Enter New Password Again:
              <input type="password" className="password-input" />
            </label>
            <button variant="info" className="change-password-btn">Change Password</button>
          </form>
      <button variant="primary" className="sign-out-btn">Sign Out</button>
        </div>
        <button variant="secondary" className="main-menu-btn">Main Menu</button>
      </div>
    </div>
  );
};

export default Profile;
