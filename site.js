document.addEventListener("DOMContentLoaded", function () {
  const searchInput = document.querySelector("#Search-bar input");
  const searchButton = document.querySelector("#icon-search");
  const container = document.getElementById("container");

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

          container.innerHTML += `<div id="manga">
                                    <h1 id="mangatitle">${title}</h1>
                                    <br>
                                    <img id="mangaimg" src="https://uploads.mangadex.org/covers/${mangaId}/${path}">
                                    <h1 id="descEdit">${description}</h1>
                                  </div>`;
        }
      })
      .catch((error) => console.log(error));
  }
});
