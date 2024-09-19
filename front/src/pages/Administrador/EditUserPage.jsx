import { useForm } from 'react-hook-form';
import { useAuth } from '../../context/AuthContext';
import { Box, TextField, Button, Typography, Grid, Paper, Select, MenuItem, InputLabel, FormControl, Snackbar, Alert } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { obtenerUserRequest } from '../../api/auth';
import MenuSideBar from '../../components/MenuSideBar';
import NavBar from '../../components/NavBar';

function EditUserPage() {
    const { id } = useParams;
    const { updateUser, isAuthenticated } = useAuth();
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const { register, handleSubmit, reset,
        formState: {errors},
    } = useForm({defaultValues: user});
    console.log(user);

    const [drawerOpen, setDrawerOpen] = useState(false); // Estado para abrir/cerrar el sidebar
    const [openSnackbar, setOpenSnackbar] = useState(false); // Estado para controlar el Snackbar
    const [snackbarMessage, setSnackbarMessage] = useState(''); // Mensaje del Snackbar
    const [snackbarSeverity, setSnackbarSeverity] = useState('success'); // Severidad del Snackbar
    useEffect(() => {
        const obtUsuario = async() => { 
            try{
                const res = await obtenerUserRequest(id);
                const userData = res.data;
                setUser(userData.data);
                console.log(res);
                console.log(userData);
                reset(userData.data)
            }
            catch(error){
                console.error("error obteniendo el usuario" + id, error);
            }};
            obtUsuario();
            }, [id, reset]);

    useEffect(()=>{
        if(isAuthenticated){
            navigate('/gestionar_usuarios');
        }
    }, [isAuthenticated, navigate]);
    const onSubmit = handleSubmit(async(data)=> {
        updateUser(id, data);
    })
    const handleDrawerToggle = () => {
        setDrawerOpen(!drawerOpen); // Alterna el estado del sidebar
      };

      const handleCancel = () => {
        const confirmCancel = window.confirm('¿Estás seguro de que deseas cancelar el editar? Todos los datos no guardados se perderán.');
        if (confirmCancel) {
          navigate('/gestionar_usuarios'); // Redirige al enlace deseado
        }
      };
      const handleCloseSnackbar = () => {
        setOpenSnackbar(false);
      };
    

    return (
        <Box sx={{ display: 'flex', minHeight: '100vh' }}>
          <MenuSideBar open={drawerOpen} />
          <Box
            component="main"
            sx={{
              flexGrow: 1,
              marginLeft: drawerOpen ? '300px' : '70px',
              transition: 'margin-left 0.3s ease',
              padding: '16px',
              overflowX: 'hidden',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <NavBar onDrawerToggle={handleDrawerToggle} drawerOpen={drawerOpen} />
            <Box
              sx={{
                mt: 4,
                maxWidth: '1000px',
                width: '100%',
                p: 3,
                overflowX: 'hidden',
              }}
            >
              <Typography variant="h4" gutterBottom align="left">
                Editar Usuario
              </Typography>
              <Paper
                elevation={6}
                sx={{
                  p: 2,
                  borderRadius: 2,
                  backgroundColor: 'rgba(211, 211, 211, 0.2)',
                  backdropFilter: 'blur(3px)',
                  width: '100%',
                  boxSizing: 'border-box',
                }}
              >
                <form onSubmit={onSubmit}>
                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        label="Nombre"
                        name="nombre"
                        defaultValue = {user ? user.nombre: ""}
                        error={!!errors.nombre}
                        helperText={errors.nombre}
                        {...register("nombre", {required:true})}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        label="Apellidos"
                        name="apellidos"
                        defaultValue = {user ? user.apellido: ""}
                        error={!!errors.apellido}
                        helperText={errors.apellido}
                        {...register("apellido", {required:true})}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        label="Email"
                        name="email"
                        type="email"
                        defaultValue = {user ? user.email: ""}
                        error={!!errors.email}
                        helperText={errors.email}
                        {...register("email", {required:true})}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        label="DNI"
                        name="dni"
                        defaultValue = {user ? user.dni: ""}
                        error={!!errors.dni}
                        helperText={errors.email}
                        {...register("email", {required:true})}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        label="Teléfono"
                        name="telefono"
                        defaultValue = {user ? user.telefono: ""}
                        {...register("telefono", {required:true})}
                        error={!!errors.telefono}
                        helperText={errors.telefono}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <FormControl fullWidth error={!!errors.rol}>
                        <InputLabel>Rol</InputLabel>
                        <Select
                          name="rol"
                          label="Rol"
                          defaultValue = {user ? user.rol: ""}
                        {...register("rol", {required:true})}
                        >
                          <MenuItem value="" disabled></MenuItem>
                          <MenuItem value="Administrador">Administrador</MenuItem>
                          <MenuItem value="Vendedor">Vendedor</MenuItem>
                          <MenuItem value="Tecnico">Técnico</MenuItem>
                        </Select>
                        {errors.rol && <Typography color="error">{errors.rol}</Typography>}
                      </FormControl>
                    </Grid>
                    <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'flex-end', gap: 1 }}>
                      <Button variant="contained" color="primary" type="submit">
                        Guardar Cambios
                      </Button>
                      <Button variant="outlined" color="secondary" onClick={handleCancel}>
                        Cancelar
                      </Button>
                    </Grid>
                  </Grid>
                </form>
              </Paper>
            </Box>
          </Box>
          <Snackbar
            open={openSnackbar}
            autoHideDuration={6000}
            onClose={handleCloseSnackbar}
          >
            <Alert
              onClose={handleCloseSnackbar}
              severity={snackbarSeverity}
              sx={{ width: '100%' }}
            >
              {snackbarMessage}
            </Alert>
          </Snackbar>
        </Box>
      );   
};

export default EditUserPage;