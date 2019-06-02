<script>
export let inner;
</script>

<style>
h1 {
  margin: 0 0 0.5rem;
  font: 900 4rem/4.4rem Montserrat, sans-serif;
}

h3 {
  margin: 0 0 0.3rem;
  font: 900 2rem/2.2rem Montserrat, sans-serif;
}

a {
  color: inherit;
}

@media (max-width: 480px) {
  h1 {
    font-size: 3rem;
  }
  h3 {
    font-size: 1.6rem;
    line-height: 1.8rem;
  }
}
</style>

<heading>
  {#if inner}
    <h3><a href="/">Index Of /</a></h3>
  {:else}
    <h1>Index Of /</h1>
  {/if}
</heading>
