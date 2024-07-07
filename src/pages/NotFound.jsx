import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
    return (
        <div style={styles.container}>
            <p style={styles.message}>Sorry, the page you are looking for does not exist.</p>
            <Link to="/" style={styles.link}>Go to Homepage</Link>
        </div>
    );
};

const styles = {
    container: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        textAlign: 'center',
        backgroundColor: '#f0f0f0'
    },
    message: {
        fontSize: '1.2em',
        marginBottom: '1em'
    },
    link: {
        textDecoration: 'none',
        color: '#007bff',
        fontSize: '1.2em'
    }
};

export default NotFound;
