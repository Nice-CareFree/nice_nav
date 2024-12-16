<template>
  <DropdownMenuRoot v-bind="$attrs">
    <slot />
  </DropdownMenuRoot>
</template>

<script lang="ts" setup>
import { DropdownMenuRoot } from 'radix-vue'
</script> 