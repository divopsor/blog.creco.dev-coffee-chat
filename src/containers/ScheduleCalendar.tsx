"use client";

import React, { useMemo, useState, useEffect } from "react";
import styles from "./ScheduleCalendar.module.css";
import Link from "next/link";
import { useCalendarDays } from "./useCalendarDays";

function useSchedule() {
  const [schedule, setSchedule] = useState();

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

export function ScheduleCalendar() {
  const schedules = useSchedule();
  const today = new Date();

  return (
    <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
      <h1>CreatiCoding's Schedules</h1>
      <div>
        {/* <h4>커피챗 장소</h4>
        <p>
          1. 강남역 카페{" "}
          <Link href="https://kko.to/i2m6H7gAQ3" target={"_blank"}>
            커피빈 강남역12번출구점
          </Link>
        </p>
        <p>
          2. 역삼역 카페{" "}
          <Link href="https://kko.to/ryFyBT1HWz" target={"_blank"}>
            투썸플레이스 역삼성홍타워점
          </Link>
        </p>

        <p>커피챗은 보통 1시간부터 최대 2시간 정도로 진행하고 있습니다.</p> */}

        <h2>
          {today.getFullYear()}년 {today.getMonth() + 1}월{" "}
          {schedules == null ? "(로딩 중...)" : "ㅤ"}
        </h2>
        <CalendarGrid schedules={schedules} />
      </div>
    </div>
  );
}

const daysOfWeek = ["일", "월", "화", "수", "목", "금", "토"];

const CalendarGrid = ({ schedules }: { schedules?: any[] }) => {
  const today = new Date();
  const { calendarDays, firstDayOfWeek, daysInCurrentMonth, getEventsForDate } =
    useCalendarDays({
      schedules: schedules ?? undefined,
      startDate: today,
    });

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

          return (
            <div
              key={index}
              className={[
                isPrevMonth || isNextMonth
                  ? styles.current__another__month
                  : styles.current__month,
                today.getMonth() === day.getMonth() &&
                today.getDate() === day.getDate()
                  ? styles.today
                  : "",
              ]
                .filter((x) => x !== "")
                .join(" ")}
            >
              <div>
                <p style={{ color: "var(--color-primary)" }}>
                  {day.getMonth() + 1}/{day.getDate()}
                </p>
                <div style={{ position: "relative" }}>
                  <EventList events={getEventsForDate(day)} />
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
    const topPaddingTime = 500;
    const unitSize = 320 / 900; // 0.36px
    const top = Math.max(0, ((totalMinutes - topPaddingTime) * unitSize));
    const height = Math.min(400 - top, (event.minutes * unitSize) - 10);

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
                : event.name.startsWith("H")
                ? "rgba(255, 100, 255, 0.3)"
                : event.name.startsWith("Extra")
                ? "rgba(150, 255, 150, 0.3)"
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
