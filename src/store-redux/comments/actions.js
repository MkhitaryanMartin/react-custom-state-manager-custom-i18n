export default {
  /**
   * Загрузка комментариев
   * @param id
   * @return {Function}
   */
  load: (id) => {
    return async (dispatch, getState, services) => {
      // Сброс текущих комментов
      dispatch({ type: "comments/load-start" });

      try {
        const res = await services.api.request({
          url: `/api/v1/comments?fields=items(_id,text,dateCreate,author(profile(name)),parent(_id,_type,title),isDeleted),count&limit=*&search[parent]=${id}`,
        });
        // Коммменты успешно загружены
        dispatch({
          type: "comments/load-success",
          payload: { data: res.data.result },
        });
      } catch (e) {
        //Ошибка загрузки
        dispatch({ type: "comments/load-error" });
      }
    };
  },

  add: (data, type) => {
    return async (dispatch, getState, services) => {
      try {
        const res = await services.api.request({
          url: `/api/v1/comments?fields=_id,text,dateCreate,author(profile(name)),parent(_id,_type,title),isDeleted`,
          method: "POST",
          body: JSON.stringify({
            text: data.text,
            parent: { _id: data.parentId, _type: type },
          }),
        });

        //Комммент успешно отправлен
        dispatch({
          type: "comments/add-success",
          payload: { data: res.data.result },
        });
      } catch (e) {
        //Ошибка загрузки
        console.log(e);
        dispatch({ type: "comments/add-error" });
      }
    };
  },
};
