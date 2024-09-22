import { Link } from "react-router-dom";

const NotFound = () => {
    const styles = {
        container: {
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100vh',
            textAlign: 'center',
            backgroundColor: '#f8f8f8',
        },
        box: {
            backgroundColor: 'white',
            padding: '2em',
            boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
            borderRadius: '8px',
        },
        heading: {
            fontSize: '3em',
            color: '#333',
            marginBottom: '0.5em',
        },
        paragraph: {
            fontSize: '1.2em',
            color: '#666',
        },
        link: {
            display: 'inline-block',
            marginTop: '1em',
            textDecoration: 'none',
            color: '#007BFF',
            fontWeight: 'bold',
        },
    };
    return (
        <div style={styles.container}>
            <div style={styles.box}>
                <h1 style={styles.heading}>404</h1>
                <p style={styles.paragraph}>Página No Encontrada</p>
                <p style={styles.paragraph}>Lo sentimos, pero la página que buscas no existe.</p>
                <Link to="/" style={styles.link}>Volver al inicio</Link>
            </div>
        </div>
    );
};

export default NotFound;