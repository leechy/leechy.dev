<script>
import Footer from '../components/Footer.svelte';

export let segment;
</script>

<style>
.layout {
  max-width: 42rem;
  margin: 0 auto;
  padding: 2rem;
}

@media (max-width: 480px) {
  .layout {
    padding: 1rem 2rem;
  }
}
</style>

<div class="layout">
  <main>
    <slot></slot>
  </main>

  <Footer />
</div>