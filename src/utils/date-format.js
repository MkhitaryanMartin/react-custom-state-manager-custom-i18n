export function formatDate(date, locale) {
  //   const months = [
  //     "января",
  //     "февраля",
  //     "марта",
  //     "апреля",
  //     "мая",
  //     "июня",
  //     "июля",
  //     "августа",
  //     "сентября",
  //     "октября",
  //     "ноября",
  //     "декабря",
  //   ];

  //   const newDate = new Date(date);
  //   const day = newDate.getDate();
  //   const monthIndex = newDate.getMonth();
  //   const year = newDate.getFullYear();
  //   const hours = newDate.getHours();
  //   const minutes = newDate.getMinutes();

  //   const month = months[monthIndex];

  //   const formattedDate = `${day} ${month} ${year} в ${hours}:${
  //     minutes < 10 ? "0" : ""
  //   }${minutes}`;

  const newDate = new Date(date);

  let formattedDate = new Intl.DateTimeFormat(locale, {
    hour: "numeric",
    minute: "numeric",
    day: "numeric",
    year: "numeric",
    month: "long",
  }).format(newDate);

  if (locale === "ru-RU") {
    formattedDate = formattedDate.replace("г.", "");
  }

  return formattedDate;
}
