export default class NewsApiService {
  constructor() {
    this.searchQuery = "";
    this.page = 1;
  }

  fetchArticles() {
    // console.log(this);
    const key = "19324940-21d8938b8dfbc074399017655";
    const quantityPicture = 12;
    return fetch(
      `https://pixabay.com/api/?image_type=photo&orientation=horizontal&q=${this.searchQuery}&page=${this.page}&per_page=${quantityPicture}&key=${key}`
    )
      .then((respone) => respone.json())
      .then(({ hits }) => {
        this.incrementPage();
        return hits;
      });
  }

  incrementPage() {
    this.page += 1;
  }
  resetPage() {
    this.page = 1;
  }
  get query() {
    return this.searchQuery;
  }

  set query(newQuery) {
    this.searchQuery = newQuery;
  }
}
