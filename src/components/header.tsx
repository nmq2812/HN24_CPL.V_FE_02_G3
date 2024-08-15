"use client";
import Link from "next/link";
import { useAuth } from "@/contexts/auth";

interface HeaderProps {
  state: string;
  isAuthenticated: boolean;
}

export default function Header() {
  const { isAuthenticated } = useAuth();
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
          {!isAuthenticated && (
            <li className="nav-item">
              <Link href="/login" className="nav-link">
                Login
              </Link>
            </li>
          )}
        </ul>
      </div>
    </nav>
  );
}
