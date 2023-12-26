<script setup>
const tabs = [
   { name: 'Recipes', key: 'recipe', link:'/' },
   { name: 'Reference', key: 'reference', link:'/references' } 
];
</script>
<template>
    <NuxtLayout name="default">   
      <template #head>
         <h3>Reference</h3>   
     </template>
    <template #main>
      <main>    
        <referenceSearch>
          <template #results="{ results }">            
            <div class="search-results">
              <div class="search-results-count">Count: {{ results.length }}</div>
              <ul class="search-result" v-for="result in results" :key="result._path">
                <li>
                  <NuxtLink :to="result._path">
                    <div>{{ result.name }}</div>
                  </NuxtLink>
                </li>
              </ul>
            </div>
        </template>
      </referenceSearch>
    </main>
  </template>
  <template #foot>            
    <ActionBar name="bottomTabs" class="tabs" :actions="tabs" position="bottom"></ActionBar>
 </template>
 </NuxtLayout>
 </template> 
 <style>
    .head h3 {  text-align: center; min-height: 25px; margin-top:5px; }
 </style>