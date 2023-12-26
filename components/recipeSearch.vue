<script lang="ts" setup>
const { data } = await useAsyncData('searchQuery', () => queryContent('recipes').find());
const search = ref('');
const props = defineProps(['searchLabel']);
const results = ref([{}]);

const performSearch = async () => {
    
    if (data.value === null) {
        data.value = [];
    }
    let searchTerm = search.value.toLowerCase();
    let $simpleFilter = (val: string) => { return val && val.toLowerCase && val.toLowerCase().includes(searchTerm)};
    let $arrayFilter = (val: []) => { return val && val.find && val.find(x => $simpleFilter(x)) };

    results.value = data.value.filter((x) => {
        return (
            $simpleFilter(x.name)
            || $simpleFilter(x.url)
            || $simpleFilter(x.keywords)
            || $simpleFilter(x.description)
            || $simpleFilter(x.url)
            || $arrayFilter(x.recipeCategory)
            || $arrayFilter(x.recipeIngredient)
        )
    }); 
}  
performSearch();
</script>
<template>
    <div class="search-bar" >
        <div class="search-input-container">
            <span class="search-label">{{props.searchLabel}}</span><input class="search-input" type="text" @input="performSearch" v-model="search" placeholder="Recipe Name, Key word, Ingredient">
        </div>                
        <slot name="results" :results="results"></slot>
    </div>
</template>
<style>
 
</style>