
import { useState } from 'react'
import { Box, Container, CssBaseline, Typography } from '@mui/material';
import type { Activity } from '../../lib/types/index.d';
import NavBar from './NavBar';
import ActivityDashboard from '../../features/activities/dashboard/ActivityDashboard';
import { useActivities } from '../../lib/hooks/useActivities';

function App() {

  const [selectedActivity, setSelectedActivity] = useState<Activity | undefined>(undefined)
  const [editMode, setEditMode] = useState(false)
  const { activities, isPending } = useActivities()//custom hooks


  const handleSelectActivity = (id: string) => {
    setSelectedActivity(activities!.find(x => x.id === id));
  }


  const handleCancelSelectActivity = () => {
    setSelectedActivity(undefined);
  }
  const HandleOpenForm = (id?: string) => {
    if (id) handleSelectActivity(id);
    else handleCancelSelectActivity()

    setEditMode(true)
  }

  const handleFormClose = () => {
    setEditMode(false)
  }
  return (
    <Box sx={{ bgcolor: '#eeeeee', minHeight: '100vh' }}>
      <CssBaseline />
      <NavBar openForm={HandleOpenForm} />
      <Container maxWidth='xl' sx={{ mt: 3 }}>
        {!activities || isPending ? (<Typography>Loading....</Typography>) : (
          <ActivityDashboard
            activities={activities}
            selectActivity={handleSelectActivity}
            cancelSelectActivity={handleCancelSelectActivity}
            selectedActivity={selectedActivity}
            editMode={editMode}
            openForm={HandleOpenForm}
            closeForm={handleFormClose}
          />
        )}

      </Container>
    </Box>
  )
}

export default App
