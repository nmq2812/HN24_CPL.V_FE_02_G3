import Link from "next/link";

interface HeaderProps {
  state: string;
  user: boolean;
}

export default function Header({ state, user }: HeaderProps) {
    return (
        <nav className="navbar navbar-light">
            <div className="container">
                <Link className="navbar-brand" href="#">
                    conduit
                </Link>
                <ul className="nav navbar-nav pull-xs-right">
                    <li className="nav-item">
                        <Link className="nav-link" href="/">
                            Home
                        </Link>
                    </li>
                    {user && (
                        <li className="nav-item">
                            <Link className="nav-link" href="/editor">
                                <i className="ion-compose"></i>&nbsp;New Article
                            </Link>
                        </li>
                    )}
                    {user && (
                        <li className="nav-item">
                            <Link className="nav-link" href="">
                                <i className="ion-gear-a"></i>&nbsp;Settings
                            </Link>
                        </li>
                    )}
                    {!user && (
                        <li className="nav-item">
                            <Link href="/login" className="nav-link">
                                Login {state}
                            </Link>
                        </li>
                    )}
                </ul>
            </div>
        </nav>
    );
}
