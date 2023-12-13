<template>
  <main>
    <h1>Recipes</h1>
    <ContentList :query="query" v-slot="{ list }">
      <ul v-for="recipe in list" :key="recipe._path">
        <li><NuxtLink :to="recipe._path"><h2>{{ recipe.name }}</h2></NuxtLink></li>
      </ul>
    </ContentList>
  </main>
</template> 
<script setup lang="ts">
  import type { QueryBuilderParams } from '@nuxt/content/dist/runtime/types'
  const query: QueryBuilderParams = { path: '/recipes' }
</script>