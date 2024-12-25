document.addEventListener("DOMContentLoaded", () => {
    const asideNav = document.getElementById("aside-navigation");
    const asideContainer = document.getElementById("aside-container");

    const overlay = document.createElement("div");
    overlay.id = "overlay";
    document.body.appendChild(overlay);
  
    const header = document.querySelector("header");
  
    asideNav.addEventListener("click", () => {
      asideContainer.classList.add("active");
      overlay.classList.add("active");
      header.classList.add("blurred");
    });
  
    overlay.addEventListener("click", () => {
      asideContainer.classList.remove("active");
      overlay.classList.remove("active");
      header.classList.remove("blurred");
    });
  });
  