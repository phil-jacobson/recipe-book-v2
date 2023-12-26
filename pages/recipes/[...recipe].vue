<script setup>
const selectedRecipeTabIndex = useTabComponentSelectedIndex();

const recipeTabs = [
   { name: 'Intro', key: 'intro' },
   { name: 'Ingredients', key: 'ingredients' },
   { name: 'Steps', key: 'steps' }
];
const recipeUtlityActions = [
   { name: 'Scale', key: 'scale' },
   { name: 'Share', key: 'share' },
   { name: 'Screen Lock', key: 'screenlock' }
];
const data = ref({
   scale: 1,
   scalePanelVisible: false
});
const scalePanelSaved = (newScale) => {
   data.value.scale = newScale;
   data.value.scalePanelVisible = false;
};
const showScalePanel = () => {
   selectedRecipeTabIndex.value["recipeTabs"] = 1;
   data.value.scalePanelVisible = true;
}
const closeScalePanel = () => {
   data.value.scalePanelVisible = false;
}
definePageMeta({
   layout: false,
});
</script>
<template>
   <ContentDoc v-slot="{ doc }" > 
     
      <NuxtLayout name="default">
         <template #head>
            <NuxtLink to="/"><backArrow></backArrow></NuxtLink>
            <h3>Recipe</h3>
            <ActionBar name="recipeTabs" :actions="recipeTabs" position="top"></ActionBar>
         </template>
         <template #main>
            <ActionPanel name="recipeTabs" :actions="recipeTabs">
               <template #tabsContentHeading>
                  <h1>{{ doc.name }}</h1>
               </template>
               <template #intro>
                  <p v-html="doc.description"></p>
                  <img :src="doc.image[0]" />
               </template>
               <template #ingredients>
                  <ul>
                     <li v-for="ingredient in doc.recipeIngredient">
                        <Ingredient :raw-ingredient-text="ingredient" :scale="data.scale"></Ingredient>
                     </li>
                  </ul>
               </template>
               <template #steps>
                  <ul>
                     <li v-for="step in doc.recipeInstructions">{{ step.text }} </li>
                  </ul>
               </template>
            </ActionPanel>
         </template>
         <template #foot>
            <ScalePanel :init-scale="data.scale" :is-visible="data.scalePanelVisible" @scalePanelSaved="scalePanelSaved"
               @scalePanelClosed="closeScalePanel"></ScalePanel>
            <ActionBar class="bottom-bar" name="recipeUtilityActions" :actions="recipeUtlityActions" position="bottom">
               <template #scale>
                  <scaleButton :scale="data.scale" @click="showScalePanel"></scaleButton>
               </template>
               <template #share>
                  <shareButton></shareButton>
               </template>
               <template #screenlock>
                  <WakeLock></WakeLock>
               </template>
            </ActionBar>
         </template>
      </NuxtLayout>
   </ContentDoc>
</template>
<style scoped>
.bottom-bar {
   color: white;
}
.head h3 {
   text-align: center;
}

.head a {
   position: fixed;
}

img {
   width: 50%;
   margin: 0 auto;
}</style>