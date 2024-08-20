"use client";
import Link from "next/link";
import { useAuth } from "@/contexts/auth";

interface HeaderProps {
  state: string;
  isAuthenticated: boolean;
}

export default function Header() {
  const { isAuthenticated, user, login } = useAuth();

  return (
      <nav className="navbar navbar-light">
          <div className="container">
              <Link className="navbar-brand" href="/">
                  conduit
              </Link>
              <ul className="nav navbar-nav pull-xs-right">
                  <li className="nav-item">
                      <Link className="nav-link" href="/">
                          Home
                      </Link>
                  </li>
                  {isAuthenticated && (
                      <li className="nav-item">
                          <Link className="nav-link" href="/editor">
                              <i className="ion-compose"></i>&nbsp;New Article
                          </Link>
                      </li>
                  )}
                  {isAuthenticated && (
                      <li className="nav-item">
                          <Link className="nav-link" href="">
                              <i className="ion-gear-a"></i>&nbsp;Settings
                          </Link>
                      </li>
                  )}
                  {isAuthenticated && (
                      <li className="nav-item">
                          <Link
                              className="nav-link"
                              href={`/profile/${user?.username}`}
                          >
                              <i className="ion-compose"></i>&nbsp;
                              {user?.username}
                          </Link>
                      </li>
                  )}
                  {!isAuthenticated && (
                      <li className="nav-item">
                          <Link href="/login" className="nav-link">
                              Sign in
                          </Link>
                      </li>
                  )}
                  {!isAuthenticated && (
                      <li className="nav-item">
                          <Link href="/signup" className="nav-link">
                              Sign up
                          </Link>
                      </li>
                  )}
              </ul>
          </div>
      </nav>
  );
}
