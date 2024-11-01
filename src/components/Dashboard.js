import React from 'react';
import { Container, Grid } from '@mui/material';
import KanbanBoard from './KanbanBoard/KanbanBoard';
import SprintData from './SprintData/SprintData';
import History from './History/History';
import PromptArea from './PromptArea/PromptArea';

const Dashboard = () => {
  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Grid container spacing={3}>
        {/* Kanban Area */}
        <Grid item xs={12} md={8}>
          <KanbanBoard />
        </Grid>
        {/* Sprint Data */}
        <Grid item xs={12} md={4}>
          <SprintData />
        </Grid>
        {/* History */}
        <Grid item xs={12}>
          <History />
        </Grid>
        {/* Prompt Area */}
        <Grid item xs={12}>
          <PromptArea />
        </Grid>
      </Grid>
    </Container>
  );
};

export default Dashboard;
