import React, { memo, useCallback, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import useSelfSelector from "../../hooks/use-selector";
import CommentItem from "../../components/comment-item";
import shallowequal from "shallowequal";
import listToTree from "../../utils/list-to-tree";
import commentsActions from "../../store-redux/comments/actions";
import PropTypes from "prop-types";
import { useLocation } from "react-router-dom";

function CommentsList({ onChangeVisible }) {
  const [openedAnswers, setOpenedAnswers] = useState({});
  const dispatch = useDispatch();
  const location = useLocation();

  const select = useSelector(
    (state) => ({
      comments: listToTree(state.comments.list),
      waiting: state.comments.waiting,
    }),
    shallowequal
  );

  const selfSelect = useSelfSelector((state) => ({
    exists: state.session.exists,
    username: state.session.user?.profile?.name,
  }));

  const callbacks = {
    openAnswerForm: useCallback(
      (comment) => {
        onChangeVisible(false);
        setOpenedAnswers({ [comment._id]: true });
      },
      [setOpenedAnswers, onChangeVisible]
    ),

    closeAnswerForm: useCallback(() => {
      onChangeVisible(true);
      setOpenedAnswers({});
    }, [setOpenedAnswers, onChangeVisible]),

    onSubmitAnswer: useCallback(
      (data) => {
        dispatch(commentsActions.add(data, "comment"));
      },
      [dispatch]
    ),
  };

  return select.comments[0]?.children?.map((item) => (
    <CommentItem
      comment={item}
      key={item._id}
      onOpenAnswer={callbacks.openAnswerForm}
      opened={openedAnswers}
      onCloseAnswer={callbacks.closeAnswerForm}
      onSubmit={callbacks.onSubmitAnswer}
      isSession={selfSelect.exists}
      userName={selfSelect.username}
      level={1}
      location={location}
    />
  ));
}

CommentsList.propTypes = {
  onChangeVisible: PropTypes.func,
};

CommentsList.defaultProps = {
  onChangeVisible: () => {},
};

export default memo(CommentsList);
