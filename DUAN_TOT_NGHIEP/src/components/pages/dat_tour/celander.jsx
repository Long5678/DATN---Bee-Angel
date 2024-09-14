// lịch
import "../../../publics/styles/datTour.scss"
import { useEffect, useState } from "react";

function Celander() {
    const [currentDate, setCurrentDate] = useState(new Date());
    const [currentMonth, setCurrentMonth] = useState(currentDate.getMonth());
    const [currentYear, setCurrentYear] = useState(currentDate.getFullYear());

    const monthNames = [
        'January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December',
    ];

    const isLeapYear = (year) => {
        return (year % 4 === 0 && year % 100 !== 0) || (year % 400 === 0);
    };

    const getFebDays = (year) => (isLeapYear(year) ? 29 : 28);
  
    const generateCalendar = (month, year) => {
        let daysOfMonth = [
            31, getFebDays(year), 31, 30, 31, 30,
            31, 31, 30, 31, 30, 31,
        ];

        let firstDay = new Date(year, month).getDay();
        let daysArray = [];

        for (let i = 0; i <= daysOfMonth[month] + firstDay - 1; i++) {
            if (i >= firstDay) {
                const day = i - firstDay + 1;
                daysArray.push(
                    <div
                        key={i}
                        className={
                            day === currentDate.getDate() &&
                                year === currentDate.getFullYear() &&
                                month === currentDate.getMonth()
                                ? 'current-date'
                                : ''
                        }
                    >
                        {day}
                    </div>
                );
            } else {
                daysArray.push(<div key={i}></div>);
            }
        }

        return daysArray;
    };

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentDate(new Date());
        }, 1000);
        return () => clearInterval(interval);
    }, []);

    return <>
        <div className="container">
            <div className="calendar">
                <div className="calendar-header">
                    <span
                        className="month-picker"
                        id="month-picker"
                        onClick={() => {
                            document.querySelector('.month-list').classList.toggle('show');
                        }}
                    >
                        {monthNames[currentMonth]}
                    </span>
                    <div className="year-picker" id="year-picker">
                        <span
                            className="year-change"
                            id="pre-year"
                            onClick={() => setCurrentYear(currentYear - 1)}
                        >
                            {'<'}
                        </span>
                        <span id="year">{currentYear}</span>
                        <span
                            className="year-change"
                            id="next-year"
                            onClick={() => setCurrentYear(currentYear + 1)}
                        >
                            {'>'}
                        </span>
                    </div>
                </div>

                <div className="calendar-body">
                    <div className="calendar-week-days">
                        <div>Sun</div>
                        <div>Mon</div>
                        <div>Tue</div>
                        <div>Wed</div>
                        <div>Thu</div>
                        <div>Fri</div>
                        <div>Sat</div>
                    </div>
                    <div className="calendar-days">{generateCalendar(currentMonth, currentYear)}</div>
                </div>
                <div className="calendar-footer"></div>

                <div className="date-time-formate">
                    <div className="day-text-formate">TODAY</div>
                    <div className="date-time-value">
                        <div className="time-formate">
                            {currentDate.toLocaleTimeString('en-US', {
                                hour: 'numeric',
                                minute: 'numeric',
                                second: 'numeric',
                            })}
                        </div>
                        <div className="date-formate">
                            {currentDate.toLocaleDateString('en-US', {
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric',
                                weekday: 'long',
                            })}
                        </div>
                    </div>
                </div>

                <div className="month-list">
                    {monthNames.map((month, index) => (
                        <div
                            key={index}
                            onClick={() => {
                                setCurrentMonth(index);
                                document.querySelector('.month-list').classList.toggle('show');
                            }}
                        >
                            <div>{month}</div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    </>
}

export default Celander
