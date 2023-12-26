<template>
  <div>
    <div class="head">
      <slot name="head">
      </slot>
    </div>
    <div class="main">
      <slot name="main"></slot>
    </div>
    <slot></slot>
    <div class="foot">
      <slot name="foot"></slot>
    </div>
  </div>
</template>
<style>
html,
body,
div,
span,
applet,
object,
iframe,
h1,
h2,
h3,
h4,
h5,
h6,
p,
blockquote,
pre,
a,
abbr,
acronym,
address,
big,
cite,
code,
del,
dfn,
em,
img,
ins,
kbd,
q,
s,
samp,
small,
strike,
strong,
sub,
sup,
tt,
var,
b,
u,
i,
center,
dl,
dt,
dd,
ol,
ul,
li,
fieldset,
form,
label,
legend,
table,
caption,
tbody,
tfoot,
thead,
tr,
th,
td,
article,
aside,
canvas,
details,
embed,
figure,
figcaption,
footer,
header,
hgroup,
menu,
nav,
output,
ruby,
section,
summary,
time,
mark,
audio,
video {
  margin: 0;
  padding: 0;
  border: 0;
  font-size: 100%;
  font: inherit;
  vertical-align: baseline;
}

h1,
h2,
h3,
h4,
h5,
h6,
label {
  font-weight: bold;
  color: #3d85c6; 
}

input {
  box-sizing: border-box
}

li {
  list-style-type: none;
}

h1 {
  font-size: 2rem;
}

h2 {
  font-size: 1.5rem;
}

h3 {
  font-size: 1rem;
}

body {
  font-family: 'Lato', sans-serif;
}

body {
  min-height: 90vh;
}

.head {
  position: fixed;
  width: 100%;
  top: 0;
  left: 0;
  border-bottom: solid 1px #000;
  background-color: #3d85c6;
  color: #FFF;
}

.main {
  width: 90%;
  margin: 75px auto 0 auto;
}

@media (min-width: 1000px) {
  .main {
    width: 50%;
  }
}

.foot {
  position: fixed;
  width: 100%;
  bottom: 0px;
  left: 0;
  vertical-align: center;
}

.search-results-count {
  text-align: right;
}

.search-input { 
    width:100%;
     border-radius: 5px;
    font-size: 1.3em;
    padding: 5px
}

.search-results-count { margin: 5px;}

 
   
   
</style>