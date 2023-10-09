export const getTheme = () => {
  let theme = "light";

  if (localStorage.getItem("theme")) {
    theme = JSON.parse(localStorage.getItem("theme")!);
  }
  return { theme };
};
