import "./main.css";
import NewsApiService from "./apiService";
import hitsTpl from "./templat.hbs";

const searchForm = document.querySelector("#search-form");
const loadMore = document.querySelector(".button");
const galleryPicture = document.querySelector(".gallery");

const newsApiService = new NewsApiService();

searchForm.addEventListener("submit", searchFormFn);
loadMore.addEventListener("click", loadMoreFn);

function searchFormFn(e) {
  e.preventDefault();

  clearPictureContainet();
  newsApiService.query = e.currentTarget.elements.query.value;
  newsApiService.resetPage();
  newsApiService.fetchArticles().then(appendHitsMarkup);
  loadMore.classList.remove("is-hidden");
}

function loadMoreFn() {
  scrollTo(galleryPicture.lastElementChild);
  newsApiService.fetchArticles().then(appendHitsMarkup);
}

function appendHitsMarkup(hits) {
  galleryPicture.insertAdjacentHTML("beforeend", hitsTpl(hits));
}

function clearPictureContainet() {
  galleryPicture.innerHTML = "";
}

function scrollTo(element) {
  setTimeout(() => {
    window.scrollTo({
      left: 0,
      top: element.offsetTop + document.documentElement.clientWidth,
      behavior: "smooth",
    });
  }, 500);
}
