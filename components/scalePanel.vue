<script setup>
const props = defineProps(['initScale', 'isVisible']);
const emit = defineEmits(['scalePanelClosed', 'scalePanelSaved']);
const scale = ref(props.initScale);

const down = () => {
    if (scale.value == .5)
        return;
    let amt = 1;
    if (scale.value < 2)
        amt = .5
    scale.value = scale.value - amt;
};
const up = () => {
    if (scale.value == 6)
        return;
    let amt = 1;
    if (scale.value < 2)
        amt = .5
    scale.value = scale.value + amt;
}

const apply = () => {    
    emit('scalePanelSaved', scale.value);
};

const close = () => {    
    scale.value = props.initScale;
    emit('scalePanelClosed');
};

const reset = () => {
    scale.value = 1;
    emit('scalePanelSaved', 1);
};
</script>
<template>
    <div class="scale-bar" v-if="props.isVisible" v-click-outside="close">
        <div class="header">
            <h3>Scale Ingredients</h3>
        </div>
        <div class="scale-bar-container">
            <div class="down" @click="down">-</div>
            <div class="scale">{{ scale }}</div>
            <div class="up" @click="up">+</div>
        </div>
        <div class="state-btn save" @click="apply">Apply</div>
        <div class="state-btn cancel" @click="reset">Reset</div>
    </div>
</template>
<style scoped>
  .scale-bar {
       display:flex;   
       flex-flow: row wrap;   
       justify-content: center;
       align-items: center;
       background-color: #8675a9;      
       width:50%;  
       height: 7em;  
       position:relative;                  
   }

   .scale-bar .header {
       width: 100%;
   }
   .scale-bar h3 {
       text-align: center;
   }
  
  
  .scale-bar-container {
      font-size:2em;
      display:flex;
      flex-flow: row wrap;   
      width: 70%;
    
  }
.up,  .down, .state-btn {
    cursor: pointer;
    color: #3c2946;
}

  .scale {
      color: #FFF;
  }

  .scale, .up, .down, .state-btn {    
     width:33%;
     text-align: center; 
  }

  .scale-bar-container {
      border-bottom: solid 1px lightgray;
  }
</style>