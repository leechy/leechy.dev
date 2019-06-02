<script>
import TopNav from '../components/TopNav.svelte';

export let status;
export let error;

const dev = process.env.NODE_ENV === 'development';
</script>

<style>
	h1 {
    font: 900 3rem/3.2rem Montserrat, sans-serif;
    margin: 2rem 0;
	}

	p {
		margin: 1em auto;
	}

	@media (max-width: 480px) {
		h1 {
      font-size: 2em;
      line-height: 2.2rem;
		}
	}
</style>

<svelte:head>
	<title>Index Of / Error {status}</title>
</svelte:head>

<TopNav inner={true} />
<h1>Error {status}: {error.message}</h1>

{#if status === 404}
<p>The page is not available on this site anymore. Sorry.</p>
<p>Try to start from the <a href="/">home page</a>.</p>
{/if}

{#if dev && error.stack}
	<pre>{error.stack}</pre>
{/if}
