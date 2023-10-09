export const getTheme = () => {
  let theme = "light";

  if (localStorage.getItem("theme")) {
    theme = JSON.parse(localStorage.getItem("theme")!);
  }
  return { theme };
};

export const setFixedBody = (value: boolean) => {
  if (value) {
    document.body.style.overflowY = "hidden";
  } else {
    document.body.style.overflowY = "auto";
  }
};
