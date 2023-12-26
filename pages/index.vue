<script setup>
const tabs = [
  { name: 'Recipes', key: 'recipe', link: '/' },
  { name: 'Reference', key: 'reference', link: '/references' }
];
</script>
<template>
  <NuxtLayout name="default">
    <template #head>
      <h3>Recipes</h3>
    </template>
    <template #main>
      <main>        
      <recipeSearch>
          <template #results="{ results }">                  
            <div class="search-results">
              <div class="search-results-count">Count: {{ results.length }}</div>
              <ul v-for="result in results" :key="result._path">
                <li class="search-result">
                  <NuxtLink :to="result._path">
                    <div>{{ result.name }}</div>
                  </NuxtLink>
                </li>
              </ul>
            </div>
        </template>
    </recipeSearch>
      </main>
    </template>
    <template #foot>
      <ActionBar class="tabs" :actions="tabs" position="bottom" name="bottomTabs" />
    </template>
  </NuxtLayout>
</template> 
<style>.head h3 {
  text-align: center;
  min-height: 25px;
  margin-top: 5px;
}

</style>