<script setup>
   import { multiply, fraction, format, number, hasNumericValue } from 'mathjs';

   const props = defineProps([ 'rawIngredientText', 'scale' ]);   
   const data = ref({ 
      isHeading: false,
      isChecked: false
   });   
   
   const toggleState = function() { data.value.isChecked = !data.value.isChecked; }; 
   
   const scaledAndFormattedData = computed(() => {
       if (props.rawIngredientText.startsWith('<h2>'))  {
         data.value.isHeading = true; 
         return props.rawIngredientText;  
       }      
         

        let vals = $extractNumericValues(props.rawIngredientText, props.scale);
        let formattedText = props.rawIngredientText;
        vals.original.forEach((v,index) => formattedText =  formattedText.replace(v, `<span class="amount">${vals.scaled[index]}</span>`));           
        return  $formatUnits(formattedText);
   });
   
   const $extractNumericValues = (text,scale) =>  {
        const regex = /<val>(.+?)<\/val>/gm 
        let vals = [...text.matchAll(regex)].map(a => a[0]);                        
        let scaledVals = vals.map(b=>$scale(b,scale));                        
        return { original: vals, scaled: scaledVals  };
   };

   const $scale = (val, scale) =>  {
         val = val.replace('<val>','').replace('</val>','');         
         let value = format(multiply(number(fraction(val)),scale), { fraction: 'ratio', precision: 3});    
         return $applyFraction(value);         
   };

   const $applyFraction = (val) => {
        let fromVals = ['.13', '0.125', '0.25', '.25', '0.333', '0.33', '.33', '0.50', '0.5', '.5', '0.667', '.67', '0.75' , '.75'];
        let toVals = [' 1/8', '1/8', ' 1/4', ' 1/4', ' 1/3', ' 1/3',' 1/3', ' 1/2', ' 1/2', ' 1/2',' 2/3', ' 2/3', ' 3/4', ' 3/4' ];        
        fromVals.forEach((v,index) => val = val.replace(v, `${toVals[index]}`)); 
        return val;
   };
   
   const $formatUnits = (ingredient) => {
            let units = [ { unit: 'tsp', variations: ['teaspoon', 'teaspoons', 'tsp', 'tsps']}, 
                           { unit: 'tbsp', variations: ['tablespoon', 'tablespoons', 'tbsp', 'tbsps']},
                           { unit: 'pounds', variations: ['pounds', 'lbs']},                           
                           { unit: 'pound', variations: ['pound', 'lb']},
                           { unit: 'ounce', variations: ['ounce', 'oz']},
                           { unit: 'ounces', variations: ['ounces', 'oz']},
                           { unit: 'cup', variations: ['cup']},
                           { unit: 'cups', variations: ['cups']},
                           { unit: 'pinch', variations: ['pinch']},
                           { unit: 'quart', variations: ['quart']},
                           { unit: 'quarts', variations: ['quarts']},
                           { unit: 'handful', variations: ['handful']}
             ];
             units.forEach(function(u,index){
                 u.variations.forEach((v,index) => ingredient = ingredient.replace(new RegExp(` ${v} `,"i"), `<span class="unit"> ${u.unit} </span>`));
             });
             
             return ingredient;
   };
  
</script>
<template>
    <div class="ingredient-container">      
       <div class="ingredient" v-if="!data.isHeading" v-html="scaledAndFormattedData"  :class="{ unchecked: data.isChecked }" @click="toggleState"></div>
       <div class="heading" v-if="data.isHeading" v-html="scaledAndFormattedData"></div>
    </div>
</template>
<style>
  .ingredient { font-size: 1.5em; }  
  .ingredient.ingredient.unchecked  {font-weight:-100;}
  .ingredient.unchecked:before {  content: "\2611\0020";  }
  .ingredient-container { cursor: pointer;}
  .ingredient:before { content: "\2610\0020"; }
  .ingredient .amount, .ingredient .unit { font-weight: bold;   }
  .ingredient.unchecked .amount, .ingredient .unit  {  color:#3d85c6; }
  
  .ingredient-container { margin-bottom: 1em; }
</style>