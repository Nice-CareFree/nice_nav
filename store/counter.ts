import { defineStore } from 'pinia'

interface CounterState {
    setting:any
}

// @ts-ignore
export const useCounter = defineStore('counter', {
    state: (): CounterState => ({
        setting: {}
    }),

    actions: {
        increment() {
            this.setting
        }
    },
    getters: {
        doubleCount() {
            return this.setting
        }
    },
    persist: process.client && {
        storage: persistedState.cookiesWithOptions({
            sameSite: 'strict',
        }),
        paths: ['setting']
    }
})
