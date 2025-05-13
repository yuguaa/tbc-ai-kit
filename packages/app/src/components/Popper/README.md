```vue
<template>
  <popper
    trigger="clickToOpen"
    :options="{
      placement: 'top',
      modifiers: { offset: { offset: '0,10px' } },
    }"
  >
    <div class="popper">Popper Content</div>

    <button slot="reference">Reference Element</button>
  </popper>
</template>
```
