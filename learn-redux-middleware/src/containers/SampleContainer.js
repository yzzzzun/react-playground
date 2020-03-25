import { getPost, getUsers } from "../modules/sample";
import React from "react";
import { connect } from "react-redux";
import Sample from "../components/Sample";
const { useEffect } = React;

const SampleContainer = ({
  getPost,
  getUsers,
  post,
  users,
  loadingPost,
  loadingUsers
}) => {
  useEffect(() => {
    getPost(1);
    getUsers();
  }, [getPost, getUsers]);
  return (
    <Sample
      post={post}
      users={users}
      loadPost={loadingPost}
      loadingUsers={loadingUsers}
    />
  );
};

export default connect(
  ({ sample }) => ({
    post: sample.post,
    users: sample.users,
    loadingPost: sample.loadingPost,
    loadingUsers: sample.loadingUsers
  }),
  { getPost, getUsers }
)(SampleContainer);
