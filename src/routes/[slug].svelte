<script context="module">
export async function preload({ params, query }) {
  return firestore
    .collection("articles")
    .doc(params.slug)
    .get()
    .then(doc => {
      if (doc.exists) {
        return {
          article: { id: doc.id, ...doc.data() },
          slug: params.slug
        };
      } else {
        this.error('404', 'Not found');
      }
    })
    .catch(err => {
      this.error(err.status, err.message);
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

export let article;
export let slug;

let articlesSubscription;

// add current article to the store
if (article) {
  articlesStore.add(article);
}

onMount(async () => {
  // subscribe to the store to get all articles updates
  articlesSubscription = articlesStore.subscribe(state => {
    if (state[slug]) {
      article = state[slug];
    }
  });
});

onDestroy(() => {
  if (articlesSubscription) {
    articlesSubscription();
  }
})
</script>

<style>
  h1 {
    margin: 1.6rem 0 0;
    font: 900 3.2rem/3.5rem Montserrat, sans-serif;
  }
  @media (max-width: 480px) {
    h1 {
      font-size: 2.6rem;
      line-height: 2.8rem;
    }
  }
  p.date {
    margin: 0;
    font-size: 0.7rem;
    color: #666;
  }

  /*
		By default, CSS is locally scoped to the component,
		and any unused styles are dead-code-eliminated.
		In this page, Svelte can't know which elements are
		going to appear inside the {{{post.html}}} block,
		so we have to use the :global(...) modifier to target
		all elements inside .content
  */
  .content {
    margin: 2rem 0 4rem;
  }
	.content :global(h2) {
	  margin: 2rem 0 1rem;
		font-size: 1.4rem;
    font-weight: 900;
    line-height: 2rem;
  }

  .content :global(h3) {
    margin: 1rem 0 0.5rem;
  }

  .content :global(p) {
    margin: 0.5rem 0 1rem
  }

  .content :global(.filename) {
    background: #666;
    color: #fff;
    font: 0.8rem/1.1rem menlo, inconsolata, monospace;
    padding: 0.4rem 0.3rem 0.3rem;
  }

	.content :global(pre) {
    margin: 0 0 1.6rem;
		padding: 0.5em;
		background-color: #f9f9f9;
		box-shadow: inset 1px 1px 5px rgba(0,0,0,0.05);
		border-radius: 2px;
		overflow-x: auto;
  }
  
  .content :global(.filename) + :global(pre) {
    border-radius: 0 0 2px 2px;
  }

	.content :global(pre) :global(code) {
		padding: 0;
		background-color: transparent;
	}

	.content :global(ul) {
		line-height: 1.5;
	}

	.content :global(li) {
		margin: 0 0 0.5em 0;
	}
</style>

<svelte:head>
	<title>{article.title}</title>
</svelte:head>

<TopNav inner={true}/>

<h1>{article.title}</h1>
<p class="date">{formatDate(article.date)}</p>

<div class="content">
	{@html article.body}
</div>

<Bio />
