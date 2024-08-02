import React, { FC, useState } from 'react';
import classes from './Calendar.module.scss';
import classNames from 'classnames';
import CalendarControl from "./Components/CalendarControl/CalendarControl";

interface CalendarProps {
    date: Date;
    showMonthControl?: boolean;
    items?: CalendarItem[];
    changeMonth?: (offset: number) => void;
    clickDayCallback?: (day: Date) => void
}

export interface CalendarItem {
    date: string;
    component: React.ReactNode;
}

const Calendar: FC<CalendarProps> = ({ date, showMonthControl = false, items = [], changeMonth, clickDayCallback }) => {
    const today = new Date();
    const dayNames = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Нд'];

    const daysInMonth = (month: number, year: number) => {
        return new Date(year, month + 1, 0).getDate();
    };
    const getFirstDayOfMonth = (month: number, year: number) => {
        return new Date(year, month, 1).getDay();
    };
    const areDatesEqual = (date1: Date, date2: Date) => {
        return date1.getFullYear() === date2.getFullYear() &&
            date1.getMonth() === date2.getMonth() &&
            date1.getDate() === date2.getDate();
    };
    const generateDaysArray = () => {
        const month = date.getMonth();
        const year = date.getFullYear();
        const firstDay = getFirstDayOfMonth(month, year);
        const daysInCurrentMonth = daysInMonth(month, year);
        const daysArray = [];
        const emptyCells = (firstDay + 6) % 7;

        for (let i = 0; i < emptyCells; i++) {
            daysArray.push({ key: `empty-${i}`, className: classes.emptyDay, content: '' });
        }

        for (let day = 1; day <= daysInCurrentMonth; day++) {
            const date = new Date(year, month, day);
            const isToday = areDatesEqual(date, today);
            const isPast = date < today;
            const dayClass = isToday ? classes.today : isPast ? classes.pastDay : "";

            daysArray.push({
                key: day,
                className: dayClass,
                dayNumber: day,
                date: date,
                content: items
                    .filter(item => areDatesEqual(new Date(item.date), date))
                    .map((item, index) => <div key={index}>{item.component}</div>)
            });
        }

        const totalCells = daysArray.length;
        const totalRows = Math.ceil(totalCells / 7);
        const cellsInCalendar = totalRows * 7;
        const emptyCellsAfter = cellsInCalendar - totalCells;

        for (let i = 0; i < emptyCellsAfter; i++) {
            daysArray.push({ key: `empty-after-${i}`, className: classes.emptyDay, content: '' });
        }

        return daysArray;
    };


    const daysArray = generateDaysArray();

    return (
        <div className={classes.calendar}>

            {(showMonthControl && changeMonth) &&
                <CalendarControl date={date} changeMonth={changeMonth}/>
            }

            <div className={classes.daysHeader}>
                {dayNames.map((dayName, index) => (
                    <div key={index} className={classes.nameDays}>
                        {dayName}
                    </div>
                ))}
            </div>

            <div className={classes.days}>
                {daysArray.map(day =>
                    day.dayNumber ? (
                        <div
                            key={day.key}
                            className={classNames(classes.day, day.className)}
                            onClick={() => {
                                if(clickDayCallback) clickDayCallback(day.date)
                            }}
                        >

                            <span className={classes.dayNumber}>{day.dayNumber}</span>

                            <div className={classes.dayContent}>
                                {day.content}
                            </div>

                        </div>
                    ) : (
                        <div key={day.key} className={classes.emptyDay} />
                    )
                )}
            </div>

        </div>
    );
};

export default Calendar;
