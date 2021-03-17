import { combineReducers } from 'redux'

import { tarefaReducer } from './tarefasReducer'
import { mensagemReducer } from './mensagemReducer'

const mainReducer = combineReducers({
    tarefas: tarefaReducer,
    mensagens: mensagemReducer
})

export default mainReducer;