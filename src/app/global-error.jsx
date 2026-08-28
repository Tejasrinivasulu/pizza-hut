'use client';
export default function GlobalError({ error, reset, }) {
    return (<html lang='en'>
      <body style={{ background: '#111', color: '#fff', fontFamily: 'sans-serif', padding: '4rem', textAlign: 'center' }}>
        <h1 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>Something went wrong</h1>
        <p style={{ color: '#999', marginBottom: '2rem' }}>Please refresh the page or try again.</p>
        <button type='button' onClick={() => reset()} style={{ background: '#f5a623', color: '#111', border: 'none', padding: '0.75rem 1.5rem', borderRadius: '9999px', fontWeight: 600, cursor: 'pointer' }}>
          Try again
        </button>
      </body>
    </html>);
}
