import Link from "next/link";

interface HeaderProps {
    state: string;
}

export default function Header({ state }: HeaderProps) {
    return (
        <nav className="navbar navbar-light">
            <div className="container">
                <Link className="navbar-brand" href="#">
                    conduit
                </Link>
                <ul className="nav navbar-nav pull-xs-right">
                    <li className="nav-item">
                        <Link className="nav-link active" href="/">
                            Home
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" href="/">
                            <i className="ion-compose"></i>&nbsp;New Article
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" href="">
                            <i className="ion-gear-a"></i>&nbsp;Settings
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link href="/login" className="nav-link">
                            Login {state}
                        </Link>
                    </li>
                </ul>
            </div>
        </nav>
    );
}
