import { type VariantProps } from 'class-variance-authority'

export { default as Tooltip } from './Tooltip.vue'
export { default as TooltipTrigger } from './TooltipTrigger.vue'
export { default as TooltipContent } from './TooltipContent.vue'
export { default as TooltipProvider } from './TooltipProvider.vue'

export type TooltipProps = {
  text: string
  side?: 'top' | 'right' | 'bottom' | 'left'
  delayDuration?: number
} 