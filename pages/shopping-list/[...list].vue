<script setup>
const route = useRoute();
const recipeRoute = route.path.replace("/shopping-list/", "/recipes/");
definePageMeta({
   layout: false,
});
</script>
<template>

    <ContentDoc v-slot="{ doc }" :path="recipeRoute" > 
     
     <NuxtLayout name="default">
        <template #head>
           <NuxtLink to="/">back</NuxtLink>
           <h3>Shopping List</h3>
        </template>
        <template #main>    
            <ul>
               <li v-for="ingredient in doc.recipeIngredient">
                   <Ingredient :raw-ingredient-text="ingredient" :scale="1"></Ingredient>
               </li>
            </ul>
        </template>      
     </NuxtLayout>
  </ContentDoc>
</template>
 