document.addEventListener("DOMContentLoaded", function () {
  const searchInput = document.querySelector("#Search-bar input");
  const searchButton = document.querySelector("#icon-search");
  const container = document.getElementById("container");
  const modal = document.getElementById("modal");
  const modalTitle = document.getElementById("modalTitle");
  const modalImage = document.getElementById("modalImage");
  const modalDescription = document.getElementById("modalDescription");
  const closeModalButton = document.getElementById("closeModal");

  searchButton.addEventListener("click", handleSearch);

  function handleSearch() {
    const searchValue = encodeURIComponent(searchInput.value.trim());

    if (searchValue === "") {
      console.log("Please enter a valid search term.");
      return;
    }

    performSearch(searchValue);
  }

  function performSearch(searchValue) {
    fetch(`https://api.mangadex.org/manga?title=${searchValue}&limit=10&includes[]=cover_art`)
      .then((response) => response.json())
      .then((data) => {
        container.innerHTML = "";

        for (let i = 0; i < data.data.length; i++) {
          const req = data.data[i];
          let title = req.attributes.title.en;
          let description = req.attributes.description.en;
          let mangaId = req.id;
          let fileSearch = req.relationships.find(
            (relationships) => relationships.type === "cover_art"
          );
          let path = fileSearch.attributes.fileName;

          const mangaElement = document.createElement("div");
          mangaElement.id = "manga";
          mangaElement.innerHTML = `<h1 id="mangatitle">${title}</h1>
                                    <br>
                                    <img id="mangaimg" src="https://uploads.mangadex.org/covers/${mangaId}/${path}">`
          mangaElement.addEventListener("click", () => openModal(title, `https://uploads.mangadex.org/covers/${mangaId}/${path}`, description));
          container.appendChild(mangaElement);
        }
      })
      .catch((error) => console.log(error));
  }

  function openModal(title, imageUrl, description) {
    modalTitle.textContent = title;
    modalImage.src = imageUrl;
    modalDescription.textContent = description;
    modal.style.display = "block";
  }

  closeModalButton.addEventListener("click", () => {
    modal.style.display = "none";
  });
});