import { indexedDb } from './indexedDB'
import { sessionStorage } from './sessionStorage'
import { localStorage } from './localStorage'

export const storages = {indexedDb, sessionStorage, localStorage}

export * from "./adapters";
export { setStorage } from "./storage";