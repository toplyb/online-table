export function getRowAndColumn (target) {
  const { dataset } = target
  return {
    rowIndex: Number(dataset.rowIndex),
    columnIndex: Number(dataset.columnIndex)
  }
}

export function getItemData (data, rowIndex, columnIndex) {
  let result = null
  data.forEach((row, i) => {
    if (i === rowIndex) {
      row.data.forEach((column, j) => {
        if (j === columnIndex) {
          result = column
        }
      })
    }
  })
  return result
}

export function clearAllTDSelected (data) {
  data.forEach(row => {
    row.data.forEach(column => {
      column.selected = false
    })
  })
}

export function getSelectedListData (data, startRow, startColumn, endRow, endColumn) {
  const result = []

  if (startRow <= endRow) {
    for (let i = startRow; i <= endRow; i++) {
      getColumnData(data[i].data, startColumn, endColumn)
    }
  } else {
    for (let i = startRow; i >= endRow; i--) {
      getColumnData(data[i].data, startColumn, endColumn)
    }
  }

  function getColumnData (rowData, startColumn, endColumn) {
    if (startColumn <= endColumn) {
      for (let j = startColumn; j <= endColumn; j++) {
        pushColumnData(rowData[j])
      }
    } else {
      for (let j = startColumn; j >= endColumn; j--) {
        pushColumnData(rowData[j])
      }
    }

    function pushColumnData (columnData) {
      columnData.selected = true
      result.push(columnData)
    }
  }
  return result
}

export function createInput (target, data, rowIndex, columnIndex) {
  const { content } = getItemData(data, rowIndex, columnIndex)
  const inputDom = document.createElement('input')
  inputDom.type = 'text'
  inputDom.value = content
  inputDom.onfocus = inputDom.select
  inputDom.style.cssText = 'position: absolute; top: 0; left: 0; bottom: 0; right: 0; border: none; outline: none; padding: 0; box-sizing: border-box; text-align: center;'
  inputDom.focus()
  target.appendChild(inputDom)
  return inputDom
}
