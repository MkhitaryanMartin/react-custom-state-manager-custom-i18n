/**
 * Утилита для преобразования массива ошибок валидации АПИ в объект,
 * где ключ - это название поля, а значение - массив всех сообщений про ошибку данного поля.
 * Если ошибка общая, то будет по ключу "other"
 * @param issues {Array<{path: string, message: string}>}
 * @return {Record<string, Array<string>}
 */
export default function simplifyErrors(issues = {}) {
  const result = {};
  for (const issue of issues) {
    const key = issue.path.join('.') || 'other';
    if (result[key]) {
      result[key].push(issue.message);
    } else {
      result[key] = [issue.message]
    }
  }
  return result;
}
