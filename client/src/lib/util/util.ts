import { format, type DateArg } from "date-fns";

export function formatDate(date: DateArg<Date>) {
    return format(date, 'dd MM YYYY h:mm a')
}