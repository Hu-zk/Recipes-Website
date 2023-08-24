import React, { useEffect, useState } from 'react'
import "./style.css"
import CalendarList from '../../components/CalendarList'
import { sendRequest } from '../../core/config/request';
import { requestMethods } from '../../core/enums/requestMethods';

function Calendar() {

    const [events, setEvents] = useState([]);
    
    const fetchData = async () =>{
        try {
            const response = await sendRequest({
                route: "/user/calendar/events",
                method: requestMethods.GET,
            });
            console.log(response)
            setEvents(response.planned_meals)
        } catch (error) {
            console.error('failed:', error);
        }
    }
    
    useEffect(() => {
        fetchData();
    }, []);

    return (
        <div className='home-page-container'>
            <div className='page-title'>Calendar :</div>
            <CalendarList events={events} fetchData={fetchData}/>
        </div>
    )
}

export default Calendar