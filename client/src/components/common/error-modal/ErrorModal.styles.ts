import { SxProps, Theme } from '@mui/material';

export const styles: Record<string, SxProps<Theme>> = {
  modalBackdrop: {
    backdropFilter: 'blur(8px)',
    backgroundColor: 'rgba(0, 0, 0, 0.7)'
  },
  modalBox: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: { xs: '90%', sm: 420, md: 450 },
    maxWidth: '90vw',
    maxHeight: '90vh',
    bgcolor: 'background.paper',
    borderRadius: 3,
    boxShadow: 24,
    p: { xs: 3, sm: 4 },
    outline: 'none',
    overflowY: 'auto',
  },
  header: {
    display: 'flex',
    alignItems: 'center',
    gap: 2,
    mb: 3
  },
  errorIcon: {
    fontSize: 36,
    flexShrink: 0
  },
  titleContainer: {
    display: 'flex',
    flexDirection: 'column'
  },
  title: {
    color: 'error.main',
    fontWeight: 700,
    mb: 0.5
  },
  subtitle: {
    color: 'text.secondary'
  },
  errorMessage: {
    mb: 4,
    lineHeight: 1.6,
    color: 'text.primary',
    fontSize: { xs: '0.95rem', sm: '1rem' }
  },
  dismissButton: {
    py: 1.5,
    fontWeight: 600,
    borderRadius: 2,
    fontSize: '0.95rem',
    boxShadow: '0 4px 12px rgba(0,0,0,0.15)'
  }
};
