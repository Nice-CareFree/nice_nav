import { type VariantProps } from 'class-variance-authority'
import { buttonVariants } from './button-variants'

export { default as Button } from './Button.vue'
export { buttonVariants }

export type ButtonVariants = VariantProps<typeof buttonVariants>
