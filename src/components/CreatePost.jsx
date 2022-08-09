import React, { useContext, useState } from "react";
import MyContext from "../MyContext";
import { Form, FloatingLabel, Container, Button } from "react-bootstrap";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const CreatePost = ({ posts, setPosts }) => {
  const {
    user: { _id },
  } = useContext(MyContext);

  const [content, setContent] = useState("");
  const [image, setImage] = useState("");

  const navigate = useNavigate();

  const submitPost = async (e) => {
    e.preventDefault();

    const data = new FormData();
    data.append("user", _id);
    data.append("content", content);
    data.append("image", image);

    const newPost = await axios.post(
      "https://milo-social-media.herokuapp.com/posts/add",
      data
    );
    setPosts([newPost, ...posts]);
    navigate("/");
  };

  return (
    <Container>
      <Form onSubmit={submitPost}>
        <Form.Control
          type="file"
          onChange={(e) => setImage(e.target.files[0])}
        />
        <FloatingLabel
          controlId="floatingPost"
          label="Content"
          className="mb-3"
        >
          <Form.Control
            as="textarea"
            style={{ height: "120px" }}
            placeholder="Content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
        </FloatingLabel>
        <Button type="submit">Post</Button>
      </Form>
    </Container>
  );
};

export default CreatePost;
