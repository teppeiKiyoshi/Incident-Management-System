import React from "react";

const ItemComments = (props) => {
  return (
    <div className="footer-content-comment">
      <div className="content-header">
        <img
          src="https://images.unsplash.com/photo-1533227268428-f9ed0900fb3b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=971&q=80"
          alt="avatar"
          className="comment-avatar"
        />
        <div className="header-info">
          <h4 className="author">{props.details.commentedBy}</h4>
          <p className="reply-date">Replied on {props.details.createdAt}</p>
        </div>
      </div>
      <div className="footer-body">
        <p className="comment-info">{props.details.comment}</p>
      </div>
      {props.details.file.length !== 0 && (
        <div className="comment-images-container">
          <div className="comment-image-container">
            {props.details.file.map((image) => {
              return (
                <div className="comment-image">
                  <img src={image} />
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default ItemComments;
