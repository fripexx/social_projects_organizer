import React, { useState } from 'react';
import classes from './Calendar.module.scss';
import classNames from "classnames";

const Calendar: React.FC = () => {
    const [currentDate, setCurrentDate] = useState(new Date());
    const today = new Date();

    const dayNames = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Нд'];
    const monthNames = [
        'Січень', 'Лютий', 'Березень', 'Квітень', 'Травень', 'Червень',
        'Липень', 'Серпень', 'Вересень', 'Жовтень', 'Листопад', 'Грудень'
    ];

    const daysInMonth = (month: number, year: number) => {
        return new Date(year, month + 1, 0).getDate();
    };
    const getFirstDayOfMonth = (month: number, year: number) => {
        return new Date(year, month, 1).getDay();
    };
    const changeMonth = (offset: number) => {
        const newDate = new Date(currentDate.setMonth(currentDate.getMonth() + offset));
        setCurrentDate(newDate);
    };
    const generateDaysArray = () => {
        const month = currentDate.getMonth();
        const year = currentDate.getFullYear();
        const firstDay = getFirstDayOfMonth(month, year);
        const daysInCurrentMonth = daysInMonth(month, year);

        const daysArray = [];
        // Обчислення кількості порожніх клітинок на початку місяця
        const emptyCells = (firstDay + 6) % 7;

        // Додайємо порожні клітинки для днів до першого числа місяця
        for (let i = 0; i < emptyCells; i++) {
            daysArray.push({ key: `empty-${i}`, className: classes.emptyDay, content: '' });
        }

        // Додаємо дня місяця
        for (let day = 1; day <= daysInCurrentMonth; day++) {
            const date = new Date(year, month, day);
            const isToday = date.toDateString() === today.toDateString();
            const isPast = date < today;

            const dayClass = isToday ? classes.today : isPast ? classes.pastDay : "";

            daysArray.push({
                key: day,
                className: dayClass,
                dayNumber: day
            });
        }

        // Обчислення кількості порожніх клітинок наприкінці місяця, щоб заповнити тиждень
        const totalCells = daysArray.length;
        const totalRows = Math.ceil(totalCells / 7);
        const cellsInCalendar = totalRows * 7;
        const emptyCellsAfter = cellsInCalendar - totalCells;

        // Додаємо порожні клітинки для днів після закінчення місяця
        for (let i = 0; i < emptyCellsAfter; i++) {
            daysArray.push({ key: `empty-after-${i}`, className: classes.emptyDay, content: '' });
        }

        return daysArray;
    };

    const daysArray = generateDaysArray();

    return (
        <div className={classes.calendar}>

            <div className={classes.header}>

                <button
                    className={classes.changeMonthButton}
                    onClick={() => changeMonth(-1)}
                >
                    <svg width="8" height="12" viewBox="0 0 8 12" fill={"var(--Color-SVG, #FDFDFD"} xmlns="http://www.w3.org/2000/svg"><path d="M0.66691 6.46824L6.00706 11.8083C6.13057 11.9319 6.29545 12 6.47125 12C6.64706 12 6.81193 11.9319 6.93544 11.8083L7.32871 11.4151C7.58461 11.1589 7.58461 10.7426 7.32871 10.4867L2.84445 6.00249L7.33368 1.5133C7.4572 1.3896 7.52539 1.2249 7.52539 1.0492C7.52539 0.8733 7.4572 0.7085 7.33368 0.5848L6.94042 0.1917C6.81681 0.0681 6.65203 0 6.47623 0C6.30043 0 6.13555 0.0681 6.01204 0.1917L0.66691 5.53664C0.54311 5.66064 0.47511 5.8262 0.4755 6.0022C0.47511 6.17888 0.54311 6.34434 0.66691 6.46824Z"/></svg>
                </button>

                <span className={classes.nameMonth}>
                    {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
                </span>

                <button
                    className={classNames(classes.changeMonthButton, classes.nextButton)}
                    onClick={() => changeMonth(1)}
                >
                    <svg width="8" height="12" viewBox="0 0 8 12" fill={"var(--Color-SVG, #FDFDFD"} xmlns="http://www.w3.org/2000/svg"><path d="M0.66691 6.46824L6.00706 11.8083C6.13057 11.9319 6.29545 12 6.47125 12C6.64706 12 6.81193 11.9319 6.93544 11.8083L7.32871 11.4151C7.58461 11.1589 7.58461 10.7426 7.32871 10.4867L2.84445 6.00249L7.33368 1.5133C7.4572 1.3896 7.52539 1.2249 7.52539 1.0492C7.52539 0.8733 7.4572 0.7085 7.33368 0.5848L6.94042 0.1917C6.81681 0.0681 6.65203 0 6.47623 0C6.30043 0 6.13555 0.0681 6.01204 0.1917L0.66691 5.53664C0.54311 5.66064 0.47511 5.8262 0.4755 6.0022C0.47511 6.17888 0.54311 6.34434 0.66691 6.46824Z"/></svg>
                </button>

            </div>

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
                        >

                            <span className={classes.dayNumber}>{day.dayNumber}</span>

                            <div className={classes.dayContent}>

                            </div>

                        </div>
                    ) : (
                        <div key={day.key} className={classes.emptyDay}/>
                    )
                )}

            </div>

        </div>
    );
};

export default Calendar;
