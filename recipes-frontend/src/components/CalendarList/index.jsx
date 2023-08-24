import React from 'react';
import { format } from 'date-fns';
import { sendRequest } from '../../core/config/request';
import { requestMethods } from '../../core/enums/requestMethods';

function CalendarList({ events, fetchData }) {

    console.log(events)
    
    if (events === 0) {
        return <p className='note'>No Planned Meals </p>;
    }
    if (!events) {
        return <p className='note'>Loading Planned Meals... </p>;
    }
    

    const handleDelete = async (eventId) => {
        try {
            const response = await sendRequest({
                route: `/user/calendar/events/${eventId}`,
                method: requestMethods.POST,
            });
            console.log(response);
            fetchData(); 
        } catch (error) {
            console.error('Failed to delete event:', error);
        }
    };

    return (
        <div className="table-container">
            <table id="calendarTable">
                <thead>
                    <tr>
                        <th>Date</th>
                        <th>Recipe Name</th>
                        <th>Recipe Cuisine</th>
                    </tr>
                </thead>
                <tbody id="calendarBody">
                    {events.map((event, index) => (
                        <tr key={index}>
                            <td>{format(new Date(event.event_date), 'MMMM do, yyyy')}</td>
                            <td>{event.recipe.name}</td>
                            <td>{event.recipe.cuisine}</td>
                            <td className='delete-btn'>
                                <button onClick={() => handleDelete(event.id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default CalendarList;
