import React from 'react';
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
          backgroundColor: 'rgba(0, 0, 0, 0.7)', // Fondo negro transparente
          color: 'white', // Color del texto en blanco
        },
      }}
    >
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          height: '64px', // Altura fija para coincidir con el NavBar
          padding: '0 18px', // Ajusta el padding para mover los logos
          justifyContent: 'flex-start', // Alinea los logos a la izquierda
          position: 'fixed', // Mantén el Box en su lugar
          top: 0, // Coloca el Box en la parte superior
          width: open ? drawerWidth : collapsedWidth, // Ajusta el ancho según el estado del Drawer
          zIndex: 1300, // Asegura que el Box esté encima del contenido
          backgroundColor: 'rgba(0, 0, 0, 0.0)', // Fondo negro transparente
        }}
      >
        {/* Imagen logo2.2 siempre visible */}
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            marginRight: '20px', // Ajusta para mover logo2.2 más a la derecha
          }}
        >
          <img
            src="/images/logo2.2.png" // Asegúrate de que esta sea la ruta correcta
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
            display: open ? 'flex' : 'none', // Solo visible cuando el Drawer está abierto
            alignItems: 'center',
            marginLeft: '4px', // Ajusta este margen para mover logo1.2 más a la derecha
          }}
        >
          <img
            src="/images/logo1.2.png" // Asegúrate de que esta sea la ruta correcta
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
          marginTop: '64px', // Espacio justo debajo del Box con los logos
          height: 'calc(100vh - 64px)', // Ajusta la altura para llenar el resto del Drawer
          overflowY: 'auto', // Muestra la barra de desplazamiento vertical solo cuando sea necesario
        }}
        className="scrollbar-container" // Añadido para aplicar estilos personalizados
      >
        <List
          sx={{
            paddingLeft: 0,
            display: 'flex',
            flexDirection: 'column',
            height: 'auto', // Ajusta la altura del List a su contenido
          }}
        >
          {[ 
            { icon: <PersonIcon />, text: 'Gestionar usuario' },
            { icon: <GroupIcon />, text: 'Gestionar roles' },
            { icon: <BudgetIcon />, text: 'Gestionar presupuestos' },
            { icon: <InventoryIcon />, text: 'Control de inventario' },
            { icon: <ProjectIcon />, text: 'Gestionar programación de proyectos' },
            { icon: <ClientIcon />, text: 'Gestionar clientes' },
            { icon: <PersonnelIcon />, text: 'Gestionar personal' },
            { icon: <RateIcon />, text: 'Gestionar tarifas' },
            { icon: <ProjectIcon />, text: 'Gestionar proyectos' },
            { icon: <StateIcon />, text: 'Gestionar estado de cobro' },
            { icon: <CalendarIcon />, text: 'Visualizar cronograma' },
          ].map(({ icon, text }, index) => (
            <ListItem button="true" key={index} sx={{ padding: '8px 8px', height: '56px' }}>
              <ListItemIcon
                sx={{
                  minWidth: '50px', // Asegura un tamaño mínimo fijo para el ícono
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  color: 'white', // Color de los íconos en blanco
                  '& svg': {
                    fontSize: '24px', // Tamaño del ícono
                  },
                }}
              >
                {icon}
              </ListItemIcon>
              <ListItemText
                primary={text}
                sx={{
                  display: open ? 'block' : 'none', // Esconde completamente el texto cuando el Drawer está colapsado
                  marginLeft: '8px', // Espacio entre el ícono y el texto
                  color: 'white', // Color del texto en blanco
                }}
              />
            </ListItem>
          ))}
        </List>
      </Box>
      {/* Estilos personalizados para la barra de desplazamiento */}
      <style>
        {`
          /* Personalización de la barra de desplazamiento para WebKit (Chrome, Safari) */
          .scrollbar-container::-webkit-scrollbar {
            width: 12px;
          }
          .scrollbar-container::-webkit-scrollbar-track {
            background: transparent; /* Fondo de la pista transparente */
          }
          .scrollbar-container::-webkit-scrollbar-thumb {
            background: rgba(128, 128, 128, 0.5); /* Color gris transparente para la barra de desplazamiento */
            border-radius: 10px; /* Bordes redondeados de la barra de desplazamiento */
          }
          .scrollbar-container::-webkit-scrollbar-thumb:hover {
            background: rgba(128, 128, 128, 0.8); /* Color de la barra de desplazamiento cuando se pasa el mouse */
          }
        `}
      </style>
    </Drawer>
  );
}

export default MenuSideBar;
