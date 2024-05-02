import React from 'react';
// import Button from 'react-bootstrap/Button';
import '../css/Home.css'; // Make sure to import the CSS file

const Home = () => {
  return (
    <div className='home-container'>
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

      {/* This part will be about main component */}
      <div className="main-content">
        <button variant="primary" className="profile-btn">Profile</button>
        <div className="account-management">
          {/* Adding site and clicking on the new account button */}
          <div className="account-header">
            <button variant="light" className="site-name-btn">Google.com</button>
            <button variant="info" className="new-account-btn">New Account</button>
          </div>
          <div className='account'>
            {/* Burner Account info */}
            <div className='account-section burner-account'>
              <form 
                action="/formdata" 
                method="post" 
                className="account-form" 
                encType="multipart/form-data"
              >
                <label>
                  Username:
                  <input type="text" name="burnerUsername" className="input-username" />
                </label>
                <label>
                  Password:
                  <input type="password" name="burnerPassword" className="input-password" />
                </label>
                <label>
                  Notes:
                  <textarea name="burnerNotes" className="input-notes" />
                </label>
                <button type="submit" variant="success" className="save-btn">Save Burner Account</button>
              </form>
            </div>

            <div className='account-section main-account'>
              <form 
                action="/formdata" 
                method="post" 
                className="account-form" 
                encType="multipart/form-data"
              >
                <label>
                  Username:
                  <input type="text" name="mainUsername" className="input-username" />
                </label>
                <label>
                  Password:
                  <input type="password" name="mainPassword" className="input-password" />
                </label>
                <label>
                  Notes:
                  <textarea name="mainNotes" className="input-notes" />
                </label>
                <button type="submit" variant="primary" className="save-btn">Save Main Account</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
