import React, { useState } from 'react';
import { Paper, Typography, Box, Button, Dialog, DialogTitle, DialogContent } from '@mui/material';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, LineChart, Line, PieChart, Pie, Cell } from 'recharts';

const data = [
  { name: 'Sprint 1', tasks: 5 },
  { name: 'Sprint 2', tasks: 8 },
  { name: 'Sprint 3', tasks: 6 },
  { name: 'Sprint 4', tasks: 9 },
];

const colors = ['#8884d8', '#82ca9d', '#ffc658', '#ff7300'];

const SprintData = () => {
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedChart, setSelectedChart] = useState(null);

  const handleChartClick = (chart) => {
    setSelectedChart(chart);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedChart(null);
  };

  const exportChart = () => {
    console.log("Exportando o gráfico...");
  };

  return (
    <Box sx={{ p: 2 }}>
      <Paper elevation={3} sx={{ p: 2, overflowX: 'auto' }}>
        <Typography variant="h6" align="center" sx={{ mb: 2 }}>
          Sprint Data
        </Typography>

        {/* Botão de exportação */}
        <Button variant="outlined" color="primary" onClick={exportChart} sx={{ mb: 2 }}>
          Exportar Gráfico
        </Button>

        {/* Container para scroll horizontal */}
        <Box display="flex" justifyContent="space-around" mb={2} sx={{ overflowX: 'auto', gap: 2 }}>
          {/* Gráfico de barras */}
          <Box onClick={() => handleChartClick('bar')} sx={{ minWidth: 250 }}>
            <BarChart width={250} height={200} data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="tasks" fill="#8884d8" />
            </BarChart>
          </Box>

          {/* Gráfico de linhas */}
          <Box onClick={() => handleChartClick('line')} sx={{ minWidth: 250 }}>
            <LineChart width={250} height={200} data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="tasks" stroke="#8884d8" />
            </LineChart>
          </Box>

          {/* Gráfico de pizza */}
          <Box onClick={() => handleChartClick('pie')} sx={{ minWidth: 250 }}>
            <PieChart width={250} height={200}>
              <Pie data={data} dataKey="tasks" nameKey="name" cx="50%" cy="50%" outerRadius={80}>
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </Box>
        </Box>
      </Paper>

      {/* Modal para expandir o gráfico */}
      <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="md" fullWidth>
        <DialogTitle>Gráfico Expandido</DialogTitle>
        <DialogContent>
          {selectedChart === 'bar' && (
            <BarChart width={600} height={400} data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="tasks" fill="#8884d8" />
            </BarChart>
          )}
          {selectedChart === 'line' && (
            <LineChart width={600} height={400} data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="tasks" stroke="#8884d8" />
            </LineChart>
          )}
          {selectedChart === 'pie' && (
            <PieChart width={400} height={400}>
              <Pie data={data} dataKey="tasks" nameKey="name" cx="50%" cy="50%" outerRadius={150}>
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          )}
        </DialogContent>
      </Dialog>
    </Box>
  );
};

export default SprintData;
