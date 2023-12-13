<script setup>
  const items = [
   { label: 'Intro',  key: 'intro'  },
   { label: 'Ingredients', key: 'ingredients' },
   { label: 'Steps', key: 'steps'    
}];
</script>
<template>   
   <main>  
   <NuxtLink to="/">Recipes</NuxtLink>
    <ContentDoc  v-slot="{ doc }">
        <UTabs :items="items" >
          <template #item="{ item }">
            <div v-if="item.key === 'intro'">
                <h2>{{ doc.name }}</h2>  
                <p>{{ doc.description }}</p>
                 <img :src="doc.image[0]"/>          >
            </div>
            <div v-if="item.key === 'ingredients'" >
                <h2>Ingredients</h2>
                <ul>
                   <li v-for="ingredient in doc.recipeIngredient">{{ ingredient }} </li>
                </ul> 
            </div>          
            <div v-if="item.key === 'steps'" >
                <h2>Steps</h2>
                 <ul>
                  <li v-for="step in doc.recipeInstructions">{{ step.text }} </li>
               </ul>
            </div>    
      
      </template>
   </UTabs>    
</ContentDoc>
</main>
</template>
<style>
img { width: 300px;  }
</style>