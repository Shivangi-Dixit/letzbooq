import { SxProps, Theme } from '@mui/material';

export const styles: Record<string, SxProps<Theme>> = {
  formContainer: {
    bgcolor: 'background.default',
    minHeight: 'auto',
    py: 4,
    borderBottom: 1,
    borderColor: 'divider',
  },

  heroSection: {
    textAlign: 'center',
    mb: 3,
  },
  heroTitle: {
    fontWeight: 800,
    fontSize: { xs: '1.5rem', md: '2rem' },
    mb: 1,
  },
  gradientText: {
    background: 'linear-gradient(45deg, #3b82f6, #0ea5e9)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
  },

  paper: {
    p: 2,
    borderRadius: 3,
    border: '1px solid rgba(59, 130, 246, 0.15)',
  },

  topRow: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    mb: 2,
  },

  passengerButton: {
    borderRadius: 2,
    textTransform: 'none',
    fontSize: '0.75rem',
    borderColor: 'divider',
    color: 'text.secondary',
    height: 32,
  },

  locationsContainer: {
    flex: { xs: 'none', lg: 2.5 },
    display: 'flex',
    alignItems: 'center',
    gap: 0.5,
    px: 1.5,
    py: 0.5,
    bgcolor: 'rgba(51, 65, 85, 0.2)',
    borderRadius: 2,
    border: '1px solid',
    borderColor: 'divider',
    height: 48,
  },
  locationInput: {
    flex: 1,
    minWidth: 0,
  },
  locationLabel: {
    fontWeight: 800,
    fontSize: '0.6rem',
    ml: 1,
    display: 'block',
    mb: -0.5,
  },
  swapIconContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    p: 0.5,
    bgcolor: 'background.paper',
    borderRadius: '50%',
    border: '1px solid',
    borderColor: 'divider',
    mt: 1,
  },

  datesContainer: {
    flex: { xs: 'none', lg: 1.5 },
    height: 48,
  },
  datePickerField: {
    '& .MuiInputBase-root': { 
      height: 48, 
      bgcolor: 'rgba(51, 65, 85, 0.2)' 
    },
    '& .MuiInputBase-input': { 
      fontSize: '0.8rem', 
      pt: 2 
    },
  },

  searchButton: {
    minWidth: { xs: 'full', lg: 120 },
    height: 48,
    borderRadius: 2,
    fontSize: '0.9rem',
    flexShrink: 0,
    boxShadow: 'none',
  },

  mainStack: {
    alignItems: 'stretch',
  },

  popoverContent: {
    p: 2,
  },
  passengerControl: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: 200,
    py: 1,
  },
  passengerLabel: {
    fontWeight: 600,
  },
};
