import { writable } from "svelte/store";

const articles = writable({});

const customArticlesStore = {
  subscribe: articles.subscribe,
  set: articlesArray => {
    const articlesObject = {};
    articlesArray.forEach(article => {
      articlesObject[article.id] = article;
    });
    articles.set(articlesObject);
  },
  update: articlesArray => {
    const articlesObject = {};
    articlesArray.forEach(article => {
      articlesObject[article.id] = article;
    });
    articles.update(state => ({ ...state, ...articlesObject }));
  },
  add: article => {
    articles.update(state => {
      return {
        ...state,
        [article.id]: article
      };
    });
  }
};

export default customArticlesStore;
