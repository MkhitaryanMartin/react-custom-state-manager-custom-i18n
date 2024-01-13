import React, { useState } from "react";
import { cn as bem } from "@bem-react/classname";
import "./style.css";
import PropTypes from "prop-types";

function CommentForm({ parentId, labelArea, onSubmit, onClose, children }) {
  const cn = bem("CommentForm");
  const [isDisabled, setIsDisabled] = useState(true);

  const onChange = (event) => {
    if (event.target.value.trim()) {
      setIsDisabled(false);
    } else {
      setIsDisabled(true);
    }
  };

  function onSubmitHandler(event) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const data = Object.fromEntries(formData);

    console.log("clicked");

    if (data.answer.trim()) {
      onSubmit({
        parentId,
        text: data?.answer.trim(),
      });
      event.currentTarget.reset();
      onClose && onClose();
      setIsDisabled(true);
    }
  }

  return (
    <form onSubmit={onSubmitHandler} className={cn()}>
      <div className={cn("field")}>
        <label htmlFor="answer" className={cn("label")}>
          {labelArea}
        </label>
        <textarea
          onChange={onChange}
          id="answer"
          name="answer"
          className={cn("area")}
        />
      </div>
      <div className={isDisabled ? cn("actions--disabled") : cn("actions")}>
        {children}
      </div>
    </form>
  );
}

CommentForm.propTypes = {
  parentId: PropTypes.string,
  labelArea: PropTypes.string,
  onSubmit: PropTypes.func,
  onClose: PropTypes.func,
  children: PropTypes.node,
};

CommentForm.defaultProps = {
  onSubmit: () => {},
  onClose: () => {},
};

export default CommentForm;
