import { useMemo } from "react";

export function useCalendarDays({
  schedules,
  startDate = new Date(),
  maxLength = 49,
}: {
  schedules?: any[];
  startDate?: Date;
  maxLength?: number;
}) {
  const daysInCurrentMonth = new Date(
    startDate.getFullYear(),
    startDate.getMonth() + 1,
    0
  ).getDate();
  const firstDayOfMonth = new Date(
    startDate.getFullYear(),
    startDate.getMonth(),
    1
  );
  const firstDayOfWeek = firstDayOfMonth.getDay();

  function getFirstDateOfWeek(date: Date): Date {
    const dayOfWeek = date.getDay(); // 0 (일요일)부터 6 (토요일)까지
    const firstDateOfWeek = new Date(date);
    firstDateOfWeek.setDate(date.getDate() - dayOfWeek);
    return firstDateOfWeek;
  }

  // 캘린더의 첫 번째 날짜를 `startDate`로 설정합니다.
  const startOfCalendar = getFirstDateOfWeek(startDate);
  startOfCalendar.setHours(0, 0, 0, 0);

  // startOfCalendar부터 42일치의 날짜 배열을 생성합니다.
  const calendarDays = useMemo(() => {
    return Array.from({ length: maxLength }, (_, index) => {
      const date = new Date(startOfCalendar);
      date.setDate(date.getDate() + index);
      return date;
    });
  }, [startOfCalendar]);

  // 캘린더 범위 내의 이벤트를 필터링합니다.
  const eventsForCalendar = useMemo(() => {
    const startCalendarDate = startOfCalendar;
    const endCalendarDate = new Date(startOfCalendar);
    endCalendarDate.setDate(endCalendarDate.getDate() + maxLength - 1);

    return schedules?.filter((event) => {
      const eventDate = new Date(event.startDate);
      return eventDate >= startCalendarDate && eventDate <= endCalendarDate;
    });
  }, [schedules, startOfCalendar]);

  // 특정 날짜의 이벤트를 가져옵니다.
  const getEventsForDate = (date: Date) => {
    // console.log(eventsForCalendar);;
    return eventsForCalendar?.filter((event) => {
      const eventDate = new Date(event.startDate);
      return (
        eventDate.getFullYear() === date.getFullYear() &&
        eventDate.getMonth() === date.getMonth() &&
        eventDate.getDate() === date.getDate()
      );
    });
  };

  return {
    calendarDays,
    firstDayOfWeek,
    daysInCurrentMonth,
    getEventsForDate,
  } as const;
}
