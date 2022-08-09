import React, { useContext } from "react";
import MyContext from "../MyContext";
import { Navigate, Routes, Route } from "react-router-dom";
import NavigationBar from "./NavigationBar";
import Posts from "./Posts";
import CreatePost from "./CreatePost";

const Homepage = () => {
  const { isLoggedIn, user, posts, setPosts, liked, setLiked } = useContext(
    MyContext
  );

  if (!isLoggedIn) {
    return <Navigate to="/signin" replace={true} />;
  }

  return (
    <div className="homepage px-5">
      <NavigationBar user={user} />
      <Routes>
        <Route
          path="/milo-social-media"
          element={
            <Posts
              user={user}
              posts={posts}
              setPosts={setPosts}
              liked={liked}
              setLiked={setLiked}
            />
          }
        />
        <Route
          path="/create-post"
          element={<CreatePost posts={posts} setPosts={setPosts} />}
        />
      </Routes>
    </div>
  );
};

export default Homepage;
