<script setup>
const isShareEnabled = process.client && navigator.share;
const share = () => {
    if(process.client && navigator.share){              
         navigator.share( {url: window.location });
    }
};
</script>
<template>
    <div class="share-button" ><span class="share" @click="share">
            <svg width="24px" height="24px" class="icon" viewBox="0 0 24 24">
                <path
                    d="M18 16c-.79 0-1.5.31-2.03.81L8.91 12.7c.05-.23.09-.46.09-.7s-.04-.47-.09-.7l7.05-4.11c.53.5 1.25.81 2.04.81 1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3c0 .24.04.48.09.7L8.04 9.81C7.5 9.31 6.79 9 6 9c-1.66 0-3 1.34-3 3s1.34 3 3 3c.79 0 1.5-.31 2.04-.81l7.05 4.12c-.05.22-.09.45-.09.69 0 1.66 1.34 3 3 3s3-1.34 3-3-1.34-3-3-3zm0-12c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zM6 13c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1zm12 7c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1z">
                </path>
            </svg>
        </span>
    </div>
</template>
<style>
  .icon { fill: #FFF;  height:1.25em; width:1.25em; }
</style>