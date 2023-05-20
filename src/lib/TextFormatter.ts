import { format } from "date-fns";

export const FormatDate = (date: Date): string => {
  return format(date, "Pp");
};
