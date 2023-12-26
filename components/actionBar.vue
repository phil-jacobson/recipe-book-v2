 <script setup>
   const props = defineProps([  'name', 'actions', 'position'  ])   
   const selectedIndex = useTabComponentSelectedIndex(); 
  
   function selectAction(idx) {  
     selectedIndex.value[props.name] = idx;
   }  
   
   if (!selectedIndex.value[props.name]) 
       selectAction(0);  
</script>
<template>     
   <ul class="action-bar" :class='{"action-bar-top": (props.position == "top"), "action-bar-bottom" : (props.position === "bottom")}'>    
    <li v-for='(action, index) in  props.actions' :key='action.key' :class='{"action-selected": (index == selectedIndex[props.name])}' @click="selectAction(index)">    
      <slot :name="action.key">
        <NuxtLink v-if="action.link" :to="action.link">{{ action.name }}</NuxtLink>        
        <div  v-if="!action.link" class="action-title"> {{ action.name }}</div>
        <div  v-if="!action.link" class="action-indicator"></div>
      </slot>        
    </li>          
  </ul>
</template>
<style scoped>
 .action-bar {  display:flex; flex-flow: row nowrap;  justify-content: space-around;  width:100%; background-color: #3d85c6; color:#FFF; }
 a { color:white;  text-decoration: none; }
 .action-bar li { display:block; cursor:pointer;  position: relative; }
 .action-selected .action-title { font-weight: bolder; }
 .action-bar-top .action-indicator { position:relative;  top:.65em; } 
 .action-bar-top .action-selected .action-indicator {  border-bottom:3px solid #3d85c6;  }
 
 .action-bar-bottom { border-top: solid 1px #000;}
 .action-bar-bottom .action-indicator { position:relative;  bottom:.65em;  }
 .action-bar-bottom .action-selected .action-indicator {  border-bottom:3px }
 .action-bar-bottom .action-indicator { display: none; /*position:relative;  bottom:2.25em; */  }
 .action-bar-bottom .action-selected .action-indicator {  border-bottom:3px solid #000; }
 .action-bar-bottom li {margin: 10px 0;}
</style>
