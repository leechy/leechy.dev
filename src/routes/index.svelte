<script context="module">
export async function preload({ params, query }) {
  return firestore
    .collection("articles")
    .get()
    .then(querySnapshot => {
      const articles = [];
      querySnapshot.forEach(doc => {
        articles.push({...doc.data(), id: doc.id});
      });
      articles.sort((a, b) => (a.date > b.date) ? -1 : 1);
      return { articles };
    });
}
</script>

<script>
import { onMount, onDestroy } from 'svelte';
import { firestore } from '../firebase.js';
import articlesStore from '../articles-store.js';

import { formatDate } from '../utilities.js';

import TopNav from '../components/TopNav.svelte';
import Bio from '../components/Bio.svelte';

export let articles;

let firestoreSubscription;
let articlesSubscription;

// if we have articles from the preload function put them in the store
if (articles && articles.length) {
  articlesStore.set(articles);
}

onMount(async () => {
  // subscribe to firestore collection when enter from another page
  firestoreSubscription = firestore.collection("articles")
    .onSnapshot(querySnapshot => {
      const updatedArticles = [];
      querySnapshot.forEach(doc => {
        updatedArticles.push({...doc.data(), id: doc.id});
      });
      articlesStore.set(updatedArticles);
    });

  // subscribe to the store to get all articles updates
  articlesSubscription = articlesStore.subscribe(state => {
    articles = Object.keys(state)
      .map(key => state[key])
      .sort((a, b) => (a.date > b.date) ? -1 : 1);
  });
})

// unsubscribe from firestore and store on page leave
onDestroy(() => {
  if (firestoreSubscription) {
    firestoreSubscription();
  }
  if (articlesSubscription) {
    articlesSubscription();
  }
})
</script>

<style>
  ol {
    margin: 0;
    padding: 0;
    list-style-type: none;
  }
  h3 {
    margin: 1.8rem 0 0.2rem;
    font-size: 1.6rem;
    font-weight: 900;
  }
	p {
		margin: 0.2rem 0 0.6rem;
  }
  p.date {
    margin: 0;
    font-size: 0.7rem;
    color: #666;
  }
</style>

<svelte:head>
	<title>Index Of /</title>
</svelte:head>

<TopNav inner={false}/>
<Bio />

{#if articles}
  <ol>
    {#each articles as article (article.id)}
      <li>
        <h3><a href="/{article.id}" rel="prefetch">{article.title}</a></h3>
        <p class="date">{formatDate(article.date)}</p>
        <p>{@html article.lead}</p>
      </li>
    {/each}
  </ol>
{/if}