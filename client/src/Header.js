import React from 'react';

export default function Header(props) {

    const shortHeaderStyle = {
        backgroundColor: '#1D4B73',
        color: '#F2F2F2',
        maxWidth: '2000px',
        height: '8vh',
        margin: '0 0 1% 0',
        paddingLeft: '1em',
    }

    const longHeaderStyle = {
        backgroundColor: '#1D4B73',
        color: '#F2F2F2',
        maxWidth: '2500px',
        height: '21vh',
        margin: '0 0 1% 0',
        paddingLeft: '1em',
        lineHeight: '1.2em',
    }

    return (
        <header style={props.data.length === 0 ? longHeaderStyle : shortHeaderStyle}>
            <h1>todo tracker</h1>
            {props.data.length === 0  ?
                <div className="header__text">
                    <p>Here can you create your todo lists.</p>
                    <p>You can add new cards to each list. You can edit, move and delete your cards.</p>
                    <p>To begin with create a new list.</p>
                </div>
                : null}
        </header>
    )
}