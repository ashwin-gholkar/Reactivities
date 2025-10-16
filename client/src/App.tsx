 
import { useEffect, useState } from 'react'
import './App.css'
import type { Activity } from './lib/types/index.d';
import { List, ListItem, Typography } from '@mui/material';
import axios from "axios"

function App() {  
  const [activities,setActivities]=useState<Activity[]>([]);

  useEffect(()=> {
    axios.get<Activity[]>('https://localhost:5002/api/activities')
    .then(response => setActivities(response.data))
  },[])
  return ( 
    <>
    <Typography variant='h3'>Reactivities</Typography> 
    <List>
      {activities.map((activity) => (
        <ListItem key={activity.id}>{activity.title}</ListItem>
      ))}
    </List>

    </>
  )
}

export default App
