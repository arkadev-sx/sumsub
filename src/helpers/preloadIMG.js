export const preloadIMG = (url) => {
  if (!url) return;
  const img = document.createElement("img");
  img.src = url;
  img.onload = () => {
    return true;
  };
};
