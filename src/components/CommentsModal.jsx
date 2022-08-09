import React, { useState, useContext } from "react";
import MyContext from "../MyContext";
import { Modal, Form, FloatingLabel, Button, Alert } from "react-bootstrap";
import axios from "axios";

const CommentsModal = (props) => {
  const {
    postId,
    commentsModal,
    hideModal,
    commentContent,
    setCommentContent,
    comments,
    setComments,
  } = props;

  const [commentAlert, setCommentAlert] = useState(false);
  const { user } = useContext(MyContext);

  const submitHandler = async (e) => {
    e.preventDefault();

    if (!commentContent) {
      setCommentAlert(true);
    } else {
      const newComment = await axios.post(
        "http://localhost:8080/comments/add",
        {
          user: `${user.firstName} ${user.lastName}`,
          content: commentContent,
          post_id: postId,
        }
      );
      setComments([...comments, newComment]);
      hideModal();
    }
  };

  return (
    <Modal show={commentsModal} onHide={hideModal} backdrop="static" centered>
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">Comment</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group>
            <FloatingLabel controlId="floatingComment" label="Comment">
              <Form.Control
                as="textarea"
                rows={5}
                value={commentContent}
                onChange={(e) => setCommentContent(e.target.value)}
                placeholder="Comment"
              />
            </FloatingLabel>
          </Form.Group>
          <Alert
            show={commentAlert}
            variant="danger"
            onClose={() => setCommentAlert(false)}
            dismissible
          >
            <div>Comment field can't be empty</div>
          </Alert>
        </Form>
      </Modal.Body>
      <Modal.Footer className="text-end">
        <Button type="submit" onClick={submitHandler}>
          Submit
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default CommentsModal;
