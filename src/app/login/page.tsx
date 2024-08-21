"use client";

import { useState } from 'react';
import { loginUser } from '@/services/users_login';
import router from 'next/router';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setMessage(null);
    setLoading(true);

    try {
      const user = await loginUser(email, password);
      router.push('/profile');
      console.log('User logged in:', user);
    } catch (err: unknown) {
      if (err instanceof Error)
        setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="container page">
        <div className="row">
          <div className="col-md-6 offset-md-3 col-xs-12">
            <h1 className="text-xs-center">Login</h1>
            <p className="text-xs-center">
              <a href="/register">Need an account?</a>
            </p>
            <ul className="error-messages"></ul>
            <form onSubmit={handleSubmit}>
              <fieldset className="form-group">
                <input
                  name="email"
                  className="form-control form-control-lg"
                  type="text"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)} />
              </fieldset>

              <fieldset className="form-group">
                <input
                  name="password"
                  className="form-control form-control-lg"
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)} />
              </fieldset>
              <button type="submit" className="btn btn-lg btn-primary pull-xs-right">Login</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
