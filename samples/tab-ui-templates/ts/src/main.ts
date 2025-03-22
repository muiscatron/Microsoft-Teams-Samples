/**
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */

import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import * as microsoftTeams from "@microsoft/teams-js"
import reportWebVitals from "./report-web-vitals"
import App from './App.vue'
import { routes } from './router'

// Initialize the Microsoft Teams SDK
microsoftTeams.app.initialize()

// Create router
const router = createRouter({
  history: createWebHistory(),
  routes
})

// Create and mount the Vue app
createApp(App)
  .use(router)
  .mount('#app')

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()