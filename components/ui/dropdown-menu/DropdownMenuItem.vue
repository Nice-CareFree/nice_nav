<template>
  <DropdownMenuItem
    v-bind="$attrs"
    :class="cn(
      'relative flex cursor-pointer select-none items-center gap-2 rounded-md px-3 py-2 text-sm outline-none transition-colors hover:bg-gray-100 focus:bg-gray-100 data-[disabled]:pointer-events-none data-[disabled]:opacity-50',
      className
    )"
  >
    <slot />
  </DropdownMenuItem>
</template>

<script lang="ts" setup>
import { DropdownMenuItem } from 'radix-vue'
import { cn } from '@/lib/utils'

defineProps<{
  className?: string
}>()</script> 