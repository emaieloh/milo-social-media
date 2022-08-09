import React, { useContext } from "react";
import MyContext from "../MyContext";
import { ListGroup, Row, Col } from "react-bootstrap";

const Comment = ({ commentUser, commentContent, createdAt }) => {
  const { dateFormat } = useContext(MyContext);
  const newDate = new Date(createdAt);
  const dateCreated = dateFormat(newDate);

  return (
    <ListGroup.Item>
      <Row className="fst-italic border-bottom border-light">
        <Col className="fw-bold">{commentUser}</Col>
        <Col className="text-end smaller">{dateCreated}</Col>
      </Row>
      <div className="fs-6">{commentContent}</div>
    </ListGroup.Item>
  );
};

export default Comment;
