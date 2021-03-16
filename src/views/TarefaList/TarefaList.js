import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/styles';

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { listar } from '../../store/tarefasReducer'

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

  const salvar = (tarefa) => {
    axios.post(API_URL, tarefa, {
      headers: {'x-tenant-id' : localStorage.getItem('email_usuario_logado')}
    }).then(response => {
      const novaTarefa = response.data
      setTarefas( [...tarefas, novaTarefa] )
      setMensagem('Item adicionado com sucesso')
      setOpenDialog(true)
    }).catch(erro => {
      setMensagem('Ocorreu um erro')
      setOpenDialog(true)
    })
  }

  // const listarTarefas = () => {
  //   axios.get(API_URL, {
  //     headers: {'x-tenant-id' : localStorage.getItem('email_usuario_logado')}
  //   }).then(response => {
  //     const listaDeTarefas = response.data
  //     setTarefas(listaDeTarefas)
  //   }).catch(erro => {
  //     setMensagem('Ocorreu um erro')
  //     setOpenDialog(true)
  //   })
  // }

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

  const deletar = (id) => {
    axios.delete(`${API_URL}/${id}`, {
      headers: {'x-tenant-id' : localStorage.getItem('email_usuario_logado')}
    })
    .then(response => {
      const lista = tarefas.filter( tarefas => tarefas.id !== id)
      setTarefas(lista)
      setMensagem('item removido com sucesso')
      setOpenDialog(true)
    }).catch(erro => {
      setMensagem('Ocorreu um erro')
      setOpenDialog(true)
    })
  }

  useEffect(() => {
    props();
  }, [])

  return (
    <div className={classes.root}>
      <TarefasToolbar salvar={salvar} />
      <div className={classes.content}>
        <TarefasTable 
          alterarStatus={alterarStatus} 
          deleteAction={deletar}
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
bindActionCreators({listar}, dispatch)

export default connect (mapStateToProps, mapDisptchToProps)(TarefasList);
