import React from 'react';
// import './styles/globals.css';

function Sidebar() {
  return (
    <div className="sidebar">
      <div className="sidebar-title">General Physics Lab</div>
      <div className="sidebar-elements">
        <div>
          <img src="dashboard-icon.png"></img>
          Dashboard
        </div>
        <div>
          <img src="class-info-icon.png"></img>
          Class Information
        </div>
        <div>
          <img src="notifications-icon.png"></img>
          Notifications
        </div>
        <div>
          <img src="profile-icon.png"></img>
          Profile
        </div>
        <div>
          <img src="settings-icon.png"></img>
          Settings
        </div>
        <div>
          <img src="sign-out-icon.png"></img>
          Sign out
        </div>
      </div>
    </div>
  );
}

export default Sidebar;