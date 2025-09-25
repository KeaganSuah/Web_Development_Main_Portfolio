// Check if the user has previously selected a theme and apply it
const userSelectedTheme = localStorage.getItem("userSelectedTheme");
const userSelectedThemeIcon = localStorage.getItem("userSelectedThemeIcon");

// condition to set the correct icon to match the saved theme, as well as get the glowing cards to be customise to the correct theme
if (userSelectedTheme) {
  document.body.classList[userSelectedTheme === "light" ? "add" : "remove"](
    lightTheme
  );
  icon.className = userSelectedThemeIcon;
  if (userSelectedTheme === "light") {
    for (cardContainer of cardContainerArray) {
      summaryLight(cardContainer);
    }
  } else {
    for (cardContainer of cardContainerArray) {
      summaryDark(cardContainer);
    }
  }
}
