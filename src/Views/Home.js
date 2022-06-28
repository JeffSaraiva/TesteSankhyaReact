import { useEffect, useState } from "react";
import api from "../Components/api";
import { DataGrid } from '@mui/x-data-grid';
import { Button, TextField, Box } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import FormDialog from "../Components/dialog/Form";
import FormEditDialog from "../Components/dialog/UpdateForm";



export const Home = () => {
    const [customers, setCustomers] = useState([]);
    const [customersGrid, setCustomersGrid] = useState([])


    const [selectionIds, setSelectionIds] = useState([]);

    const [open, setOpen] = useState(false);
    const [openEdit, setOpenEdit] = useState(false);
    const [itemSelected, setItemSelected] = useState();

    const columns = [
        { field: 'id', headerName: 'ID', width: 70 },
        { field: 'name', headerName: 'Nome', width: 150 },
        { field: 'code', headerName: 'Código', width: 150 },
        { field: 'cgcCpf', headerName: 'CGC/CPF', width: 150 },
        { field: 'address', headerName: 'Endereço', width: 150 },
        { field: 'neighborhood', headerName: 'Bairro', width: 150 },
        { field: 'city', headerName: 'Cidade', width: 150 },
        { field: 'phone', headerName: 'Telefone', width: 150 },
    ];

    useEffect(() => {
        fetchCustomers();
    }, []);




    const fetchCustomers = async () => {
        const { data } = await api.get('/api/customers');
        setCustomers(data);
        setCustomersGrid(data)
        console.log(data);
    }



    function onSelectionModelChange(prop) {
        setSelectionIds(prop);
        console.log(prop);
    }


    function deleteRow() {
        if (selectionIds.length > 0) {
            selectionIds.forEach(async (id) => {
                await api.delete(`/api/customers/${id}`).then(() => {
                    fetchCustomers();
                });
            });
        }
    }


    const handleClickOpen = () => {
        setOpen(true);
    };


    const handleClickOpenEdit = () => {

        const IdItemSelect = selectionIds.length === 1 ? selectionIds.shift() : false;

        if (!IdItemSelect) {
            const info = selectionIds.length === 0 ? "Selecione um item na grade" : "Selecione apenas um item para edição"

            alert(info);
            return;
        }

        setItemSelected(customers.find(x => x.id === IdItemSelect));
        setOpenEdit(true);
    };


    const handleChangeValuesSearch = (event) => {
        let array = customers.filter(customer => findAge(customer, event.target.value))

        if (array) setCustomersGrid(array);
    }

    function findAge(customer, value) {
        return customer.name.indexOf(value) > -1;
    }

    return (
        <div>
            <div style={{ height: 600, width: '80%', margin: "auto" }}>
                <Box sx={{ display: 'flex', alignItems: 'flex-end', marginBottom: 2 }}>
                    <SearchIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
                    <TextField id="input-with-sx" label="Procurar Cliente" variant="standard" onChange={handleChangeValuesSearch} />
                </Box>
                <DataGrid
                    rows={customersGrid}
                    columns={columns}
                    pageSize={5}
                    rowsPerPageOptions={[5]}
                    checkboxSelection={true}
                    hideFooterSelectedRowCount={true}
                    onSelectionModelChange={onSelectionModelChange} />
            </div>
            <div className="d-flex justify-content-center" style={{ marginTop: 15 }} >
                <Button style={{ marginRight: 20 }} onClick={handleClickOpen} variant="contained"> Adicionar </Button>
                <Button style={{ marginRight: 20 }} onClick={handleClickOpenEdit} variant="contained"> Atualizar </Button>
                <Button onClick={deleteRow} variant="contained"> Deletar </Button>

            </div>
            <FormEditDialog
                openEdit={openEdit}
                setOpenEdit={setOpenEdit}
                itemSelect={itemSelected}
                updateTable={fetchCustomers}
            />
            <FormDialog open={open} setOpen={setOpen} updateTable={fetchCustomers} />
        </div>
    );
}

