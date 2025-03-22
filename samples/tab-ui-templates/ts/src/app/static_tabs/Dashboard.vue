<script setup lang="ts">
import { ref, computed } from 'vue';

interface TabItem {
  id: string;
  title: string;
  value: string;
}

interface Widget {
  title: string;
  desc?: string;
  size: string;
  body?: TabItem[];
  link?: { href: string };
}

const linkExample = { href: "#" };

const selectedValue = ref("Tab1");

const defaultWidgets: Widget[] = [
  {
    title: "Card 1",
    desc: "Last updated Monday, April 4 at 11:15 AM (PT)",
    size: "75%",
    body: [
      {
        id: "t1",
        title: "Tab 1",
        value: "Tab1"
      },
      {
        id: "t2",
        title: "Tab 2",
        value: "Tab2"
      },
      {
        id: "t3",
        title: "Tab 3",
        value: "Tab3"
      },
    ],
    link: linkExample,
  },
  {
    title: "Card 2",
    size: "20%",
    link: linkExample,
  },
  {
    title: "Card 3",
    size: "55%",
    link: linkExample,
  },
  {
    title: "Card 4",
    size: "20%",
    link: linkExample,
  },
  {
    title: "Card 5",
    size: "20%",
    link: linkExample,
  },
  {
    title: "Card 6",
    size: "100%",
    link: linkExample,
  },
];

const onTabSelect = (value: string) => {
  selectedValue.value = value;
};
</script>

<template>
  <div class="dashboard-container">
    <div v-for="(widget, index) in defaultWidgets" :key="index" class="card" :style="{ width: widget.size }">
      <div class="card-header">
        <div>
          <div class="card-title">{{ widget.title }}</div>
          <div v-if="widget.desc" class="card-description">{{ widget.desc }}</div>
        </div>
        <div class="card-actions">
          <button class="menu-button">⋯</button>
        </div>
      </div>
      <div class="card-content">
        <div v-if="widget.body" class="tab-list">
          <button 
            v-for="tab in widget.body" 
            :key="tab.id"
            class="tab-button"
            :class="{ 'selected': selectedValue === tab.value }"
            @click="onTabSelect(tab.value)"
          >
            {{ tab.title }}
          </button>
        </div>
        <div class="tab-content">
          <div v-if="widget.body && selectedValue === 'Tab1'" class="content-box">Content #1</div>
          <div v-else-if="widget.body && selectedValue === 'Tab2'" class="content-box">Content #2</div>
          <div v-else-if="widget.body && selectedValue === 'Tab3'" class="content-box">Content #3</div>
          <div v-else class="content-box"></div>
        </div>
      </div>
      <div class="card-footer">
        <a :href="widget.link?.href">View more</a>
      </div>
    </div>
  </div>
</template>

<style scoped>
.dashboard-container {
  display: flex;
  flex-wrap: wrap;
}

.card {
  margin: 10px;
  padding: 15px;
  border: 1px solid #ccc;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 15px;
}

.card-title {
  font-weight: bold;
  font-size: 16px;
}

.card-description {
  font-size: 12px;
  color: #666;
}

.card-actions {
  display: flex;
}

.menu-button {
  background: transparent;
  border: none;
  cursor: pointer;
  font-size: 18px;
}

.tab-list {
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
}

.tab-button {
  background: transparent;
  border: none;
  padding: 5px 10px;
  cursor: pointer;
  border-bottom: 2px solid transparent;
}

.tab-button.selected {
  border-bottom: 2px solid #6264A7;
  font-weight: bold;
}

.tab-content {
  width: 100%;
  margin-bottom: 20px;
}

.content-box {
  width: auto;
  height: 200px;
  border: 2px dotted #727272;
  display: flex;
  justify-content: center;
  align-items: center;
}

.card-footer {
  margin-top: auto;
}
</style>