<script setup>
   const props = defineProps(['scale']);
   const emit = defineEmits(['click']);
   const emitButtonClick = () => { 
       emit('click');   
   };
</script>
<template>

   <div class="scale" @click="emitButtonClick" >        
         <svg class="icon" data-testid="icon-ruler" viewBox="0 0 20 20"  fill="#977535">
                 <path d="M14.249,0.438L0.438,14.251c-0.584,0.584-0.584,1.538,0.002,2.124l3.185,3.187c0.584,0.584,1.541,0.586,2.124,0.002 L19.562,5.751c0.584-0.585,0.584-1.541,0-2.125l-3.186-3.188C15.789-0.148,14.834-0.145,14.249,0.438z M3.929,15.312L3.17,16.071 l-1.896-1.897l0.759-0.759L3.929,15.312z M6.965,15.312l-0.759,0.759l-3.415-3.415l0.759-0.76L6.965,15.312z M6.965,12.276 l-0.759,0.759l-1.898-1.896l0.76-0.76L6.965,12.276z M8.483,10.758l-0.759,0.759L5.828,9.621l0.759-0.76L8.483,10.758z  M11.518,10.758l-0.759,0.759L7.345,8.103l0.759-0.759L11.518,10.758z M11.518,7.723l-0.759,0.759L8.863,6.586l0.759-0.759 L11.518,7.723z M13.036,6.206l-0.759,0.759L10.38,5.068l0.759-0.759L13.036,6.206z M16.072,6.206l-0.76,0.759L11.898,3.55 l0.759-0.76L16.072,6.206z M16.071,3.171l-0.759,0.759l-1.896-1.898l0.759-0.758L16.071,3.171z"></path>
         </svg>
         <span class="scale-val" v-bind:class="{ hide: props.scale === 1 }">(x{{props.scale}})</span>
    </div>
 </template>
 <style scoped>
 
    .scale-val { 
       display: block;                     
       width: 2em;        
       font-size:.9em;
       position:absolute;
       top: 1px; 
       left:25px;
    }
    
    .scale { position: relative;    }

    .icon {    fill: #FFF;  height:1.25em; width:1.25em;  }

    .hide { visibility: hidden; }

</style>