<script context="module">
export async function preload({ params, query }) {
  return this.fetch(getFirestoreRequestUrl('articles')).then(res => res.json())
    .then(res => {
      return { articles: parseFirestoreResults(res.documents) }
    }).catch(err => {
      throw error(err.status, err.message);
    });
}
</script>

<script>
import { onMount, onDestroy } from 'svelte';
import { getFirestoreRequestUrl, parseFirestoreResults } from '../firebase.js';
import articlesStore from '../articles-store.js';

import { formatDate } from '../utilities.js';

import TopNav from '../components/TopNav.svelte';
import Bio from '../components/Bio.svelte';

export let articles;

let articlesSubscription;

// if we have articles from the preload function put them in the store
if (articles && articles.length) {
  articlesStore.set(articles);
}

onMount(async () => {
  if (!articles) {
    // get all articles from firestore collection
    fetch(getFirestoreRequestUrl('articles')).then(res => res.json())
      .then(res => {
        articlesStore.set(parseFirestoreResults(res.documents));
      }).catch(err => {
        throw error(err.status, err.message);
      });
  }

  // subscribe to the store to get all articles updates
  articlesSubscription = articlesStore.subscribe(state => {
    articles = Object.keys(state)
      .map(key => state[key])
      .sort((a, b) => (a.date > b.date) ? -1 : 1);
  });
})

// unsubscribe from firestore and store on page leave
onDestroy(() => {
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
    line-height: 2rem;
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
        <h3><a href="{article.id.substr(8)}" rel="prefetch">{article.title}</a></h3>
        <p class="date">{formatDate(article.date)}</p>
        <p>{@html article.lead}</p>
      </li>
    {/each}
  </ol>
{/if}
