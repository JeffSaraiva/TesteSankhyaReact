import React, { useEffect, useState } from "react";
import api from "../api";
import { Button, TextField, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';

export default function FormDialog(props) {

  const handleClose = () => {
    props.setOpen(false);
    props.updateTable();
  };

  const [values, setValues] = useState();

  const handleChangeValues = (value) => {
    setValues(prevValue => ({
      ...prevValue,
      [value.target.name]: value.target.value,
    }));
  };

  const createRow = async () => {
    if (values.name == "" || values.code == "") {
      const info = "Preencha todos os campos"
      alert(info);
      return;
    }

    const { data } = await api.post('api/customers', {
      name: values.name,
      code: values.code,
      cgcCpf: values.cgcCpf,
      address: values.address,
      neighborhood: values.neighborhood,
      city: values.city,
      phone: values.phone,
    });

    console.log(data);
    handleClose();
  }

  const handleClickButton = () => {
    createRow();
    console.log(props);


  };



  useEffect(() => {
  }, []);


  return (
    <div>



      <Dialog open={props.open} onClose={handleClose}>
        <DialogTitle className="d-flex justify-content-center">Adicionar Cliente</DialogTitle>
        <DialogContent>

          <TextField
            autoFocus
            margin="dense"
            id="id_name"
            name="name"
            label="Nome:"
            type="text"
            onChange={handleChangeValues}
            fullWidth
            variant="standard"
          />

          <TextField
            autoFocus
            margin="dense"
            id="id_code"
            name="code"
            label="Código:"
            type="number"
            onChange={handleChangeValues}
            fullWidth
            variant="standard"
          />

          <TextField
            autoFocus
            margin="dense"
            id="id_cgcCpf"
            name="cgcCpf"
            label="CGC/CPF:"
            type="number"
            onChange={handleChangeValues}
            fullWidth
            variant="standard"

          />

          <TextField
            autoFocus
            margin="dense"
            id="id_address"
            name="address"
            label="Endereço:"
            type="text"
            onChange={handleChangeValues}
            fullWidth
            variant="standard"
          />

          <TextField
            autoFocus
            margin="dense"
            id="id_neighborhood"
            name="neighborhood"
            label="Bairro:"
            type="text"
            onChange={handleChangeValues}
            fullWidth
            variant="standard"

          />

          <TextField
            autoFocus
            margin="dense"
            id="id_city"
            name="city"
            label="Cidade:"
            type="text"
            onChange={handleChangeValues}
            fullWidth
            variant="standard"
          />


          <TextField
            autoFocus
            margin="dense"
            id="id_phone"
            name="phone"
            label="Telefone:"
            type="text"
            onChange={handleChangeValues}
            fullWidth
            variant="standard"

          />

        </DialogContent>
        <DialogActions className="d-flex justify-content-center">

          <Button onClick={handleClose} >Cancelar</Button>
          <Button onClick={handleClickButton} >Salvar</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
