<template>
  <DropdownMenuCheckboxItem
    v-bind="$attrs"
    :class="cn(
      'relative flex cursor-pointer select-none items-center rounded-md py-2 pl-9 pr-3 text-sm outline-none transition-colors hover:bg-gray-100 focus:bg-gray-100 data-[disabled]:pointer-events-none data-[disabled]:opacity-50',
      className
    )"
  >
    <span class="absolute left-3 flex h-4 w-4 items-center justify-center">
      <DropdownMenuItemIndicator>
        <div class="h-4 w-4 rounded border border-primary flex items-center justify-center data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground">
          <LucideCheck class="h-3 w-3" />
        </div>
      </DropdownMenuItemIndicator>
    </span>
    <slot />
  </DropdownMenuCheckboxItem>
</template>

<script lang="ts" setup>
import { DropdownMenuCheckboxItem, DropdownMenuItemIndicator } from 'radix-vue'
import { LucideCheck } from 'lucide-vue-next'
import { cn } from '@/lib/utils'

defineProps<{
  className?: string
}>()</script> 