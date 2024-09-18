import React from 'react';
import { useNavigate } from 'react-router-dom'; // Importar useNavigate
import { Box, Drawer, List, ListItem, ListItemText, ListItemIcon } from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import GroupIcon from '@mui/icons-material/Group';
import BudgetIcon from '@mui/icons-material/AttachMoney';
import InventoryIcon from '@mui/icons-material/Storefront';
import ProjectIcon from '@mui/icons-material/Assignment';
import ClientIcon from '@mui/icons-material/People';
import PersonnelIcon from '@mui/icons-material/Work';
import RateIcon from '@mui/icons-material/LocalOffer';
import StateIcon from '@mui/icons-material/Assessment';
import CalendarIcon from '@mui/icons-material/CalendarToday';

const drawerWidth = 300; // Ancho máximo del Drawer cuando está abierto
const collapsedWidth = 70; // Ancho del Drawer cuando está colapsado

function MenuSideBar({ open }) {
  const navigate = useNavigate(); // Usar useNavigate para redirección

  const menuItems = [
    { icon: <PersonIcon />, text: 'Gestionar usuario', path: '/gestionar_usuarios' },
    { icon: <GroupIcon />, text: 'Gestionar roles', path: '/gestionar_roles' },
    { icon: <BudgetIcon />, text: 'Gestionar presupuestos', path: '/gestionar_presupuestos' },
    { icon: <InventoryIcon />, text: 'Control de inventario', path: '/control_inventario' },
    { icon: <ProjectIcon />, text: 'Gestionar programación de proyectos', path: '/gestionar_programacion_proyectos' },
    { icon: <ClientIcon />, text: 'Gestionar clientes', path: '/gestionar_clientes' },
    { icon: <PersonnelIcon />, text: 'Gestionar personal', path: '/gestionar_personal' },
    { icon: <RateIcon />, text: 'Gestionar tarifas', path: '/gestionar_tarifas' },
    { icon: <ProjectIcon />, text: 'Gestionar proyectos', path: '/gestionar_proyectos' },
    { icon: <StateIcon />, text: 'Gestionar estado de cobro', path: '/gestionar_estado_cobro' },
    { icon: <CalendarIcon />, text: 'Visualizar cronograma', path: '/visualizar_cronograma' },
  ];

  return (
    <Drawer
      variant="persistent"
      anchor="left"
      open
      sx={{
        width: open ? drawerWidth : collapsedWidth,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: open ? drawerWidth : collapsedWidth,
          boxSizing: 'border-box',
          height: '100vh',
          transition: 'width 0.3s ease',
          backgroundColor: 'rgba(0, 0, 0, 0.7)',
          color: 'white',
        },
      }}
    >
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          height: '64px',
          padding: '0 18px',
          justifyContent: 'flex-start',
          position: 'fixed',
          top: 0,
          width: open ? drawerWidth : collapsedWidth,
          zIndex: 1300,
          backgroundColor: 'rgba(0, 0, 0, 0.0)',
        }}
      >
        {/* Imagen logo2.2 siempre visible */}
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            marginRight: '20px',
          }}
        >
          <img
            src="/images/logo2.2.png"
            alt="Logo 2.2"
            style={{
              width: '30px',
              height: 'auto',
            }}
          />
        </Box>
        {/* Imagen logo1.2 al centro */}
        <Box
          sx={{
            display: open ? 'flex' : 'none',
            alignItems: 'center',
            marginLeft: '4px',
          }}
        >
          <img
            src="/images/logo1.2.png"
            alt="Masic S.A.C."
            style={{
              width: '110px',
              height: 'auto',
              objectFit: 'contain',
            }}
          />
        </Box>
      </Box>
      <Box
        sx={{
          marginTop: '64px',
          height: 'calc(100vh - 64px)',
          overflowY: 'auto',
        }}
        className="scrollbar-container"
      >
        <List
          sx={{
            paddingLeft: 0,
            display: 'flex',
            flexDirection: 'column',
            height: 'auto',
          }}
        >
          {menuItems.map(({ icon, text, path }, index) => (
            <ListItem
              button
              key={index}
              sx={{ 
                padding: '8px 8px', 
                height: '56px', 
                cursor: 'pointer' // Cambia el cursor a pointer al pasar el mouse
              }}
              onClick={() => navigate(path)} // Redirección al hacer clic
            >
              <ListItemIcon
                sx={{
                  minWidth: '50px',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  color: 'white',
                  '& svg': {
                    fontSize: '24px',
                  },
                }}
              >
                {icon}
              </ListItemIcon>
              <ListItemText
                primary={text}
                sx={{
                  display: open ? 'block' : 'none',
                  marginLeft: '8px',
                  color: 'white',
                }}
              />
            </ListItem>
          ))}
        </List>
      </Box>
      <style>
        {`
          .scrollbar-container::-webkit-scrollbar {
            width: 12px;
          }
          .scrollbar-container::-webkit-scrollbar-track {
            background: transparent;
          }
          .scrollbar-container::-webkit-scrollbar-thumb {
            background: rgba(128, 128, 128, 0.5);
            border-radius: 10px;
          }
          .scrollbar-container::-webkit-scrollbar-thumb:hover {
            background: rgba(128, 128, 128, 0.8);
          }
        `}
      </style>
    </Drawer>
  );
}

export default MenuSideBar;
