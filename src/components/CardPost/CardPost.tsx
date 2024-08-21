import Link from "next/link";
import { formatDate } from "@/ultis/formatTime";

export default function CardPost (infor: any) {
    <div className="article-preview">
            <div className="article-meta">
              <Link href={`/profile/${infor.author.username}`}>
                <img src={infor.author.image} />
              </Link>
              <div className="info">
                <Link
                  href={`/profile/${infor.author.username}`}
                  className="author"
                >
                  {infor.author.username}
                </Link>
                <span className="date">{formatDate(infor.updatedAt)}</span>
              </div>
              <button className="btn btn-outline-primary btn-sm pull-xs-right">
                <i className="ion-heart"></i> {infor.favoritesCount}
              </button>
            </div>
            <Link href={`article/${infor.slug}`} className="preview-link">
              <h1>{infor.title}</h1>
              <p>{infor.description}</p>
              <span>Read more...</span>
              <ul className="tag-list">
                {/* {infor.tagList.map((tag, i) => (
                  <li className="tag-default tag-pill tag-outline" key={i}>
                    {tag}
                  </li>
                ))} */}
              </ul>
            </Link>
          </div>
}