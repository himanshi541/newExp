import React from "react";
const NewsItem = (props) => {
  let { title, description, imageurl, newsurl, author, publishdate, source } =
    props;
  return (
    <div>
      <div className="card">
        <div
          className="spanclass"
          style={{
            display: "flex",
            justifyContent: "flex-end",
            position: "absolute",
            right: "0",
          }}
        >
          <span className="badge rounded-pill bg-danger">{source}</span>
        </div>
        <img
          src={
            !imageurl
              ? "https://techcrunch.com/wp-content/uploads/2025/02/GettyImages-2199793091.jpg?w=1024"
              : imageurl
          }
          className="card-img-top"
          alt="..."
        />
        <div className="card-body">
          <h5 className="card-title">{title}</h5>
          <p className="card-text">{description}</p>
          <p>
            <small className="text-body-secondary">
              By {author}on {publishdate}
            </small>
          </p>
          <a
            href={newsurl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-primary"
          >
            Read More
          </a>
        </div>
      </div>
    </div>
  );
};

export default NewsItem;
