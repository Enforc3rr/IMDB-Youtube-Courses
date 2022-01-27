function VideoDetailsCard() {
  return (
    <div className="row">
      <div className="col-sm-12 col-lg-4 col-md-6">
        <div className="card shadow m-3">
          <div className="card-header text-center">
            <img
              src="https://mdbootstrap.com/img/new/standard/nature/111.webp"
              alt="#"
              href="thumbnail"
              className="img-fluid"
            />
          </div>
          <div className="card-body text-center">
            <h4 className="card-title">Title</h4>
          </div>
          <div className="card-body">
            <p className="card-text">
              <ul>
                <li>
                  <p>By : </p>
                </li>
                <li>
                  <p>Category : </p>
                </li>
                <li>
                  <p>Score : </p>
                </li>
              </ul>
            </p>
          </div>
          <div className="card-footer text-center">
            <button type="button" className="btn btn-primary">
              Video
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default VideoDetailsCard;
