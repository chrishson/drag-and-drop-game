import { style, globalStyle } from '@vanilla-extract/css';

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

export const gameObject = style({
  position: 'absolute',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  cursor: 'grab',
  userSelect: 'none',
  transition: 'transform 0.1s ease',
  ':active': {
    cursor: 'grabbing',
  },
});

globalStyle(`${gameObject} img`, {
  width: '100%',
  height: '100%',
  objectFit: 'contain',
  pointerEvents: 'none',
});

export const mallet = style({
  width: '140px',
  height: '140px',
  filter: 'drop-shadow(0 4px 8px rgba(0, 0, 0, 0.2))',
  zIndex: 10,
});

export const mole = style({
  width: '165px',
  height: '165px',
  filter: 'drop-shadow(0 4px 8px rgba(0, 0, 0, 0.15))',
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

// Setup Screen Styles
export const setupCard = style({
  backgroundColor: '#fff',
  borderRadius: '16px',
  padding: '40px',
  boxShadow: '0 8px 24px rgba(0, 0, 0, 0.12)',
  maxWidth: '600px',
  width: '100%',
  textAlign: 'center',
});

export const setupTitle = style({
  fontSize: '2rem',
  fontWeight: 'bold',
  color: '#333',
  marginBottom: '16px',
});

export const setupDescription = style({
  fontSize: '1.1rem',
  color: '#666',
  marginBottom: '32px',
  lineHeight: '1.6',
});

export const buttonGroup = style({
  display: 'flex',
  gap: '20px',
  justifyContent: 'center',
  flexWrap: 'wrap',
});

export const targetButton = style({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  padding: '24px 32px',
  backgroundColor: '#fff',
  border: '3px solid #ddd',
  borderRadius: '12px',
  cursor: 'pointer',
  transition: 'all 0.2s ease',
  minWidth: '140px',
  ':hover': {
    borderColor: '#4CAF50',
    transform: 'translateY(-4px)',
    boxShadow: '0 6px 16px rgba(76, 175, 80, 0.2)',
  },
  ':active': {
    transform: 'translateY(-2px)',
  },
});

export const targetNumber = style({
  fontSize: '3rem',
  fontWeight: 'bold',
  color: '#4CAF50',
  marginBottom: '8px',
});

export const targetLabel = style({
  fontSize: '0.9rem',
  color: '#666',
  textTransform: 'uppercase',
  letterSpacing: '0.5px',
});

// Game Stats Styles
export const gameStats = style({
  display: 'flex',
  gap: '24px',
  marginBottom: '24px',
});

export const statBox = style({
  backgroundColor: '#fff',
  padding: '16px 32px',
  borderRadius: '12px',
  boxShadow: '0 2px 8px rgba(0, 0, 0, 0.08)',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: '8px',
  minWidth: '160px',
});

export const statLabel = style({
  fontSize: '0.9rem',
  color: '#666',
  textTransform: 'uppercase',
  letterSpacing: '0.5px',
  fontWeight: '500',
});

export const statValue = style({
  fontSize: '1.8rem',
  fontWeight: 'bold',
  color: '#333',
});

// Finish Screen Styles
export const finishCard = style({
  backgroundColor: '#fff',
  borderRadius: '16px',
  padding: '48px',
  boxShadow: '0 8px 24px rgba(0, 0, 0, 0.12)',
  maxWidth: '600px',
  width: '100%',
  textAlign: 'center',
});

export const finishTitle = style({
  fontSize: '2rem',
  fontWeight: 'bold',
  color: '#333',
  marginBottom: '32px',
});

export const timeDisplay = style({
  backgroundColor: '#f8f9fa',
  padding: '24px',
  borderRadius: '12px',
  marginBottom: '32px',
  display: 'flex',
  flexDirection: 'column',
  gap: '8px',
});

export const timeLabel = style({
  fontSize: '1rem',
  color: '#666',
  textTransform: 'uppercase',
  letterSpacing: '0.5px',
});

export const timeValue = style({
  fontSize: '3.5rem',
  fontWeight: 'bold',
  color: '#4CAF50',
  fontFamily: 'monospace',
});

export const statsGrid = style({
  display: 'grid',
  gridTemplateColumns: '1fr 1fr',
  gap: '16px',
  marginBottom: '32px',
});

export const statItem = style({
  backgroundColor: '#f8f9fa',
  padding: '20px',
  borderRadius: '8px',
  display: 'flex',
  flexDirection: 'column',
  gap: '8px',
});

export const playAgainButton = style({
  backgroundColor: '#4CAF50',
  color: '#fff',
  border: 'none',
  borderRadius: '8px',
  padding: '16px 48px',
  fontSize: '1.2rem',
  fontWeight: 'bold',
  cursor: 'pointer',
  transition: 'all 0.2s ease',
  ':hover': {
    backgroundColor: '#45a049',
    transform: 'translateY(-2px)',
    boxShadow: '0 4px 12px rgba(76, 175, 80, 0.3)',
  },
  ':active': {
    transform: 'translateY(0)',
  },
});
