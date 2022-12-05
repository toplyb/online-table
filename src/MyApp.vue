<template>
  <div>
    <table>
      <tr v-for="(item, rowIndex) in state.tableData" :key="item.row">
        <td>{{ item.row }}</td>
        <td ref="tdItem" @dblclick="dbSelectTdItem(rowIndex, columnIndex, data.content, $event)" @click="selectTdItem(rowIndex, columnIndex)" :class="{'selected': data.selected}" v-for="(data, columnIndex) in item.data" :key="data.id">{{ data.content }}</td>
      </tr>
    </table>
  </div>
</template>

<script setup>
import { onMounted, reactive, ref } from 'vue'

const tdItem = ref('tdItem')

const tableData = [
  {
    row: 'X',
    data: [
      {
        id: 1,
        content: 1,
        selected: false
      },
      {
        id: 2,
        content: 2,
        selected: false
      },
      {
        id: 3,
        content: 3,
        selected: false
      },
      {
        id: 4,
        content: 4,
        selected: false
      }
    ]
  },
  {
    row: 'Y',
    data: [
      {
        id: 5,
        content: 5,
        selected: false
      },
      {
        id: 6,
        content: 6,
        selected: false
      },
      {
        id: 7,
        content: 7,
        selected: false
      },
      {
        id: 8,
        content: 8,
        selected: false
      }
    ]
  },
  {
    row: 'Z',
    data: [
      {
        id: 9,
        content: 9,
        selected: false
      },
      {
        id: 10,
        content: 10,
        selected: false
      },
      {
        id: 11,
        content: 11,
        selected: false
      },
      {
        id: 12,
        content: 12,
        selected: false
      }
    ]
  }
]

const state = reactive({
  tableData,
  selectedData: null,
  selectedListData: []
})

const selectTdItem = (rowIndex, columnIndex) => {
  changeAllTDItemStatus()

  state.tableData[rowIndex].data[columnIndex].selected = true
}

const dbSelectTdItem = (rowIndex, columnIndex, value, event) => {
  // event.stopPropagation()
  const tdItemDom = event.target
  tdItemDom.innerText = ''
  const inputDom = document.createElement('input')
  inputDom.type = 'input'
  inputDom.value = value
  inputDom.focus()
  tdItemDom.appendChild(inputDom)

  inputDom.addEventListener('blur', (e) => {
    state.tableData[rowIndex].data[columnIndex].content = e.target.value
    state.tableData[rowIndex].data[columnIndex].selected = false
    tdItemDom.removeChild(inputDom)
    tdItemDom.innerText = state.tableData[rowIndex].data[columnIndex].content
  })
}

onMounted(() => {
  window.addEventListener('click', (e) => {
    if (e.target.tagName !== 'TD' && e.target.tagName !== 'INPUT') {
      changeAllTDItemStatus()
      deleteAllInput()
    }
  })
})

const changeAllTDItemStatus = () => {
  state.tableData.forEach(rowData => {
    const columnDataList = rowData.data
    columnDataList.forEach(columnData => {
      columnData.selected = false
    })
  })
}
const deleteAllInput = () => {
  const allInput = document.querySelectorAll('input')
  allInput.forEach(input => {
    input.remove()
  })
}
</script>

<style>
body {
  user-select: none;
}

table {
  width: 800px;
  border-collapse: collapse;
  table-layout: fixed;
  text-align: center;
  box-sizing: border-box;
  font-size: 14px;
}

td {
  height: 30px;
  cursor: pointer;
  border: 1px solid black;
  box-sizing: border-box;
}

td.selected {
  border: 3px solid #2929c7;
}

input {
  width: 100%;
  height: 100%;
  border: none;
  padding: 0;
  text-align: center;
  outline: none;
}
</style>
