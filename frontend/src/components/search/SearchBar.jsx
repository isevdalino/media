import { SEARCH } from '../../constants/Paths';
import './searchStyles.css';
import { useState } from 'react';
import 'font-awesome/css/font-awesome.min.css';

const SearchBar = () => {
    const { search } = window.location;
    const query = new URLSearchParams(search).get('s');
    const [searchQuery, setSearchQuery] = useState(query || '');

    const buttonStyle = {
        color: "white",
        background: "#0245c0",
    };

    return (
        <form action={SEARCH} method="get">
            <input
                value={searchQuery}
                onInput={e => setSearchQuery(e.target.value)}
                type="text"
                id="header-search"
                placeholder="Search.."
                name="s"
            />
            <button type="submit" style={buttonStyle}>
                <i className="fa fa-search"></i>
            </button>
        </form>
    );
}

export default SearchBar;