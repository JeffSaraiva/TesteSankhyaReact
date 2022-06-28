import { useEffect, useState } from "react";
import api from "../api";
import { Button, TextField, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';

export default function FormEditDialog(props) {
  const handleCloseEdit = () => {
    props.setOpenEdit(false);
    props.updateTable();
  };

  const [editValues, setEditValues] = useState({});

  const handleChangeValues = (event) => {
    setEditValues({ ...editValues, [event.target.id]: event.target.value });
  };

  const updateRow = async (id) => {

    await api.put(`/api/customers/${id}`, {
      name: editValues.name,
      code: editValues.code,
      cgcCpf: editValues.cgcCpf,
      address: editValues.address,
      neighborhood: editValues.neighborhood,
      city: editValues.city,
      phone: editValues.phone,
    });

    handleCloseEdit();
  }

  const handleEditClickButton = () => {
    updateRow(props.itemSelect.id);

  };


  useEffect(() => {
    if (props) setEditValues(props.itemSelect);
  }, [props]);


  return (
    <div>



      <Dialog open={props.openEdit} onClose={handleCloseEdit}>
        <DialogTitle className="d-flex justify-content-center">Editar Cliente</DialogTitle>
        <DialogContent>

          <TextField
            autoFocus
            margin="dense"
            id="name"
            name="name"
            label="Nome:"
            type="text"
            onChange={handleChangeValues}
            defaultValue={props?.itemSelect?.name}
            fullWidth
            variant="standard"
          />

          <TextField
            autoFocus
            margin="dense"
            id="code"
            name="code"
            label="Código:"
            type="text"
            onChange={handleChangeValues}
            defaultValue={props?.itemSelect?.code}
            fullWidth
            variant="standard"
          />

          <TextField
            autoFocus
            margin="dense"
            id="cgcCpf"
            name="cgcCpf"
            label="CGC/CPF:"
            type="text"
            onChange={handleChangeValues}
            defaultValue={props?.itemSelect?.cgcCpf}
            fullWidth
            variant="standard"

          />

          <TextField
            autoFocus
            margin="dense"
            id="address"
            name="address"
            label="Endereço:"
            type="text"
            onChange={handleChangeValues}
            defaultValue={props?.itemSelect?.address}
            fullWidth
            variant="standard"
          />

          <TextField
            autoFocus
            margin="dense"
            id="neighborhood"
            name="neighborhood"
            label="Bairro:"
            type="text"
            onChange={handleChangeValues}
            defaultValue={props?.itemSelect?.neighborhood}
            fullWidth
            variant="standard"

          />

          <TextField
            autoFocus
            margin="dense"
            id="city"
            name="city"
            label="Cidade:"
            type="text"
            onChange={handleChangeValues}
            defaultValue={props?.itemSelect?.city}
            fullWidth
            variant="standard"
          />


          <TextField
            autoFocus
            margin="dense"
            id="phone"
            name="phone"
            label="Telefone:"
            type="text"
            onChange={handleChangeValues}
            defaultValue={props?.itemSelect?.phone}
            fullWidth
            variant="standard"

          />

        </DialogContent>
        <DialogActions className="d-flex justify-content-center">

          <Button onClick={handleCloseEdit} >Cancelar</Button>
          <Button onClick={handleEditClickButton} >Editar</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

