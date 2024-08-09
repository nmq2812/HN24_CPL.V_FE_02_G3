export default function NewArticle() {
  return (
    <div className="editor-page">
      <div className="container page">
        <div className="row">
          <div className="col-md-10 offset-md-1 col-xs-12">
            <form>
              <fieldset className="form-group">
                <input
                  type="text"
                  name="articleTitle"
                  className="form-control form-control-lg"
                  placeholder="Article Title"
                  defaultValue=""
                />
              </fieldset>
              <fieldset className="form-group">
                <input
                  type="text"
                  name="description"
                  className="form-control"
                  placeholder="What's this article about?"
                  defaultValue=""
                />
              </fieldset>
              <fieldset className="form-group">
                <textarea
                  className="form-control"
                  rows={8}
                  name="body"
                  placeholder="Write your article (in markdown)"
                ></textarea>
              </fieldset>
              <fieldset className="form-group">
                <input
                  type="text"
                  name="tags"
                  className="form-control"
                  placeholder="Enter tags"
                />
                <div className="tag-list"></div>
              </fieldset>
              <button
                className="btn btn-lg pull-xs-right btn-primary"
                type="button"
              >
                Publish Article
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
