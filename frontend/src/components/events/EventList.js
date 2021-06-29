import { useHistory } from 'react-router-dom';
import { cardContainerStyleSheet, cardStyleSheet } from '../articles/articlesStyles';
import { pollCardStyle } from '../polls/pollStyles';

const EventList = ({ events }) => {
    const containerStyle = cardContainerStyleSheet();

    const history = useHistory();
    const handleClick = id => { history.push('/events/' + id) };

    const isArrayEmpty = events === undefined || events.length == 0;

    return (
        <div style={containerStyle}>
            {isArrayEmpty ?
                <h4>There aren't any events yet.</h4>
                :
                events.map(event => (
                    <div style={pollCardStyle} key={event.id} onClick={(e) => handleClick(event.id, e)} >
                        <h4>{event.name}</h4>
                    </div>
                ))
            }
        </div>
    )
}

export default EventList;
