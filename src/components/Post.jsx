import React, { useContext } from "react";
import MyContext from "../MyContext";
import { Card, CloseButton } from "react-bootstrap";
import { BsHandThumbsUp, BsHandThumbsUpFill } from "react-icons/bs";
import Comments from "./Comments";

const Post = (props) => {
  const {
    id,
    userName,
    content,
    imageUrl,
    comments,
    likesLength,
    createdAt,
    deletePost,
    fullName,
    likePost,
  } = props;

  const { dateFormat, user, likes } = useContext(MyContext);
  const newDate = new Date(createdAt);
  const dateCreated = dateFormat(newDate);

  const closeButton =
    fullName === userName ? (
      <CloseButton id={id} onClick={deletePost} />
    ) : (
      <CloseButton disabled />
    );

  const userLiked = likes.filter(
    (like) => like.userId === user._id && like.postId === id
  );

  const likeButton = !userLiked.length ? (
    <BsHandThumbsUp className="align-baseline like" onClick={likePost} />
  ) : (
    <BsHandThumbsUpFill className="align-baseline like" onClick={likePost} />
  );

  return (
    <Card className="post-cards mx-auto mt-5">
      <div className="d-flex justify-content-between p-1">
        <span>{closeButton}</span>
        <span className="fst-italic smaller">{dateCreated}</span>
      </div>

      <Card.Img
        variant="top"
        className="img-fluid img-thumbnail"
        src={imageUrl}
      />
      <Card.Header>
        <Card.Text className="d-flex justify-content-between">
          <span className="fst-italic fw-bold">{userName}</span>
          <span>
            {likeButton} {likesLength}
          </span>
        </Card.Text>
      </Card.Header>
      <Card.Body>
        <Card.Text>{content}</Card.Text>
      </Card.Body>
      <Comments postId={id} commentsLength={comments} />
    </Card>
  );
};

export default Post;
