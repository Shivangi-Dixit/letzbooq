import { SxProps, Theme } from '@mui/material';

export const styles: Record<string, SxProps<Theme>> = {
  container: {
    flexGrow: 1,
    py: 2,
    px: 4,
  },
  noFlights: {
    py: 8,
    textAlign: 'center',
  },
  paginationContainer: {
    mt: 6,
    mb: 4,
    alignItems: 'center',
  },
  pagination: {
    '& .MuiPaginationItem-root': {
      color: 'text.secondary',
      '&.Mui-selected': {
        color: 'white',
        fontWeight: 'bold',
      }
    }
  },
  titleText: {
    textAlign: 'center',
    width: '100%',
    mb: 3
  },
  sortControls: {
    mb: 3,
    display: 'flex',
    justifyContent: 'center'
  },
  toggleGroup: {
    borderRadius: 2,
    bgcolor: 'background.paper',
    boxShadow: 1
  }
};
