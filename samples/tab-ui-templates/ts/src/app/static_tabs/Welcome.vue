<script setup lang="ts">
import { Box, Flex, Grid } from '@fluentui/vue-components';

import platformUiImage from '../../assets/images/platform-ui.jpg';
import teamsTemplatesImage from '../../assets/images/teams-templates.jpg';
import teamsAppsImage from '../../assets/images/teams-apps.jpg';
import visualStudioImage from '../../assets/images/visual-studio.jpg';

interface ResourceCardLink {
  label: string;
  href: string;
}

interface ResourceCard {
  imageUrl: string;
  title: string;
  desc: string;
  links: ResourceCardLink[];
}

const resources: ResourceCard[] = [
  {
    imageUrl: platformUiImage,
    title: "Design with the Teams UI Kit",
    desc: "The Microsoft Teams UI Kit includes UI components, templates, best practices, and other comprehensive resources to help design your Teams app.",
    links: [
      {
        label: "Get the UI Kit",
        href: "https://www.figma.com/community/file/916836509871353159",
      },
    ],
  },
  {
    imageUrl: teamsTemplatesImage,
    title: "Use Teams app templates",
    desc: "Browse our collection of production-ready, open-source apps that you can customize or deploy right away to Teams.",
    links: [
      {
        label: "See the templates",
        href: "https://docs.microsoft.com/en-us/microsoftteams/platform/samples/app-templates",
      },
    ],
  },
  {
    imageUrl: teamsAppsImage,
    title: "Learn Teams development",
    desc: "Are you new to Teams development? To familiarize yourself, quickly build a \"Hello, World!\" app or read all about how Teams apps work.",
    links: [
      {
        label: "See more",
        href: "https://docs.microsoft.com/en-us/microsoftteams/platform/overview",
      },
    ],
  },
  {
    imageUrl: visualStudioImage,
    title: "Build with the Teams Toolkit",
    desc: "The Microsoft Teams Toolkit extension is the fastest way to build, test, and deploy your app to Teams.",
    links: [
      {
        label: "Get the Visual Studio Code extension",
        href: "https://marketplace.visualstudio.com/items?itemName=TeamsDevApp.vsteamstemplate&ssr=false",
      },
      {
        label: "Get the Visual Studio extension",
        href: "https://marketplace.visualstudio.com/items?itemName=TeamsDevApp.vsteamstemplate&ssr=false",
      },
    ],
  },
];
</script>

<template>
  <div class="welcome-container">
    <h1>Welcome to our Teams Sample App</h1>
    <div>
      <p class="description">
        The Teams Sample App can help you better understand how your app should
        look and behave in Teams depending on the scenario. Select a UI template
        above (for example, Forms) to get started. To learn more, see the
        following resources.
      </p>
    </div>
    <br /><br />
    <h2>Resources</h2>
    <div class="resources-grid">
      <div v-for="(resource, index) in resources" :key="index" class="resource-card">
        <img :src="resource.imageUrl" :alt="resource.title" class="resource-image" />
        <h3 class="resource-title">{{ resource.title }}</h3>
        <p class="resource-desc">{{ resource.desc }}</p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.welcome-container {
  margin: 1.6rem 1.25rem;
}

h1 {
  font-size: 1.25rem;
  font-weight: bold;
}

h2 {
  font-size: 1.25rem;
  font-weight: bold;
}

.description {
  margin-bottom: 3vh;
  opacity: .65;
  max-width: 50rem;
}

.resources-grid {
  display: inline-flex;
  flex-wrap: wrap;
  justify-content: space-between;
  gap: 2rem;
  padding: 0 1rem 1.25rem;
  margin: 1.5rem -1rem;
}

.resource-card {
  max-width: 23vw;
  margin-left: 5px;
  margin-right: 5px;
}

.resource-image {
  border-radius: 4px;
  box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.1), 0px 1px 5px rgba(0, 0, 0, 0.06);
  max-width: 23vw;
}

.resource-title {
  margin: 2rem 0 .5rem;
  font-size: 1.25rem;
  font-weight: 600;
}

.resource-desc {
  margin: .5rem 0 2rem;
  flex-grow: 1;
  opacity: .65;
}
</style>