const ESTADO_INICIAL = {
    mensagem: 'Olá',
    mostrarMensagem: true
}

export const ACTIONS = {
    MOSTRAR_MENSAGEM: 'MOSTRAR_MENSAGEM',
    ESCONDER_MENSAGEM: 'ESCONDER_MENSAGEM'
}

export function mensagemReducer(state = ESTADO_INICIAL, action){
    switch(action.type){
        case ACTIONS.MOSTRAR_MENSGAEM:
            return {...state, mensagem: action.mensagem, mostrarMensagem: true}
        case ACTIONS.ESCONDER_MENSAGEM:
            return {...state, mensagem: '', mostrarMensagem: false}
        default:
            return state;
    }
}

export function mostrarMensagem(mensagem){
    return {
        type: ACTIONS.MOSTRAR_MENSAGEM,
        mensagem: mensagem
    }
}

export function esconderMensagem(){
    return {
        type: ACTIONS.ESCONDER_MENSAGEM
    }
}