import { Box, Button, Paper, TextField, Typography } from "@mui/material";
import type { Activity } from "../../../lib/types/index.d";
import type { FormEvent } from "react";
import { useActivities } from "../../../lib/hooks/useActivities";
import { useNavigate, useParams } from "react-router";


export default function ActivityForm() {
    const { id } = useParams();
    const { updateActivity, createActivity, activity, isLoadingActivity } = useActivities(id);
    const navigate = useNavigate();
    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();


        const formData = new FormData(event.currentTarget);
        const data: { [key: string]: FormDataEntryValue } = {}
        formData.forEach((value, key) => {
            data[key] = value
        });
        if (activity) {
            data.id = activity.id
            await updateActivity.mutateAsync(data as unknown as Activity)
            navigate(`/activities/${activity.id}`)
        }
        else {
            createActivity.mutate(data as unknown as Activity, {
                onSuccess: (id) => {
                    navigate(`/activities/${id}`)
                }
            })
        }
    }

    if (isLoadingActivity) return <Typography>Loading....</Typography>

    return (
        <Paper sx={{ borderRadius: 3, padding: 3 }}>
            <Typography variant="h5" gutterBottom color="primary">
                {activity ? 'Edit activity' : 'Create activity'}
            </Typography>
            <Box component="form" onSubmit={handleSubmit} display="flex" flexDirection="column" gap={3}>
                <TextField label='title' name="title" defaultValue={activity?.title} />
                <TextField label='Description' name="Description" multiline rows={3} defaultValue={activity?.description} />
                <TextField label='Category' name="Category" defaultValue={activity?.title} />
                <TextField label='Date' name="Date" type="date"
                    defaultValue={activity?.date
                        ? new Date(activity.date).toISOString().split('T')[0]
                        : new Date().toISOString().split('T')[0]
                    } />
                <TextField label='City' name="City" defaultValue={activity?.city} />
                <TextField label='Venue' name="Venue" defaultValue={activity?.venue} />
                <Box display={"flex"} justifyContent={"end"} gap={3}>
                    <Button onClick={() => { }} color="inherit">Cancel</Button>
                    <Button
                        type="submit"
                        color="success"
                        variant="contained"
                        disabled={updateActivity.isPending || createActivity.isPending}
                    >Submit</Button>
                </Box>
            </Box>

        </Paper>
    )
}