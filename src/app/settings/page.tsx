"use client";

import React, { useEffect, useState } from 'react';
import { putUser } from '@/services/put-user';

const SettingsPage: React.FC = () => {
  const [image, setImage] = useState<string | undefined>(undefined);
  const [username, setUsername] = useState<string | undefined>(undefined);
  const [bio, setBio] = useState<string | undefined>(undefined);
  const [email, setEmail] = useState<string | undefined>(undefined);

  const handleUpdateSettings = async (e: React.FormEvent) => {
    e.preventDefault();
    const userData: { email?: string; username?: string; bio?: string; image?: string  } = {};
    if (image) userData.image = image;
    if (username) userData.username = username;
    if (bio) userData.bio = bio;
    if (email) userData.email = email;

    if (Object.keys(userData).length === 0) {
      console.log('No changes to update.');
      return;
    }
    try {
      await putUser(userData);
      console.log('Settings updated successfully');
      // Bạn có thể thêm thông báo thành công hoặc điều hướng về trang khác sau khi cập nhật thành công
    } catch (error) {
      console.error('Failed to update settings:', error);
      // Hiển thị thông báo lỗi nếu việc cập nhật không thành công
    }

    console.log('Settings updated', { image, username, bio, email });
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
            <form onSubmit={handleUpdateSettings}>
              <fieldset>
                <fieldset className="form-group">
                  <input
                    className="form-control"
                    type="text"
                    placeholder="New URL of profile picture"
                    onChange={(e) => setImage(e.target.value || undefined)} />
                </fieldset>

                <fieldset
                  className="form-group">
                  <input
                    className="form-control form-control-lg"
                    type="text"
                    placeholder="New username"
                    onChange={(e) => setUsername(e.target.value || undefined)} />
                </fieldset>

                <fieldset className="form-group">
                  <textarea
                    className="form-control form-control-lg"
                    rows={8}
                    placeholder="New short bio about you"
                    onChange={(e) => setBio(e.target.value || undefined)}>
                  </textarea>
                </fieldset>

                <fieldset className="form-group">
                  <input
                    className="form-control form-control-lg"
                    type="text"
                    placeholder="New email"
                    onChange={(e) => setEmail(e.target.value || undefined)} />
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
