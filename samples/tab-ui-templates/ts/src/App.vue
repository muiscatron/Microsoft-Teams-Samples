<script setup lang="ts">
/**
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */
import { ref, onMounted } from 'vue'
import * as microsoftTeams from "@microsoft/teams-js"
import { themeNames } from "@fluentui/react-teams"

const appContext = ref<microsoftTeams.app.Context>()
const appAppearance = ref<themeNames>(themeNames.Default)

// Initialize Teams theme based on current theme
function initTeamsTheme(theme: string | undefined): themeNames {
  switch (theme) {
    case "dark":
      return themeNames.Dark
    case "contrast":
      return themeNames.HighContrast
    default:
      return themeNames.Default
  }
}

onMounted(() => {
  /**
   * With the context properties in hand, your app has a solid understanding of what's happening around it in Teams.
   * https://docs.microsoft.com/en-us/javascript/api/@microsoft/teams-js/context?view=msteams-client-js-latest&preserve-view=true
   **/
  microsoftTeams.app.getContext().then((context) => {
    appContext.value = context
    appAppearance.value = initTeamsTheme(context.app.theme)

    /**
     * Tells Microsoft Teams platform that we are done saving our settings. Microsoft Teams waits
     * for the app to call this API before it dismisses the dialog. If the wait times out, you will
     * see an error indicating that the configuration settings could not be saved.
     **/
    microsoftTeams.app.notifySuccess()
  })

  /**
   * Theme change handler
   * https://docs.microsoft.com/en-us/javascript/api/@microsoft/teams-js/microsoftteams?view=msteams-client-js-latest#registerOnThemeChangeHandler__theme__string_____void_
   **/
  microsoftTeams.app.registerOnThemeChangeHandler((theme) => {
    appAppearance.value = initTeamsTheme(theme)
  })
})
</script>

<template>
  <div class="app-container">
    <router-view />
  </div>
</template>

<style>
.app-container {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
}
</style>