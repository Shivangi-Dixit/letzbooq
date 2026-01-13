// src/components/flight-search-form/EmptyState.styles.ts
import { SxProps, Theme } from '@mui/material';

export const styles: Record<string, SxProps<Theme>> = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    py: 12,
    px: 2,
    textAlign: 'center'
  },
  planeContainer: {
    width: 120,
    height: 120,
    borderRadius: '50%',
    bgcolor: 'rgba(59, 130, 246, 0.05)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    mb: 4,
    position: 'relative'
  },
  planeIcon: {
    fontSize: 60,
    color: 'primary.main',
    opacity: 0.8
  },
  ring: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    borderRadius: '50%',
    border: '1px solid',
    borderColor: 'primary.main'
  },
  title: {
    fontWeight: 700,
    mb: 1,
    color: 'text.primary'
  },
  subtitle: {
    maxWidth: 400,
    color: 'text.secondary'
  }
};
