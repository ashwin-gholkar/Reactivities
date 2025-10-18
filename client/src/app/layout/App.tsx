
import { useEffect, useState } from 'react'
import { Box, Container, CssBaseline } from '@mui/material';
import axios from "axios"
import type { Activity } from '../../lib/types/index.d';
import NavBar from './NavBar';
import ActivityDashboard from '../../features/activities/dashboard/ActivityDashboard';

function App() {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [selectedActivity, setSelectedActivity] = useState<Activity | undefined>(undefined)

  const [editMode, setEditMode] = useState(false)

  useEffect(() => {
    axios.get<Activity[]>('https://localhost:5002/api/activities')
      .then(response => setActivities(response.data))
  }, [])

  const handleSelectActivity = (id: string) => {
    setSelectedActivity(activities.find(x => x.id === id));
  }

  const handleSubmitFrom = (activity: Activity) => {
    if (activity.id) {
      setActivities(activities.map(x => x.id === activity.id ? activity : x))
    } else {
      const newActivity = { ...activity, id: activities.length.toString() }
      setSelectedActivity(newActivity);
      setActivities([...activities, newActivity])
    }
    setEditMode(false);
  }

  const handleDelete = (id: string) => {
    setActivities(activities.filter(x => x.id !== id))
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
    <Box sx={{ bgcolor: '#eeeeee' }}>
      <CssBaseline />
      <NavBar openForm={HandleOpenForm} />
      <Container maxWidth='xl' sx={{ mt: 3 }}>
        <ActivityDashboard
          activities={activities}
          selectActivity={handleSelectActivity}
          cancelSelectActivity={handleCancelSelectActivity}
          selectedActivity={selectedActivity}
          editMode={editMode}
          openForm={HandleOpenForm}
          closeForm={handleFormClose}
          submitForm={handleSubmitFrom}
          deleteActivity={handleDelete}
        />
      </Container>
    </Box>
  )
}

export default App
