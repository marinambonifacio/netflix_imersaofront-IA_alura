const toggleButton = document.getElementById("theme-toggle");
const body = document.body;
const themeStorageKey = "netflixTheme";

const applyTheme = (theme) => {
  const isLight = theme === "light";
  body.classList.toggle("light-mode", isLight);
  toggleButton.textContent = isLight ? "Modo escuro" : "Modo claro";
  toggleButton.setAttribute(
    "aria-label",
    isLight ? "Ativar modo escuro" : "Ativar modo claro",
  );
  localStorage.setItem(themeStorageKey, theme);
};

const storedTheme = localStorage.getItem(themeStorageKey);
const prefersLight = window.matchMedia("(prefers-color-scheme: light)").matches;
const initialTheme = storedTheme || (prefersLight ? "light" : "dark");
applyTheme(initialTheme);

const profileCards = document.querySelectorAll(".profile");

const saveActiveProfile = (name, image) => {
  localStorage.setItem("perfilAtivoNome", name);
  localStorage.setItem("perfilAtivoImagem", image);
};

profileCards.forEach((card) => {
  card.addEventListener("click", () => {
    const profileName = card.querySelector("figcaption")?.textContent;
    const profileImage = card.querySelector("img")?.src;

    if (profileName && profileImage) {
      saveActiveProfile(profileName, profileImage);
      window.location.href = "catalogo/catalogo.html";
    }
  });
});

toggleButton.addEventListener("click", () => {
  const nextTheme = body.classList.contains("light-mode") ? "dark" : "light";
  applyTheme(nextTheme);
});
