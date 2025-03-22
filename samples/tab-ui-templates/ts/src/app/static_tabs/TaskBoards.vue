<script setup lang="ts">
import { ref } from 'vue';
import { fake, image } from 'faker';

interface User {
  name: string;
  image?: string;
}

interface BoardItem {
  lane: string;
  order: number;
  title: string;
  subtitle?: string;
  body?: string;
  preview?: string;
  users?: string[];
  badges?: {
    attachments?: number;
  };
}

interface Lane {
  title: string;
  items: BoardItem[];
}

// Helper functions
const range = (start: number, end: number): number[] => {
  const out = [];
  while (start < end) out.push(start++);
  return out;
};

const shuffle = <T,>(xs: T[]): T[] => {
  const shuffled = [...xs];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

// Generate users
const usersRange = range(1, 25);
const userImages = [
  'https://fabricweb.azureedge.net/fabric-website/assets/images/avatar/KatriAthokas.jpg',
  'https://fabricweb.azureedge.net/fabric-website/assets/images/avatar/ElviaAtkins.jpg',
  'https://fabricweb.azureedge.net/fabric-website/assets/images/avatar/ErikNason.jpg',
  'https://fabricweb.azureedge.net/fabric-website/assets/images/avatar/IsaacFielder.jpg',
  'https://fabricweb.azureedge.net/fabric-website/assets/images/avatar/JohnieHampton.jpg',
  'https://fabricweb.azureedge.net/fabric-website/assets/images/avatar/MiguelGarcia.jpg',
  'https://fabricweb.azureedge.net/fabric-website/assets/images/avatar/CarolePoland.jpg'
];

const generateUsers = () => {
  return shuffle(
    usersRange.filter(() => Math.random() > 0.67).map((idx) => `u${idx}`)
  );
};

// Generate board data
const users = usersRange.reduce((acc: Record<string, User>, i: number) => {
  acc[`u${i}`] = {
    name: fake("{{name.findName}}"),
    ...(Math.random() > 0.33 ? { image: userImages[i % userImages.length] } : {}),
  };
  return acc;
}, {});

const lanes = ref<Record<string, Lane>>({
  l1: {
    title: fake("{{commerce.department}}"),
    items: []
  },
  l2: {
    title: fake("{{commerce.department}}"),
    items: []
  },
  l3: {
    title: fake("{{commerce.department}}"),
    items: []
  },
  l4: {
    title: fake("{{commerce.department}}"),
    items: []
  },
  l5: {
    title: fake("{{commerce.department}}"),
    items: []
  }
});

// Generate items
let itemIndex = 0;
for (let li = 2; li < 6; li++) {
  for (let lo = 0; lo < (li - 1) * 2; lo++) {
    const laneKey = `l${li}`;
    const newItem: BoardItem = {
      lane: laneKey,
      order: lo,
      title: fake("{{commerce.productAdjective}} {{commerce.productMaterial}} {{commerce.product}}"),
      ...(Math.random() > 0.33 ? { subtitle: fake("{{company.catchPhrase}}") } : {}),
      ...(Math.random() > 0.33 ? { body: fake("{{lorem.sentence}}") } : {}),
      ...(Math.random() > 0.33 ? { preview: image.image() } : {}),
      ...(Math.random() > 0.33 ? { users: generateUsers() } : {}),
      ...(Math.random() > 0.5 ? { badges: { attachments: Math.max(1, Math.floor(999 * Math.random())) } } : {})
    };
    
    if (lanes.value[laneKey]) {
      lanes.value[laneKey].items.push(newItem);
    }
    
    itemIndex++;
  }
}

// Sort items by order
Object.keys(lanes.value).forEach(laneKey => {
  lanes.value[laneKey].items.sort((a, b) => a.order - b.order);
});

const onDragStart = (event: DragEvent, item: BoardItem) => {
  if (event.dataTransfer) {
    event.dataTransfer.setData('itemData', JSON.stringify(item));
    event.dataTransfer.effectAllowed = 'move';
  }
};

const onDragOver = (event: DragEvent) => {
  event.preventDefault();
  if (event.dataTransfer) {
    event.dataTransfer.dropEffect = 'move';
  }
};

const onDrop = (event: DragEvent, targetLane: string) => {
  event.preventDefault();
  if (!event.dataTransfer) return;
  
  const itemData = event.dataTransfer.getData('itemData');
  if (!itemData) return;
  
  const draggedItem: BoardItem = JSON.parse(itemData);
  const sourceLane = draggedItem.lane;
  
  if (sourceLane === targetLane) return;
  
  // Remove from source lane
  const sourceItems = lanes.value[sourceLane].items;
  const itemIndex = sourceItems.findIndex(i => 
    i.title === draggedItem.title && i.order === draggedItem.order
  );
  
  if (itemIndex > -1) {
    sourceItems.splice(itemIndex, 1);
    
    // Add to target lane
    const updatedItem = { ...draggedItem, lane: targetLane };
    lanes.value[targetLane].items.push(updatedItem);
    
    // Reorder items
    lanes.value[targetLane].items.forEach((item, idx) => {
      item.order = idx;
    });
  }
};

function getUserName(userId: string): string {
  return users[userId]?.name || 'Unknown User';
}

function getUserImage(userId: string): string | undefined {
  return users[userId]?.image;
}
</script>

<template>
  <div class="task-board">
    <div class="lanes-container">
      <div 
        v-for="(lane, laneId) in lanes" 
        :key="laneId"
        class="lane"
        @dragover="onDragOver"
        @drop="onDrop($event, laneId)"
      >
        <div class="lane-header">
          <h3>{{ lane.title }}</h3>
        </div>
        
        <div class="lane-items">
          <div 
            v-for="(item, index) in lane.items" 
            :key="`${laneId}-${index}`"
            class="board-item"
            draggable="true"
            @dragstart="onDragStart($event, item)"
          >
            <div v-if="item.preview" class="item-preview">
              <img :src="item.preview" alt="Preview" />
            </div>
            
            <div class="item-content">
              <h4 class="item-title">{{ item.title }}</h4>
              <div v-if="item.subtitle" class="item-subtitle">{{ item.subtitle }}</div>
              <div v-if="item.body" class="item-body">{{ item.body }}</div>
            </div>
            
            <div class="item-footer">
              <div v-if="item.users && item.users.length > 0" class="item-users">
                <div 
                  v-for="(userId, userIndex) in item.users.slice(0, 3)" 
                  :key="userIndex"
                  class="user-avatar"
                  :title="getUserName(userId)"
                >
                  <img v-if="getUserImage(userId)" :src="getUserImage(userId)" :alt="getUserName(userId)" />
                  <div v-else class="avatar-placeholder">
                    {{ getUserName(userId).charAt(0) }}
                  </div>
                </div>
                <div v-if="item.users.length > 3" class="more-users">
                  +{{ item.users.length - 3 }}
                </div>
              </div>
              
              <div v-if="item.badges?.attachments" class="item-badges">
                <span class="badge">
                  📎 {{ item.badges.attachments }}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.task-board {
  padding: 20px;
  overflow-x: auto;
}

.lanes-container {
  display: flex;
  gap: 20px;
  min-height: 600px;
}

.lane {
  background-color: #f0f0f0;
  border-radius: 4px;
  width: 300px;
  min-width: 300px;
  display: flex;
  flex-direction: column;
  max-height: 100%;
}

.lane-header {
  padding: 16px;
  background-color: #e0e0e0;
  border-radius: 4px 4px 0 0;
}

.lane-header h3 {
  margin: 0;
  font-size: 16px;
  font-weight: 600;
}

.lane-items {
  padding: 8px;
  overflow-y: auto;
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.board-item {
  background-color: white;
  border-radius: 4px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12);
  cursor: pointer;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.board-item:hover {
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.16);
}

.item-preview {
  width: 100%;
  height: 140px;
  overflow: hidden;
}

.item-preview img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.item-content {
  padding: 12px;
}

.item-title {
  margin: 0 0 6px 0;
  font-size: 14px;
  font-weight: 600;
}

.item-subtitle {
  font-size: 12px;
  color: #666;
  margin-bottom: 8px;
}

.item-body {
  font-size: 12px;
  color: #333;
}

.item-footer {
  padding: 8px 12px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-top: 1px solid #f0f0f0;
}

.item-users {
  display: flex;
  align-items: center;
}

.user-avatar {
  width: 24px;
  height: 24px;
  border-radius: 50%;
  overflow: hidden;
  margin-right: -8px;
  border: 2px solid white;
}

.user-avatar img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.avatar-placeholder {
  width: 100%;
  height: 100%;
  background-color: #6264a7;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 10px;
  font-weight: bold;
}

.more-users {
  margin-left: 12px;
  font-size: 12px;
  color: #666;
}

.item-badges {
  display: flex;
}

.badge {
  font-size: 12px;
  color: #666;
  display: flex;
  align-items: center;
}
</style>