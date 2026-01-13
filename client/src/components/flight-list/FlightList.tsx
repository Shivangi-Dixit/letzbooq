import React, { useState } from 'react';
import { 
  Grid, 
  Box, 
  Typography, 
  Pagination, 
  Stack,
  ToggleButtonGroup,
  ToggleButton
} from '@mui/material';
import FlightCard from '../fight-card/FlightCard';
import { Flight } from '../../interfaces/flight.interfaces';
import { styles } from './FlightList.styles';

interface Props {
  flights: Flight[];
}

const ITEMS_PER_PAGE = 8;

const durationToMinutes = (isoDuration: string): number => {
  const hours = parseInt(isoDuration.match(/PT(\d+)H/)?.[1] || '0');
  const minutes = parseInt(isoDuration.match(/(\d+)M$/)?.[1] || '0');
  return hours * 60 + minutes;
};

const FlightList: React.FC<Props> = ({ flights }) => {
  const [page, setPage] = useState(1);
  const [sortBy, setSortBy] = useState<'RECOMMENDED' | 'PRICE_LOW' | 'DURATION_SHORT'>('RECOMMENDED');

  const filteredFlights = React.useMemo(() => {
    let result = [...flights];
    
    switch (sortBy) {
      case 'PRICE_LOW':
        result.sort((a, b) => parseFloat(a.price.total) - parseFloat(b.price.total));
        break;
      case 'DURATION_SHORT':
        result.sort((a, b) => durationToMinutes(a.outbound.duration) - durationToMinutes(b.outbound.duration));
        break;
      default:
        result.sort((a, b) => {
          const priceDiff = parseFloat(a.price.total) - parseFloat(b.price.total);
          return priceDiff !== 0 ? priceDiff : 
                 durationToMinutes(a.outbound.duration) - durationToMinutes(b.outbound.duration);
        });
    }
    return result;
  }, [flights, sortBy]);

  const pageCount = Math.ceil(filteredFlights.length / ITEMS_PER_PAGE);
  const startIndex = (page - 1) * ITEMS_PER_PAGE;
  const paginatedFlights = filteredFlights.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  const handlePageChange = (_: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSortChange = (_: React.MouseEvent<HTMLElement, MouseEvent>, newSort: 'RECOMMENDED' | 'PRICE_LOW' | 'DURATION_SHORT' | null) => {
    if (newSort) {
      setSortBy(newSort);
      setPage(1); 
    }
  };

  if (filteredFlights.length === 0) {
    return (
      <Box sx={styles.noFlights}>
        <Typography variant="h6" color="text.secondary">
          No flights found.
        </Typography>
      </Box>
    );
  }

  return (
    <Box sx={styles.container}>
      <Typography 
        variant="h5" 
        color="text.primary" 
        sx={styles.titleText}
      >
        Flight options ({filteredFlights.length})
      </Typography>

      <Box sx={styles.sortControls}>
        <ToggleButtonGroup
          value={sortBy}
          exclusive
          onChange={handleSortChange}
          size="small"
          color="primary"
          sx={styles.toggleGroup}
        >
          <ToggleButton value="RECOMMENDED">Recommended</ToggleButton>
          <ToggleButton value="PRICE_LOW">💰 Cheapest first</ToggleButton>
          <ToggleButton value="DURATION_SHORT">⚡ Fastest first</ToggleButton>
        </ToggleButtonGroup>
      </Box>

      <Grid container spacing={3}>
        {paginatedFlights.map((flight, index) => (
          <Grid key={`${flight.id}-${startIndex + index}`} size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
            <FlightCard flight={flight} />
          </Grid>
        ))}
      </Grid>
      
      {pageCount > 1 && (
        <Stack spacing={2} sx={styles.paginationContainer}>
          <Pagination 
            count={pageCount} 
            page={page} 
            onChange={handlePageChange}
            color="primary"
            size="large"
            sx={styles.pagination}
          />
        </Stack>
      )}
    </Box>
  );
};

export default FlightList;
