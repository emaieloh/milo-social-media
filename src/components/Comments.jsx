import React, { useContext, useState } from "react";
import MyContext from "../MyContext";
import { Card, Accordion, ListGroup } from "react-bootstrap";
import Comment from "./Comment";
import CommentsModal from "./CommentsModal";

const Comments = ({ postId, commentsLength }) => {
  const { comments, setComments } = useContext(MyContext);
  const [commentsModal, setCommentsModal] = useState(false);
  const [commentContent, setCommentContent] = useState("");

  const showModal = () => setCommentsModal(true);
  const hideModal = () => setCommentsModal(false);

  const postComments = comments.map((comment) => {
    const { _id, user, content, post_id, createdAt } = comment;

    return postId === post_id ? (
      <Comment
        key={_id}
        commentUser={user}
        commentContent={content}
        createdAt={createdAt}
      />
    ) : (
      ""
    );
  });

  return (
    <Card.Footer>
      <Card.Text className="fst-italic text-primary d-flex justify-content-between">
        <span className="smaller add-comment" onClick={showModal}>
          Add comment
        </span>
        <span className="smaller">Comments: {commentsLength}</span>
      </Card.Text>
      <Accordion>
        <Accordion.Item eventKey="0">
          <Accordion.Header>
            <span className="fst-italic text-primary smaller">
              Show/Hide comments
            </span>
          </Accordion.Header>
          <Accordion.Body>
            <ListGroup>
              {!commentsLength ? "No comment" : postComments}
            </ListGroup>
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
      <CommentsModal
        postId={postId}
        commentsModal={commentsModal}
        hideModal={hideModal}
        commentContent={commentContent}
        setCommentContent={setCommentContent}
        comments={comments}
        setComments={setComments}
      />
    </Card.Footer>
  );
};

export default Comments;
