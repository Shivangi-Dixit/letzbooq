import { SxProps, Theme } from '@mui/material';

export const styles: Record<string, SxProps<Theme>> = {
  container: {
    minHeight: '100vh',
    bgcolor: 'background.default',
    pb: 10,
  },
  backdrop: {
    color: '#fff',
    zIndex: (theme: Theme) => theme.zIndex.modal + 1,
    backdropFilter: 'blur(8px)',
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    flexDirection: 'column',
    gap: 3,
    p: 4,
  },
  spinnerContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: 2,
  },
  textContainer: {
    textAlign: 'center',
    color: 'white',
  },
  titleText: {
    fontSize: '1.2rem',
    fontWeight: 600,
    mb: 0.5,
  },
  subtitleText: {
    fontSize: '0.9rem',
    opacity: 0.8,
  },
  errorContainer: {
    p: 2,
    color: 'error.main',
    textAlign: 'center',
  },
};
