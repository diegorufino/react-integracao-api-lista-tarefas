import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/styles';

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { 
  listar, 
  salvar,
  deletar, 
  alterarStatus
} from '../../store/tarefasReducer'

import {
  esconderMensagem
} from '../../store/mensagemReducer'

import { TarefasToolbar, TarefasTable } from './components';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle
} from '@material-ui/core'

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(3)
  },
  content: {
    marginTop: theme.spacing(2)
  }
}));

const TarefasList = (props) => {
  const classes = useStyles();

  useEffect(() => {
    props.listar();
  }, [])

  return (
    <div className={classes.root}>
      <TarefasToolbar salvar={props.salvar} />
      <div className={classes.content}>
        <TarefasTable 
          alterarStatus={props.alterarStatus} 
          deleteAction={props.deletar}
          tarefas={props.tarefas} />
      </div>
      <Dialog open={props.openDialog} onClose={e => props.esconderMensagem(false)}>
        <DialogTitle>Atenção</DialogTitle>
        <DialogContent>
          {props.mensagem}
        </DialogContent>
        <DialogActions>
            <Button onClick={e => props.esconderMensagem(false)}>fechar</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

const mapStateToProps = state => ({
  tarefas: state.tarefas.tarefas,
  mensagem: state.mensagens.mensagem,
  openDialog: state.mensagens.mostrarMensagem
})

const mapDisptchToProps = dispatch => 
bindActionCreators({
  listar, 
  salvar, 
  deletar, 
  alterarStatus,
  esconderMensagem
}, dispatch)

export default connect (mapStateToProps, mapDisptchToProps)(TarefasList);
