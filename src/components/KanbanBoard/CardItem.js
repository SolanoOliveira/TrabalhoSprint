import React from 'react';
import { Paper, Typography, IconButton } from '@mui/material';
import { useDrag } from 'react-dnd';
import CloseIcon from '@mui/icons-material/Close';

const CardItem = ({ card, column, removeCard }) => {
  const [{ isDragging }, drag] = useDrag({
    type: 'CARD',
    item: { id: card.id, column },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  return (
    <Paper
      ref={drag}
      elevation={1}
      sx={{
        p: 1,
        mb: 1,
        backgroundColor: isDragging ? '#e0e0e0' : '#f3f3f3',
        opacity: isDragging ? 0.5 : 1,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}
    >
      <Typography variant="body1">{card.title}</Typography>
      <IconButton size="small" onClick={() => removeCard(card.id, column)}>
        <CloseIcon fontSize="small" />
      </IconButton>
    </Paper>
  );
};

export default CardItem;
