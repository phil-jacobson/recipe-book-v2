<script setup>
  const props = defineProps([ 'name', 'actions' ])   
  const selectedIndex = useTabComponentSelectedIndex();    
  if (!selectedIndex.value[props.name]) 
    selectedIndex.value[props.name] = 0;
  
  const swipeHandler = (dir)   => {
    let idx = selectedIndex.value[props.name];    
    if (dir == 'left' && idx  < 2){
        selectedIndex.value[props.name] = idx + 1;       
    }
    else if (dir == 'right' && idx > 0){
        selectedIndex.value[props.name] = idx - 1;              
    }      
 };
</script>
<template> 
   <div class="action-panel"  v-touch:swipe="swipeHandler" >  
     
  <slot name="tabsContentHeading" ></slot>      
  <div v-for='(action, index) in  actions' :key='action.name' >       
    <slot :name="props.actions[selectedIndex[props.name]].key" v-if="selectedIndex[props.name] === index"></slot> 
  </div> 
 </div>
</template>
<style>.action-panel {   min-height: 100vh; }</style>