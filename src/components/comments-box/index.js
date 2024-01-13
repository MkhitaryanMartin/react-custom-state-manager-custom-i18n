import React from "react";
import "./style.css";
import PropTypes from "prop-types";

function CommentsBox({ children, title }) {
  return (
    <div className="CommentsBox">
      <div className="CommentsBox-title">{title}</div>
      {children}
    </div>
  );
}

CommentsBox.propTypes = {
  children: PropTypes.node,
  title: PropTypes.string,
};

export default CommentsBox;
