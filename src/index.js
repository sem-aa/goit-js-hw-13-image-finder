import "./main.css";
import NewsApiService from "./apiService";
import hitsTpl from "./templat.hbs";

const searchForm = document.querySelector("#search-form");
const loadMore = document.querySelector(".button");
const galleryPicture = document.querySelector(".gallery");
let quantityLength = 0;

const newsApiService = new NewsApiService();

searchForm.addEventListener("submit", searchFormFn);
loadMore.addEventListener("click", loadMoreFn);

function searchFormFn(e) {
  e.preventDefault();

  clearPictureContainet();
  newsApiService.query = e.currentTarget.elements.query.value;
  newsApiService.resetPage();
  newsApiService.fetchArticles().then(appendHitsMarkup);
  lengthFn();
}

function loadMoreFn() {
  scrollTo(galleryPicture.lastElementChild);
  newsApiService.fetchArticles().then(appendHitsMarkup);
  lengthFn();
}

function appendHitsMarkup(hits) {
  galleryPicture.insertAdjacentHTML("beforeend", hitsTpl(hits));
  quantityLength = hits.length;
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
  }, 1000);
}

function lengthFn() {
  setTimeout(() => {
    if (quantityLength < 12) {
      loadMore.classList.add("is-hidden");
    } else loadMore.classList.remove("is-hidden");
  }, 500);
}
