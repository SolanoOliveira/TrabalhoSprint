import React, { useState } from 'react';
import { Grid, Paper, Typography, Box, Button, Dialog, DialogTitle, DialogContent, TextField, DialogActions, MenuItem } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { DndProvider, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import CardItem from './CardItem';

const KanbanBoard = () => {
  const [columns, setColumns] = useState({
    'To Do': [{ id: 1, title: 'Design new feature' }, { id: 2, title: 'Update documentation' }],
    'In Progress': [{ id: 3, title: 'Implement login feature' }],
    'Done': [{ id: 4, title: 'Bug fixes' }]
  });

  const [openDialog, setOpenDialog] = useState(false);
  const [newCardTitle, setNewCardTitle] = useState('');
  const [selectedColumn, setSelectedColumn] = useState('To Do');

  const moveCard = (cardId, sourceColumn, targetColumn) => {
    const sourceCards = columns[sourceColumn].filter((card) => card.id !== cardId);
    const targetCards = [...columns[targetColumn], columns[sourceColumn].find((card) => card.id === cardId)];

    setColumns({
      ...columns,
      [sourceColumn]: sourceCards,
      [targetColumn]: targetCards,
    });
  };

  const removeCard = (cardId, column) => {
    setColumns({
      ...columns,
      [column]: columns[column].filter((card) => card.id !== cardId),
    });
  };

  const handleAddCard = () => {
    if (newCardTitle.trim() === '') return;
    const newCard = { id: Date.now(), title: newCardTitle };
    setColumns({
      ...columns,
      [selectedColumn]: [...columns[selectedColumn], newCard],
    });
    setNewCardTitle('');
    setOpenDialog(false);
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <Box sx={{ flexGrow: 1, p: 2 }}>
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
          <Typography variant="h5">Kanban Board</Typography>
          <Button variant="contained" color="primary" startIcon={<AddIcon />} onClick={() => setOpenDialog(true)}>
            Adicionar Card
          </Button>
        </Box>
        <Grid container spacing={2}>
          {Object.keys(columns).map((column) => (
            <Column key={column} title={column} cards={columns[column]} moveCard={moveCard} removeCard={removeCard} />
          ))}
        </Grid>

        
        <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
          <DialogTitle>Adicionar Novo Card</DialogTitle>
          <DialogContent>
            <TextField
              autoFocus
              margin="dense"
              label="Título do Card"
              type="text"
              fullWidth
              value={newCardTitle}
              onChange={(e) => setNewCardTitle(e.target.value)}
            />
            <TextField
              select
              margin="dense"
              label="Coluna"
              fullWidth
              value={selectedColumn}
              onChange={(e) => setSelectedColumn(e.target.value)}
            >
              {Object.keys(columns).map((column) => (
                <MenuItem key={column} value={column}>
                  {column}
                </MenuItem>
              ))}
            </TextField>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setOpenDialog(false)} color="secondary">
              Cancelar
            </Button>
            <Button onClick={handleAddCard} color="primary">
              Adicionar
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    </DndProvider>
  );
};

const Column = ({ title, cards, moveCard, removeCard }) => {
  const [{ isOver }, drop] = useDrop({
    accept: 'CARD',
    drop: (item) => moveCard(item.id, item.column, title),
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  });

  return (
    <Grid item xs={12} sm={4}>
      <Paper ref={drop} elevation={3} sx={{ p: 2, backgroundColor: isOver ? '#f0f0f0' : '#fff' }}>
        <Typography variant="h6" align="center">
          {title}
        </Typography>
        {cards.map((card) => (
          <CardItem key={card.id} card={card} column={title} removeCard={removeCard} />
        ))}
      </Paper>
    </Grid>
  );
};

export default KanbanBoard;
