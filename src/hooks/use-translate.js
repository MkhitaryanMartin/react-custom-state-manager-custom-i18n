import { useCallback, useContext, useEffect, useMemo, useState } from "react";
import { I18nContext } from "../i18n/context";
import useServices from "./use-services";
import shallowEqual from "shallowequal";

/**
 * Хук возвращает функцию для локализации текстов, код языка и функцию его смены
 */
export default function useTranslate() {
  const i18n = useServices().i18n;

  const [state, setState] = useState(() => i18n.getState());

  const unsubscribe = useMemo(() => {
    return i18n.subscribe(() => {
      const newState = i18n.getState();
      setState((prevState) =>
        shallowEqual(prevState, newState) ? prevState : newState
      );
    });
  }, []);

  useEffect(() => unsubscribe, [unsubscribe]);

  return {
    lang: state.locale,
    setLang: (lang) => i18n.setLang(lang),
    t: (text, number, lang) => i18n.translate(lang, text, number),
  };
}
