import { useEffect, useState } from "react";

export function useSchedule() {
  const [schedule, setSchedule] = useState(null);

  useEffect(() => {
    const fetchSchedule = async () => {
      const response = await fetch(
        "/api/blog-creco-dev/calendar/?calendarId=creaticoding@gmail.com"
      );
      const data = await response.json();
      setSchedule(data.calendarEvents);
    };

    fetchSchedule();
  }, []);

  return schedule;
}
