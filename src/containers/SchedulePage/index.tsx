"use client";

import React, { useMemo } from "react";
import styles from "./index.module.css";
import { useSchedule } from "./useSchedule";

export function SchedulePage() {
  const schedules = useSchedule();
  const today = new Date();

  return (
    <div style={{ padding: "20px" }}>
      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
        <h1>CreatiCoding's Schedules</h1>
        <div>
          <h2>
            {today.getFullYear()}년 {today.getMonth() + 1}월
          </h2>

          <h4>{schedules == null ? "로딩 중..." : 'ㅤ'}</h4>

          <CalendarGrid schedules={schedules} />
        </div>
      </div>
    </div>
  );
}

const daysOfWeek = ["일", "월", "화", "수", "목", "금", "토"];

const CalendarGrid = ({ schedules }: { schedules: null | any[] }) => {
  const today = new Date();
  const firstDayOfMonth = useMemo(
    () => new Date(today.getFullYear(), today.getMonth(), 1),
    [today]
  );
  const firstDayOfWeek = firstDayOfMonth.getDay();
  const daysInCurrentMonth = useMemo(
    () => new Date(today.getFullYear(), today.getMonth() + 1, 0).getDate(),
    [today]
  );
  const daysInPreviousMonth = useMemo(
    () => new Date(today.getFullYear(), today.getMonth(), 0).getDate(),
    [today]
  );

  const LENGTH = today.getDay() === firstDayOfWeek ? 35 : 42;

  const calendarDays = useMemo(() => {
    return Array.from({ length: LENGTH }, (_, index) => {
      if (index < firstDayOfWeek) {
        return daysInPreviousMonth - firstDayOfWeek + index + 1;
      }
      if (index >= firstDayOfWeek + daysInCurrentMonth) {
        return index - (firstDayOfWeek + daysInCurrentMonth) + 1;
      }
      return index - firstDayOfWeek + 1;
    });
  }, [firstDayOfWeek, daysInCurrentMonth, daysInPreviousMonth]);

  const eventsForMonth = useMemo(() => {
    return schedules?.filter((event) => {
      const eventDate = new Date(event.startDate);
      return (
        eventDate.getMonth() >= today.getMonth() - 1 &&
        eventDate.getMonth() <= today.getMonth() + 1
      );
    });
  }, [schedules, today]);

  const getEventsForDate = (date: Date) => {
    return eventsForMonth?.filter((event) => {
      const eventDate = new Date(event.startDate);
      return (
        eventDate.getDate() === date.getDate() &&
        eventDate.getMonth() === date.getMonth()
      );
    });
  };

  return (
    <div className={styles.calendar}>
      <div className={styles.calendar__header}>
        {daysOfWeek.map((day, index) => (
          <div key={index} className={styles.calendar__header_cell}>
            {day}
          </div>
        ))}
      </div>

      <br />

      <div className={styles.calendar__body}>
        {calendarDays.map((day, index) => {
          const isPrevMonth = index < firstDayOfWeek;
          const isNextMonth = index >= firstDayOfWeek + daysInCurrentMonth;
          const monthOffset = isPrevMonth ? -1 : isNextMonth ? 1 : 0;
          const currentMonth = today.getMonth() + 1;
          const previousMonth = currentMonth - 1;
          const nextMonth = currentMonth + 1;

          const targetDate = new Date(
            today.getFullYear(),
            today.getMonth() + monthOffset,
            day
          );

          return (
            <div
              key={index}
              className={
                isPrevMonth || isNextMonth
                  ? styles.current__another__month
                  : styles.current__month
              }
            >
              <div>
                <p style={{ color: "var(--color-primary)" }}>
                  {isPrevMonth
                    ? previousMonth
                    : isNextMonth
                    ? nextMonth
                    : currentMonth}
                  /{day}
                </p>
                <div style={{ position: "relative" }}>
                  <EventList events={getEventsForDate(targetDate)} />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

interface Event {
  name: string;
  startDate: string;
  startTime: string;
  endTime: string;
  minutes: number;
  hours: number;
}

interface EventListProps {
  events?: Event[];
}

const EventList: React.FC<EventListProps> = ({ events }) => {
  // 아침 9시부터 밤 12시까지의 시간대를 15분 단위로 나누어 900분으로 나누어 1분당 0.33px로 계산
  // 아침 9시부터 밤 9시까지로 바꾸려면, 12시간을 900분으로 나누어 1분당 0.75px로 계산
  const calculatePosition = (event: Event) => {
    const [hour, min] = event.startTime.split(":").map(Number);
    const totalMinutes = hour * 60 + min;
    const top = Math.max(0, ((totalMinutes - 540) * 400) / 900);
    const height = Math.min(400 - top, (event.minutes * 400) / 900 - 10);

    return {
      top,
      height: top + height > 385 ? 400 - top : height,
    };
  };

  return (
    <>
      {(events ?? []).map((event, idx) => {
        const { top, height } = calculatePosition(event);
        const eventStyle = {
          top: `${top}px`,
          height: `${height}px`,
        };

        return (
          <div
            title={`${event.name} ${event.startTime} - ${event.endTime}`}
            key={idx}
            style={{
              ...eventStyle,
              position: "absolute",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              width: "calc(100% - 18px)",
              // if free, set green bg
              backgroundColor: event.name.toLowerCase().startsWith("free")
                ? "rgba(0, 255, 0, 0.3)"
                : event.name.startsWith("커피챗")
                ? "rgba(255, 255, 0, 0.3)"
                : "rgba(0, 0, 0, 0.1)",
              fontWeight: event.name.toLowerCase().startsWith("free")
                ? "bold"
                : "unset",
              padding: "0px 8px",
              borderRadius: "16px",
              minHeight: "15px",
              border: event.name.toLowerCase().startsWith("free")
                ? "1px solid rgba(20, 55, 20, 0.7)"
                : event.name.startsWith("커피챗")
                ? "1px solid rgba(155, 155, 10, 0.7)"
                : "unset",
            }}
          >
            {height > 30 ? (
              <div
                style={{
                  fontSize: "14px",
                  textAlign: "center",
                }}
              >
                {event.name}
                <br />
                {event.startTime} - {event.endTime}
              </div>
            ) : (
              <p style={{ fontSize: "14px" }}>
                {`${event.name} `}
                <span style={{ fontSize: "12px" }}>
                  {event.startTime} - {event.endTime}
                </span>
              </p>
            )}
          </div>
        );
      })}
    </>
  );
};
