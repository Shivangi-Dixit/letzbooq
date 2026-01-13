import { SxProps, Theme } from '@mui/material';

export const styles: Record<string, SxProps<Theme>> = {
  listbox: {
    maxHeight: 300,
    '& ul': {
      padding: 0,
      margin: 0,
    }
  },
  option: {
    display: 'flex',
    alignItems: 'center',
    gap: 1.5,
    py: 1,
    px: 2,
    width: '100%',
  },
  optionContent: {
    flex: 1,
    minWidth: 0,
  },
  optionCity: {
    display: 'flex',
    alignItems: 'center',
    gap: 1,
  },
  inputProps: {
    fontSize: '0.9rem',
  },
  locationIcon: {
    fontSize: 20,
    opacity: 0.5,
  },
  flightIcon: {
    fontSize: 16,
    opacity: 0.5,
  },
  spinner: {
    fontSize: 16,
  },
};
