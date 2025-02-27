<!-- src/routes/+error.svelte -->
<script>
  import { page } from '$app/stores';

  // Access error details from the $page store
  const { status, error } = $page;
</script>

<div class="error-page">
  <h1>Error {status}</h1>
  <p>{error?.message || 'An unexpected error occurred.'}</p>
  <pre>{JSON.stringify(error, null, 2)}</pre>
  <a href="/">Back to Homepage</a>
</div>

/* src/routes/+error.svelte */
<style>
  .error-page {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    min-height: 100vh;
    background-color: #f8f8f8;
    text-align: center;
  }
  h1 {
    color: #e74c3c;
  }
  pre {
    background-color: #f1f1f1;
    padding: 10px;
    border-radius: 5px;
    overflow-x: auto;
    max-width: 80%;
    margin-top: 20px;
  }
  a {
    margin-top: 20px;
    color: #3498db;
    text-decoration: none;
  }
  a:hover {
    text-decoration: underline;
  }
</style>
