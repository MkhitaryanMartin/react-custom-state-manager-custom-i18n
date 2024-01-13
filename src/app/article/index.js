import { memo, useCallback, useMemo, useState } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import useStore from "../../hooks/use-store";
import useTranslate from "../../hooks/use-translate";
import useInit from "../../hooks/use-init";
import PageLayout from "../../components/page-layout";
import Head from "../../components/head";
import Navigation from "../../containers/navigation";
import Spinner from "../../components/spinner";
import ArticleCard from "../../components/article-card";
import LocaleSelect from "../../containers/locale-select";
import TopHead from "../../containers/top-head";
import { useDispatch, useSelector } from "react-redux";
import useSelfSelector from "../../hooks/use-selector";
import shallowequal from "shallowequal";
import articleActions from "../../store-redux/article/actions";
import commentsActions from "../../store-redux/comments/actions";
import CommentsList from "../../containers/comments-list";
import CommentForm from "../../components/comment-form";
import CommentsBox from "../../components/comments-box";

function Article() {
  const store = useStore();
  const { lang } = useTranslate();
  const [formIsVisible, setFormIsVisible] = useState(true);
  const location = useLocation();

  const dispatch = useDispatch();
  // Параметры из пути /articles/:id

  const params = useParams();

  useInit(() => {
    //store.actions.article.load(params.id);
    dispatch(articleActions.load(params.id));
    dispatch(commentsActions.load(params.id));
  }, [params.id, lang]);

  const select = useSelector(
    (state) => ({
      article: state.article.data,
      commentsCount: state.comments.count,
      waiting: state.article.waiting,
    }),
    shallowequal
  ); // Нужно указать функцию для сравнения свойства объекта, так как хуком вернули объект

  const selfSelect = useSelfSelector((state) => ({
    exists: state.session.exists,
  }));

  const { t } = useTranslate();

  const callbacks = {
    // Добавление в корзину
    addToBasket: useCallback(
      (_id) => store.actions.basket.addToBasket(_id),
      [store]
    ),
    onSubmitComment: useCallback(
      (data) => {
        dispatch(commentsActions.add(data, "article"));
      },
      [dispatch]
    ),
    onChangeFormVisibility: useCallback(
      (state) => {
        setFormIsVisible(state);
      },
      [setFormIsVisible]
    ),
  };

  return (
    <PageLayout>
      <TopHead />
      <Head title={select.article.title}>
        <LocaleSelect />
      </Head>
      <Navigation />
      <Spinner active={select.waiting}>
        <ArticleCard
          article={select.article}
          onAdd={callbacks.addToBasket}
          t={t}
        />
      </Spinner>
      <CommentsBox title={`Комментарии (${select.commentsCount})`}>
        <CommentsList onChangeVisible={callbacks.onChangeFormVisibility} />
        {formIsVisible && selfSelect.exists && (
          <CommentForm
            parentId={params.id}
            labelArea={"Новый комментарий"}
            onSubmit={callbacks.onSubmitComment}
          >
            <button type="submit">Отправить</button>
          </CommentForm>
        )}
        {formIsVisible && !selfSelect.exists && (
          <div className="CommentsBox-link">
            <Link to={"/login"} state={{ back: location.pathname }}>
              Войдите
            </Link>
            , чтобы иметь возможность комментировать
          </div>
        )}
      </CommentsBox>
    </PageLayout>
  );
}

export default memo(Article);
