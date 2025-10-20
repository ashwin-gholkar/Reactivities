import { Grid, Typography } from "@mui/material"
import { useParams } from "react-router"
import { useActivities } from "../../../lib/hooks/useActivities";
import ActitvityDetailsHeader from "./ActitvityDetailsHeader";
import ActitivtyDetailsInfo from "./ActitivtyDetailsInfo";
import ActivityDetailsChats from "./ActivityDetailsChats";
import ActivityDetailsSidebar from "./ActivityDetailsSidebar";


export default function ActivityDetails() {

    const { id } = useParams();

    const { activity, isLoadingActivity } = useActivities(id)

    if (isLoadingActivity) return <Typography>Loading......</Typography>

    if (!activity) return <Typography>Activity not found</Typography>

    return (
        <Grid container spacing={5}>
            <Grid size={8}>
                <ActitvityDetailsHeader activity={activity} />
                <ActitivtyDetailsInfo activity={activity} />
                <ActivityDetailsChats />
            </Grid>
            <Grid size={4}>
                <ActivityDetailsSidebar />
            </Grid>
        </Grid>
    )
}