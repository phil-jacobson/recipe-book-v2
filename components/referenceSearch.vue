<script lang="ts" setup>
import { compileScript } from 'vue/compiler-sfc';

const { data } = await useAsyncData('searchQuery', () => queryContent('reference').find());
const search = ref('');
const props = defineProps(['searchLabel']);
const results = ref([{}]);

const performSearch = async () => {
    if (data.value === null) {
        data.value = [];
    }
    let searchTerm = search.value.toLowerCase();
    let $simpleFilter = (val: string) => { return val && val.toLowerCase && val.toLowerCase().includes(searchTerm) };
    let $arrayFilter = (val: []) => { return val && val.find && val.find(x => $simpleFilter(x)) };
    let $jsonFilter = (val: any) => {       
        //Brute force technique for markdown search.  Find a better way!        
        let arr: any = [];
        let objectToValsArray = (obj: any) => {
            let isText = false;
            for (let k in obj) {
                if (typeof obj[k] === "object") {
                    objectToValsArray(obj[k])
                } else {
                    // base case, stop recurring
                    if (isText) {
                        let v = obj[k].replace('/n', '').trim();
                        if (v.length > 0) arr.push(v);
                    }
                    if (obj[k] == "text") {
                        isText = true;
                    }                   
                }
            }
        }
        objectToValsArray(val);      
        return $arrayFilter(arr);
    };

    results.value = data.value.filter((x) => {
        return (
            $simpleFilter(x.name)
            || $simpleFilter(x.url)
            || $simpleFilter(x.description)
            || $simpleFilter(x.url)
            || $jsonFilter(x.body)
        );
    });
}
performSearch();
</script>
<template>
    <div class="search-bar">
        <div class="search-input-container">
            <span class="search-label">{{ props.searchLabel }}</span>
            <input class="search-input" type="text" @input="performSearch" v-model="search" placeholder="Search Term">
        </div>        
        <slot name="results" :results="results"></slot>
    </div>
</template>
<style></style>