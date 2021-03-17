import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/styles';

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { listar, salvar, deletar } from '../../store/tarefasReducer'

import { TarefasToolbar, TarefasTable } from './components';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle
} from '@material-ui/core'
import axios from 'axios'

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(3)
  },
  content: {
    marginTop: theme.spacing(2)
  }
}));

const API_URL = 'https://minhastarefas-api.herokuapp.com/tarefas';

const TarefasList = (props) => {
  const classes = useStyles();

  const [tarefas, setTarefas] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [mensagem, setMensagem] = useState('')

  const alterarStatus = (id) => {
    axios.patch(`${API_URL}/${id}`, null, {
      headers: {'x-tenant-id' : localStorage.getItem('email_usuario_logado')}
    }).then(response => {
      const lista = [...tarefas]
      lista.forEach(tarefa => {
        if(tarefa.id === id){
          tarefa.done = true;
        }
      })
      setTarefas(lista)
      setMensagem('Item atualizado com sucesso')
      setOpenDialog(true)
    }).catch(erro => {
      setMensagem('Ocorreu um erro')
      setOpenDialog(true)
    })
  }

  useEffect(() => {
    props.listar();
  }, [])

  return (
    <div className={classes.root}>
      <TarefasToolbar salvar={props.salvar} />
      <div className={classes.content}>
        <TarefasTable 
          alterarStatus={alterarStatus} 
          deleteAction={props.deletar}
          tarefas={props.tarefas} />
      </div>
      <Dialog open={openDialog} onClose={e => setOpenDialog(false)}>
        <DialogTitle>Atenção</DialogTitle>
        <DialogContent>
          {mensagem}
        </DialogContent>
        <DialogActions>
            <Button onClick={e => setOpenDialog(false)}>fechar</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

const mapStateToProps = state => ({
  tarefas: state.tarefas.tarefas
})

const mapDisptchToProps = dispatch => 
bindActionCreators({listar, salvar, deletar}, dispatch)

export default connect (mapStateToProps, mapDisptchToProps)(TarefasList);
