import { clearAllTDSelected, createInput, getItemData, getRowAndColumn, getSelectedListData } from '@/utils/tableSelect'

const vTableSelect = {
  // el 是dom对象，bindings是state数据
  mounted (el, bindings) {
    vTableSelect.el = el
    bindEvent(bindings.value)
  }
}

function bindEvent (state) {
  const { el } = vTableSelect
  el.addEventListener('click', handleTDClick.bind(el, state), false)
  el.addEventListener('dblclick', handleTDDbClick.bind(el, state), false)
  el.addEventListener('mousedown', handleTDMouseDown.bind(el, state), false)
  window.addEventListener('click', handleWindowClick.bind(el, state), false)
}

function handleTDClick (...[state, e]) {
  e.stopPropagation()
  const { target } = e
  if (target.tagName === 'TD') {
    const {
      rowIndex,
      columnIndex
    } = getRowAndColumn(target)
    const selectedData = getItemData(state.tableData, rowIndex, columnIndex)
    if (selectedData && state.selectedData !== selectedData) {
      state.selectedData = selectedData
      state.selectedData.selected = true
    }
  }
}

function handleTDDbClick (...[state, e]) {
  e.stopPropagation()
  const { el } = vTableSelect
  el.inputDom && el.inputDom.remove()
  const { target } = e
  if (target.tagName === 'TD') {
    const {
      rowIndex,
      columnIndex
    } = getRowAndColumn(target)

    this.inputDom = createInput(target, state.tableData, rowIndex, columnIndex)
  }
}

function handleTDMouseDown (...[state, e]) {
  e.stopPropagation()
  clearAllTDSelected(state.tableData)

  const { target } = e
  if (target.tagName === 'TD') {
    const {
      rowIndex,
      columnIndex
    } = getRowAndColumn(target)

    this.startRow = rowIndex
    this.startColumn = columnIndex
  }

  const _handlerTDMouseOver = handlerTDMouseOver.bind(this, state)

  document.addEventListener('mouseover', _handlerTDMouseOver, false)
  document.addEventListener('mouseup', handleTDMouseUp, false)

  function handleTDMouseUp () {
    document.removeEventListener('mouseover', _handlerTDMouseOver, false)
    document.removeEventListener('mouseup', handleTDMouseUp, false)
  }
}

function handlerTDMouseOver (...[state, e]) {
  e.stopPropagation()
  const { target } = e
  if (target.tagName === 'TD') {
    const {
      rowIndex,
      columnIndex
    } = getRowAndColumn(target)

    this.endRow = rowIndex
    this.endColumn = columnIndex

    state.selectedListData = getSelectedListData(state.tableData, this.startRow, this.startColumn, this.endRow, this.endColumn)
  }
}

function handleWindowClick (...[state, e]) {
  // this.inputDom && (state.selectedData.content = this.inputDom.value)
  console.log(state)
  state.selectedData = null
  clearAllTDSelected(state.tableData)
}

export default vTableSelect
