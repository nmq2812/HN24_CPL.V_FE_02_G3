import Link from "next/link";

export default function HomeTags() {
    return (
        <div className="col-md-3">
            <div className="sidebar">
                <p>Popular Tags</p>

                <div className="tag-list">
                    <Link href="" className="tag-pill tag-default">
                        programming
                    </Link>
                    <Link href="" className="tag-pill tag-default">
                        javascript
                    </Link>
                    <Link href="" className="tag-pill tag-default">
                        emberjs
                    </Link>
                    <Link href="" className="tag-pill tag-default">
                        angular
                    </Link>
                    <Link href="" className="tag-pill tag-default">
                        react
                    </Link>
                    <Link href="" className="tag-pill tag-default">
                        mean
                    </Link>
                    <Link href="" className="tag-pill tag-default">
                        node
                    </Link>
                    <Link href="" className="tag-pill tag-default">
                        rails
                    </Link>
                </div>
            </div>
        </div>
    );
}
