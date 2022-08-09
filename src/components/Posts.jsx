import React from "react";
import { Container } from "react-bootstrap";
import Post from "./Post";
import axios from "axios";

const Posts = ({ user, posts, setPosts, liked, setLiked }) => {
  const { firstName, lastName } = user;
  const postsCopy = [...posts];

  const postCards = posts.map((post) => {
    const {
      _id,
      content,
      imageUrl,
      imageFilename,
      comments,
      likes,
      createdAt,
    } = post;

    const deletePost = async (e) => {
      if (e.target.id === _id) {
        postsCopy.splice(postsCopy.indexOf(post), 1);
      }

      const filename = imageFilename.split("/");
      await axios.delete(
        `https://milo-social-media.herokuapp.com/posts/delete/${_id}/${filename[1]}`
      );
      setPosts([...postsCopy]);
    };

    const likePost = async () => {
      await axios.post(
        `https://milo-social-media.herokuapp.com/likes/like/${_id}/${user._id}`
      );
      if (!liked) {
        setLiked(true);
      } else {
        setLiked(false);
      }
    };

    return (
      <Post
        key={_id}
        id={_id}
        userName={post.user}
        content={content}
        imageUrl={imageUrl}
        comments={comments}
        likesLength={likes}
        createdAt={createdAt}
        deletePost={deletePost}
        fullName={`${firstName} ${lastName}`}
        likePost={likePost}
      />
    );
  });

  return <Container className="d-flex flex-wrap">{postCards}</Container>;
};

export default Posts;
