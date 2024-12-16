<template>
  <DropdownMenuTrigger v-bind="$attrs" :class="cn('flex cursor-default select-none items-center justify-between rounded-sm px-2 py-1.5 text-sm outline-none focus:bg-accent data-[state=open]:bg-accent', className)">
    <slot />
  </DropdownMenuTrigger>
</template>

<script lang="ts" setup>
import { DropdownMenuTrigger } from 'radix-vue'
import { cn } from '@/lib/utils'

defineProps<{
  className?: string
}>()</script> 