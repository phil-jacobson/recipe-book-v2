<script setup>
import debounce from 'lodash.debounce';
const settings = { timeoutDurationMs: 900000, scrollDebounceMs: 1000 };
const data = ref({ isWakeLockEnabled: false, isMessageVisible:false, wakeLockMessage: '', isWakeLockSupported: false });
let wakeLock = null;
let abortHandlerDebounced = null;
let timerId = 0;

const onChange = () => {
    if (data.value.isWakeLockEnabled === true) 
       $requestWakeLock() 
    else
       $releaseWakeLock();
};

const $requestWakeLock = async () => {
    console.log('---> request');
    wakeLock = await navigator.wakeLock.request('screen');
    //Start new timer
    $handleAbortTimer();
    //Only add event listeners after wake lock is successfully enabled               
    document.addEventListener('visibilitychange', $handleVisiblityChange);
    abortHandlerDebounced = debounce($handleAbortTimer, settings.scrollDebounceMs)
    window.addEventListener('scroll', abortHandlerDebounced, true);
    $showWakeLockMessage("Screen Lock Enabled");
    if (window.debugMode) { console.log('Wake Lock Active'); }
};

const $releaseWakeLock = () => {
    try {
        console.log('--->  release');
        wakeLock.release();
        wakeLock = null;
        data.value.isWakeLockEnabled= false;
        //Clear timer
        $handleAbortTimer();
        //Clean up event listeners
        document.removeEventListener('visibilitychange', $handleVisiblityChange);
        window.removeEventListener('scroll', abortHandlerDebounced, true);
        $showWakeLockMessage("Screen Lock Disabled");
        if (window.debugMode) { console.log('Wake Lock Released'); }
    } catch (e) {
        if (window.debugMode) { console.log(`Wake Lock Release Error: ${e.name}, ${e.message}`); }
    }
};

const $handleAbortTimer = () => {
    //If there is an existing timer then clear it and set to zero
    if (timerId !== 0) {
        clearTimeout(timerId);
        timerId = 0;
    }
    //Start new timer; Will be triggered from toggle enabled or scroll event
    if (data.value.isWakeLockEnabled) {
        timerId = setTimeout($releaseWakeLock, settings.timeoutDurationMs);
    }
};

const $handleVisiblityChange = () => {
      //If there is an existing timer then clear it and set to zero
      if (timerId !== 0) {
          clearTimeout(timerId);
          timerId = 0;
      }
      //Start new timer; Will be triggered from toggle enabled or scroll event
      if (data.isWakeLockEnabled) {                    
            timerId = setTimeout(this.$_releaseWakeLock, this.settings.timeoutDurationMs);
      }     
};
const $showWakeLockMessage = (message) => {
      data.value.isMessageVisible = true; 
      data.value.wakeLockMessage  = message;
      setTimeout(()=> data.value.isMessageVisible = false, 2500);
};

data.value.isWakeLockSupported = process.client && 'wakeLock' in navigator && 'request' in navigator.wakeLock;
if (process.client)
   window.debugMode = true; 

</script>
<template>
     <div class="toggles" >        
        <transition name="fade">
         <div class="wakeLockMessage" v-show="data.isMessageVisible" v-text="data.wakeLockMessage"></div>  
         </transition>
      <input type="checkbox" name="styled" id="styled" @change="onChange()" v-model="data.isWakeLockEnabled" >
      <label for="styled"></label>          
   </div>
</template>
<style scoped>
.toggles [type="checkbox"] {
  position: absolute;
  top: auto;
  overflow: hidden;
  clip: rect(1px, 1px, 1px, 1px);
  width: 1px;
  height: 1px;
  white-space: nowrap;
}
.toggles [type="checkbox"] + label {
  display: block;
  position: relative;
  padding: 0.5em;
  padding-left: 4em;
  max-width: calc(100% - 1em);
}
.toggles [type="checkbox"] + label::before,
.toggles [type="checkbox"] + label::after {
  content: "";
  position: absolute;
  height: 1.0em;
  transition: all 0.25s ease;
}
.toggles [type="checkbox"] + label::before {
  left: 0;
  top: 0.0em;
  width: 2.5em;
  border: 0.2em solid #767676;
  background: #767676;
  border-radius: 1.1em;
}
.toggles [type="checkbox"] + label::after {
  left: 0;
  top: 0em;
  background-color: #fff;
  background-position: center center;
  border-radius: 50%;
  width: 1em;
  border: 0.2em solid #412020;
}
.toggles [type="checkbox"]:checked + label::after {
  left: 1.6em;
  border-color: #FFF;
  /*background-color: #3c2946; */
  background-color: rgb(4, 22, 179);
}

.wakeLockMessage {
  position:absolute;
  text-wrap: nowrap;
  bottom: 35px;  
  color: #3c2946;;
  border: solid 2px #3c2946;;
  padding: 8px;
  font-size: 80%; 
  border-radius: 10px;
  background: #FFF;
}

.fade-enter-active, .fade-leave-active {
  transition: opacity .75s;
}
.fade-enter, .fade-leave-to {
  opacity: 0;
}
</style>    