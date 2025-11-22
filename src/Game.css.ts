import { style } from '@vanilla-extract/css';

export const container = style({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  minHeight: '100vh',
  backgroundColor: '#f0f0f0',
  fontFamily: 'system-ui, -apple-system, sans-serif',
  padding: '20px',
});

export const title = style({
  fontSize: '2.5rem',
  fontWeight: 'bold',
  marginBottom: '20px',
  color: '#333',
});

export const scoreBoard = style({
  fontSize: '1.5rem',
  fontWeight: '600',
  marginBottom: '30px',
  color: '#555',
});

export const canvas = style({
  position: 'relative',
  width: '800px',
  height: '600px',
  backgroundColor: '#ffffff',
  border: '3px solid #333',
  borderRadius: '12px',
  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
  overflow: 'hidden',
});

export const letter = style({
  position: 'absolute',
  width: '80px',
  height: '80px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  fontSize: '48px',
  fontWeight: 'bold',
  borderRadius: '12px',
  cursor: 'grab',
  userSelect: 'none',
  transition: 'transform 0.1s ease',
  ':active': {
    cursor: 'grabbing',
  },
});

export const letterA = style({
  backgroundColor: '#4CAF50',
  color: 'white',
  boxShadow: '0 4px 8px rgba(76, 175, 80, 0.3)',
});

export const letterM = style({
  backgroundColor: '#2196F3',
  color: 'white',
  boxShadow: '0 4px 8px rgba(33, 150, 243, 0.3)',
});

export const dragging = style({
  opacity: 0.8,
  transform: 'scale(1.1)',
  zIndex: 1000,
});

export const instructions = style({
  marginTop: '20px',
  fontSize: '1.1rem',
  color: '#666',
  textAlign: 'center',
});


