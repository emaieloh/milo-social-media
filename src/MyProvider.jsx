import React, { useState, useEffect } from "react";
import MyContext from "./MyContext";
import axios from "axios";

const MyProvider = (props) => {
  const [isLoggedIn, setIsLoggedIn] = useState(
    localStorage.getItem("user") ? true : false
  );
  const [user, setUser] = useState(
    localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : {}
  );
  const [posts, setPosts] = useState([]);
  const [liked, setLiked] = useState(false);
  const [comments, setComments] = useState([]);
  const [likes, setLikes] = useState([]);

  const dateFormat = (date) => {
    const months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];

    const padTo2Digits = (num) => {
      return num.toString().padStart(2, "0");
    };

    const formattedDate = [
      months[date.getMonth()],
      padTo2Digits(date.getDate()),
      date.getFullYear(),
    ].join("-");

    let hours = date.getHours();
    const minutes = date.getMinutes();
    const midnight = hours >= 12 ? "PM" : "AM";
    hours = hours % 12;
    hours = hours ? hours : 12;

    const formattedTime = `${padTo2Digits(hours)}:${padTo2Digits(
      minutes
    )} ${midnight}`;

    return `${formattedDate} ${formattedTime}`;
  };

  const state = {
    isLoggedIn,
    user,
    posts,
    liked,
    comments,
    likes,
    setIsLoggedIn,
    setUser,
    setPosts,
    setLiked,
    setComments,
    dateFormat,
  };

  useEffect(() => {
    (async () => {
      const { data: allPosts } = await axios("http://localhost:8080/posts/all");
      allPosts.map((post) => {
        post.user = `${post.user.firstName} ${post.user.lastName}`;
        post.comments = post.comments.length;
        post.likes = post.likes.length;
        post["imageUrl"] = post.image.url;
        post["imageFilename"] = post.image.filename;
        return allPosts;
      });
      setPosts([...allPosts]);

      const { data: allComments } = await axios(
        "http://localhost:8080/comments/all"
      );
      setComments([...allComments]);

      const { data: allLikes } = await axios("http://localhost:8080/likes/all");
      setLikes([...allLikes]);
    })();
  }, [posts.length, liked, comments.length]);

  return (
    <MyContext.Provider value={state}>{props.children}</MyContext.Provider>
  );
};

export default MyProvider;
