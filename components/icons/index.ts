import { h } from 'vue'
import type { Icon as LucideIcon } from 'lucide-vue-next'

// 微信图标
export const LucideWechat = {
  name: 'LucideWechat',
  render() {
    return h('svg', {
      xmlns: 'http://www.w3.org/2000/svg',
      width: '24',
      height: '24',
      viewBox: '0 0 24 24',
      fill: 'none',
      stroke: 'currentColor',
      strokeWidth: '2',
      strokeLinecap: 'round',
      strokeLinejoin: 'round'
    }, [
      h('path', {
        d: 'M8.5 4.5C5.46243 4.5 3 6.96243 3 10C3 11.2426 3.41649 12.3875 4.11274 13.3186L3 16L5.68141 14.8873C6.61251 15.5835 7.75736 16 9 16C12.0376 16 14.5 13.5376 14.5 10.5C14.5 7.46243 12.0376 5 9 5'
      }),
      h('path', {
        d: 'M15.5 8.5C12.4624 8.5 10 10.9624 10 14C10 15.2426 10.4165 16.3875 11.1127 17.3186L10 20L12.6814 18.8873C13.6125 19.5835 14.7574 20 16 20C19.0376 20 21.5 17.5376 21.5 14.5C21.5 11.4624 19.0376 9 16 9'
      })
    ])
  }
} as LucideIcon

// QQ图标
export const LucideQq = {
  name: 'LucideQq',
  render() {
    return h('svg', {
      xmlns: 'http://www.w3.org/2000/svg',
      width: '24',
      height: '24',
      viewBox: '0 0 24 24',
      fill: 'none',
      stroke: 'currentColor',
      strokeWidth: '2',
      strokeLinecap: 'round',
      strokeLinejoin: 'round'
    }, [
      h('path', {
        d: 'M12 2C7.28595 2 4 6.47714 4 12C4 14.7385 5.2066 17.1464 7.09193 18.8369C7.01041 19.1444 6.91434 19.4426 6.80435 19.7307C6.35278 20.8697 5.77795 21.7957 5.08984 22.4824C6.95787 21.9443 8.52741 21.0619 9.77148 19.9512C10.4903 20.1102 11.2356 20.1936 12 20.1936C16.714 20.1936 20 16.5228 20 12C20 7.47714 16.714 2 12 2Z'
      })
    ])
  }
} as LucideIcon 