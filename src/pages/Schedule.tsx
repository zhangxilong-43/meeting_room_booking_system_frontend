import React, { useEffect, useRef, useState } from "react";
import FullCalendar from '@fullcalendar/react';
import { CalendarApi } from '@fullcalendar/core';
import listPlugin from '@fullcalendar/list';
import timeGridPlugin from '@fullcalendar/timegrid'
import dayjs from 'dayjs';

export function Schedule() {
    const calendarRef = useRef<FullCalendar>(null)
    const [calendarApi, setCalendarApi] = useState<CalendarApi>();
    const [dataTitle, setDataTitle] = useState<string>('');

    useEffect(() => {
        const calendar = calendarRef.current;
        if (calendar) {
            const calendarApi = (calendar as FullCalendar).getApi();
            setCalendarApi(calendarApi);
            setDataTitle(getDate());
        }
    }, [calendarRef.current])

    function next() {
        if (calendarApi) {
            calendarApi.next();
            setDataTitle(getDate());
        }
    };

    function prev() {
        if (calendarApi) {
            calendarApi.prev();
            setDataTitle(getDate());
        }
    };

    function getDate() {
        if (!calendarApi) return ''
        const date = calendarApi.getDate()
        return dayjs(date.toString()).format('DD/MM/YYYY');
    };

    return (
        <>
            <div className="w-[96vw] h-[92vh] m-[2vw] my-[4vh] rounded-lg overflow-hidden bg-primary-content">
                <div className="p-[20px] h-[92vh] overflow-scroll">
                    <header className="h-[4vh] flex justify-between nowrap mb-[1vh]">
                        <button className="btn btn-outline btn-primary" onClick={prev}>Prev</button>
                        <p className="text-[33px] font-[700] text-primary">
                            { dataTitle }
                        </p>
                        <button className="btn btn-outline btn-primary" onClick={next}>Next</button>
                    </header>
                    <FullCalendar
                        ref={calendarRef}
                        height={'83vh'}
                        plugins={[ listPlugin, timeGridPlugin ]}
                        initialView="timeGridWeek"
                        headerToolbar={false}
                        hiddenDays={[ 0, 6 ]}
                        slotDuration='00:10:00'
                        slotMinTime='09:30:00'
                        slotMaxTime='21:30:00'
                    />
                </div>
            </div>
        </>
    )
} 