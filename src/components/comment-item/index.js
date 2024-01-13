import React from "react";
import { cn as bem } from "@bem-react/classname";
import "./style.css";
import { formatDate } from "../../utils/date-format";
import CommentForm from "../comment-form";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

function CommentItem({
  comment,
  opened = {},
  onOpenAnswer,
  onSubmit,
  onCloseAnswer,
  isSession,
  userName,
  level,
  location,
}) {
  const cn = bem("CommentItem");
  const isOpen = opened[comment._id];

  return (
    <div className={cn()}>
      <div className={cn("content")}>
        <div className={cn("header")}>
          <div
            className={`${cn("author")} ${
              userName === comment.author?.profile?.name ? cn("active") : ""
            }`}
          >
            {comment.author?.profile?.name}
          </div>
          <div className={cn("date")}>
            {formatDate(comment.dateCreate, "ru-RU")}
          </div>
        </div>
        <div className={cn("text")}>
          <p>{comment.text}</p>
        </div>
        <div className={cn("actions")}>
          <Link to={"#answerbox"} onClick={() => onOpenAnswer(comment)}>
            Ответить
          </Link>
        </div>
      </div>
      {comment.children?.length > 0 && (
        <div
          className={level < 5 ? cn("children--withMargin") : cn("children")}
        >
          {comment.children.map((child) => (
            <CommentItem
              comment={child}
              key={child._id}
              onOpenAnswer={onOpenAnswer}
              onSubmit={onSubmit}
              opened={opened}
              onCloseAnswer={onCloseAnswer}
              isSession={isSession}
              userName={userName}
              level={level + 1}
              location={location}
            />
          ))}
        </div>
      )}
      {isOpen && isSession && (
        <div id="answerbox" className={cn("container")}>
          <CommentForm
            parentId={comment._id}
            labelArea={"Новый ответ"}
            onSubmit={onSubmit}
            onClose={onCloseAnswer}
          >
            <button type="submit">Отправить</button>
            <button type="reset" onClick={onCloseAnswer}>
              Отмена
            </button>
          </CommentForm>
        </div>
      )}
      {isOpen && !isSession && (
        <div id="answerbox" className={cn("container")}>
          <div className={cn("link")}>
            <Link to={"/login"} state={{ back: location.pathname }}>
              Войдите
            </Link>
            , чтобы иметь возможность ответить.{" "}
            <button onClick={onCloseAnswer}>Отмена</button>
          </div>
        </div>
      )}
    </div>
  );
}

CommentItem.propTypes = {
  comment: PropTypes.shape({
    _id: PropTypes.string,
    author: PropTypes.shape({
      profile: PropTypes.shape({
        name: PropTypes.string,
      }),
    }),
    dateCreate: PropTypes.string,
    text: PropTypes.string,
    children: PropTypes.array,
  }),
  opened: PropTypes.object,
  onOpenAnswer: PropTypes.func,
  onSubmit: PropTypes.func,
  onCloseAnswer: PropTypes.func,
  isSession: PropTypes.bool,
  userName: PropTypes.string,
  level: PropTypes.number,
};

CommentItem.defaultProps = {
  comment: {},
  onOpenAnswer: () => {},
  onSubmit: () => {},
};

export default CommentItem;
