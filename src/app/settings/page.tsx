"use client";

import React, { useState } from 'react';

const SettingsPage: React.FC = () => {
  const [image, setImage] = useState('https://api.realworld.io/images/smiley-cyrus.jpeg');
  const [username, setUsername] = useState('');
  const [bio, setBio] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleUpdateSettings = (e: React.FormEvent) => {
    e.preventDefault();
    // Xử lý logic cập nhật thông tin người dùng tại đây
    console.log('Settings updated', { image, username, bio, email, password });
  };

  const handleLogout = () => {
    // Xử lý logic đăng xuất tại đây
    console.log('User logged out');
  };

  return (
    <div className="settings-page">
      <div className="container page">
        <div className="row">
          <div className="col-md-6 offset-md-3 col-xs-12">
            <h1 className="text-xs-center">Your Settings</h1>
            <form>
              <fieldset>
                <fieldset className="form-group">
                  <input
                    className="form-control"
                    type="text"
                    placeholder="URL of profile picture"
                    value="" />
                </fieldset>

                <fieldset
                  className="form-group">
                  <input
                    className="form-control form-control-lg"
                    type="text" placeholder="Your Name"
                    value="" />
                </fieldset>

                <fieldset className="form-group">
                  <textarea
                    className="form-control form-control-lg"
                    rows={8}
                    placeholder="Short bio about you">
                  </textarea>
                </fieldset>

                <fieldset className="form-group">
                  <input
                    className="form-control form-control-lg"
                    type="text"
                    placeholder="Email" />
                </fieldset>

                <fieldset className="form-group">
                  <input
                    className="form-control form-control-lg"
                    type="password"
                    placeholder="Password" />
                </fieldset>
                <button type="submit" className="btn btn-lg btn-primary pull-xs-right">Update Settings</button>
              </fieldset>
            </form>
            <hr />
            <button className="btn btn-outline-danger">Or click here to logout.</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
