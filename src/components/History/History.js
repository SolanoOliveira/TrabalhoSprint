import React from 'react';
import { Paper, Typography, Box, Avatar, Tooltip } from '@mui/material';
import { Timeline, TimelineItem, TimelineSeparator, TimelineConnector, TimelineContent, TimelineDot } from '@mui/lab';
import EventAvailableIcon from '@mui/icons-material/EventAvailable';

const historyData = [
  { card: 'Design new feature', date: '2024-10-01', status: 'To Do', changedBy: 'Alice', timeSpent: '2 days' },
  { card: 'Design new feature', date: '2024-10-02', status: 'In Progress', changedBy: 'Bob', timeSpent: '3 days' },
  { card: 'Design new feature', date: '2024-10-05', status: 'Done', changedBy: 'Alice', timeSpent: '1 day' },
  { card: 'Update documentation', date: '2024-10-01', status: 'To Do', changedBy: 'Charlie', timeSpent: '3 days' },
  { card: 'Update documentation', date: '2024-10-04', status: 'In Progress', changedBy: 'Alice', timeSpent: '2 days' },
];

const History = () => {
  return (
    <Box sx={{ p: 2 }}>
      <Paper elevation={3} sx={{ p: 2, maxHeight: 300, overflowY: 'auto' }}>
        <Typography variant="h6" align="center" gutterBottom>
          Histórico
        </Typography>
        <Timeline sx={{ p: 0, mb: 0 }}>
          {historyData.map((item, index) => (
            <TimelineItem key={index}>
              <TimelineSeparator>
                <TimelineDot color="primary">
                  <EventAvailableIcon fontSize="small" />
                </TimelineDot>
                {index < historyData.length - 1 && <TimelineConnector />}
              </TimelineSeparator>
              <TimelineContent sx={{ mb: 2 }}>
                <Paper elevation={1} sx={{ p: 1.5, backgroundColor: '#f9f9f9' }}>
                  <Box display="flex" alignItems="center" justifyContent="space-between">
                    <Box>
                      <Typography variant="body2" fontWeight="bold">
                        {item.card}
                      </Typography>
                      <Typography variant="body2" color="textSecondary">
                        {item.date} - {item.status}
                      </Typography>
                      <Typography variant="caption" color="textSecondary">
                        Tempo na coluna: {item.timeSpent}
                      </Typography>
                    </Box>
                    <Tooltip title={`Alterado por ${item.changedBy}`}>
                      <Avatar sx={{ bgcolor: '#1976d2', width: 24, height: 24, fontSize: 12 }}>
                        {item.changedBy.charAt(0)}
                      </Avatar>
                    </Tooltip>
                  </Box>
                </Paper>
              </TimelineContent>
            </TimelineItem>
          ))}
        </Timeline>
      </Paper>
    </Box>
  );
};

export default History;
