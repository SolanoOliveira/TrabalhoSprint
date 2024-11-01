import React, { useState } from 'react';
import { Paper, Typography, TextField, Button, Box } from '@mui/material';

const PromptArea = () => {
  const [prompt, setPrompt] = useState('');

  const handleSend = () => {
    console.log('Prompt enviado:', prompt);
    setPrompt('');
  };

  return (
    <Box sx={{ p: 2 }}>
      <Paper elevation={3} sx={{ p: 2 }}>
        <Typography variant="h6" align="center">
          Prompt
        </Typography>
        <Box sx={{ display: 'flex', gap: 1, mt: 2 }}>
          <TextField
            fullWidth
            label="Digite seu comando"
            variant="outlined"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
          />
          <Button variant="contained" color="primary" onClick={handleSend}>
            Enviar
          </Button>
        </Box>
      </Paper>
    </Box>
  );
};

export default PromptArea;
