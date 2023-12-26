<script setup>

definePageMeta({
  layout: false,
});
</script>
<template>
   <ContentDoc v-slot="{ doc }">
      <NuxtLayout name="default">

         <template #head>
            <NuxtLink to="/references"><backArrow></backArrow></NuxtLink>
            <h3>Reference</h3>            
         </template>

         <template #main>         
            <h2>{{ doc.name }}</h2>
            <ContentRenderer :value="doc" />
        </template>
      
      </NuxtLayout>
   </ContentDoc>
</template>
<style>
 .head h3 {  text-align: center;   }
 .head a { position: fixed;}
img {
   width: 50%;
   margin: 0 auto;
}</style>