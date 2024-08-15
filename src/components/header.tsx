import Link from "next/link";

export default function Header() {
    return (
        <nav className="navbar navbar-light">
            <div className="container">
                <a className="navbar-brand" href="index.html">
                    conduit
                </a>
                <ul className="nav navbar-nav pull-xs-right">
                    <li className="nav-item">
                        <Link href="/" className="nav-link">
                            Home
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link href="/new-article" className="nav-link">
                            New Article
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link href="/settings" className="nav-link">
                            &nbsp;Settings
                        </Link>

                    </li>
                    <li className="nav-item">
                        <Link href="/login" className="nav-link">
                            Login
                        </Link>
                    </li>
                </ul>
            </div>
        </nav>
    );
}
