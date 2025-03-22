<script setup lang="ts">
import { ref, computed } from 'vue';

type MemberNameCell = {
  label: string;
};

type LocationCell = {
  label: string;
};

type RoleCell = {
  label: string;
};

type Item = {
  MemberName: MemberNameCell;
  Location: LocationCell;
  Role: RoleCell;
};

const items: Item[] = [
  {
    MemberName: { label: "Babak Shammas (no delete)" },
    Location: { label: "Seattle, WA" },
    Role: { label: "Senior analyst" },
  },
  {
    MemberName: { label: "Aadi Kapoor" },
    Location: { label: "Seattle, WA" },
    Role: { label: "Security associate" },
  },
  {
    MemberName: { label: "Aaron Buxton" },
    Location: { label: "Seattle, WA" },
    Role: { label: "Security engineer: Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras in ultricies mi. Sed aliquet odio et magna maximus, et aliquam ipsum faucibus. Sed pulvinar vel nibh eget scelerisque. Vestibulum ornare id felis ut feugiat. Ut vulputate ante non odio condimentum, eget dignissim erat tincidunt. Etiam sodales lobortis viverra. Sed gravida nisi at nisi ornare, non maximus nisi elementum." },
  },
  {
    MemberName: { label: "Alvin Tao (no actions)" },
    Location: { label: "Seattle, WA" },
    Role: { label: "Marketing analyst" },
  },
  {
    MemberName: { label: "Beth Davies" },
    Location: { label: "Seattle, WA" },
    Role: { label: "Senior engineer" },
  },
];

const columns = [
  { columnId: "MemberName", label: "Member Name" },
  { columnId: "Location", label: "Location" },
  { columnId: "Role", label: "Role" },
  { columnId: "", label: "" }
];

const searchQuery = ref("");
const sortColumn = ref("MemberName");
const sortDirection = ref("ascending");

const toggleSort = (columnId: string) => {
  if (sortColumn.value === columnId) {
    sortDirection.value = sortDirection.value === "ascending" ? "descending" : "ascending";
  } else {
    sortColumn.value = columnId;
    sortDirection.value = "ascending";
  }
};

const sortedItems = computed(() => {
  return [...items].sort((a, b) => {
    if (sortColumn.value === "MemberName") {
      const comparison = a.MemberName.label.localeCompare(b.MemberName.label);
      return sortDirection.value === "ascending" ? comparison : -comparison;
    } else if (sortColumn.value === "Location") {
      const comparison = a.Location.label.localeCompare(b.Location.label);
      return sortDirection.value === "ascending" ? comparison : -comparison;
    } else if (sortColumn.value === "Role") {
      const comparison = a.Role.label.localeCompare(b.Role.label);
      return sortDirection.value === "ascending" ? comparison : -comparison;
    }
    return 0;
  });
});

const filteredItems = computed(() => {
  if (!searchQuery.value) return sortedItems.value;
  
  return sortedItems.value.filter((item) => {
    return (
      item.MemberName.label.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      item.Location.label.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      item.Role.label.toLowerCase().includes(searchQuery.value.toLowerCase())
    );
  });
});
</script>

<template>
  <div>
    <div class="toolbar">
      <div class="toolbar-left">
        <button class="add-button">
          <span class="add-icon">+</span> Add
        </button>
      </div>
      <div class="toolbar-right">
        <div class="search-field">
          <input 
            type="text" 
            placeholder="Search" 
            v-model="searchQuery"
            class="search-input"
          />
        </div>
      </div>
    </div>
    
    <table class="data-table">
      <thead>
        <tr>
          <th 
            v-for="column in columns" 
            :key="column.columnId"
            @click="column.columnId ? toggleSort(column.columnId) : null"
            :class="{ 
              sortable: column.columnId, 
              sorted: sortColumn === column.columnId,
              'sort-asc': sortColumn === column.columnId && sortDirection === 'ascending',
              'sort-desc': sortColumn === column.columnId && sortDirection === 'descending'
            }"
          >
            {{ column.label || column.columnId }}
            <span v-if="column.columnId && sortColumn === column.columnId" class="sort-indicator">
              {{ sortDirection === 'ascending' ? '▲' : '▼' }}
            </span>
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, index) in filteredItems" :key="index">
          <td>{{ item.MemberName.label }}</td>
          <td>{{ item.Location.label }}</td>
          <td>{{ item.Role.label }}</td>
          <td class="actions-cell">
            <button v-if="item.MemberName.label !== 'Alvin Tao (no actions)'" class="menu-button">⋯</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<style scoped>
.toolbar {
  background-color: #f4f4f4;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
  padding: 8px 16px;
  margin-bottom: 2px;
  z-index: 20;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.toolbar-left {
  display: flex;
  align-items: center;
}

.toolbar-right {
  margin-left: auto;
}

.add-button {
  display: flex;
  align-items: center;
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 6px 12px;
  font-size: 14px;
}

.add-icon {
  font-size: 18px;
  margin-right: 4px;
}

.search-field {
  padding: 4px 8px;
}

.search-input {
  padding: 6px 12px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 14px;
  min-width: 200px;
}

.data-table {
  width: 100%;
  border-collapse: collapse;
  background-color: #f9f9f9;
}

.data-table th, .data-table td {
  padding: 12px 16px;
  text-align: left;
  border-bottom: 1px solid #ddd;
}

.data-table th {
  font-weight: 600;
  background-color: #f0f0f0;
}

.sortable {
  cursor: pointer;
}

.sorted {
  background-color: #e6e6e6;
}

.sort-indicator {
  margin-left: 5px;
  font-size: 10px;
}

.actions-cell {
  text-align: center;
}

.menu-button {
  background: transparent;
  border: none;
  cursor: pointer;
  font-size: 18px;
}
</style>