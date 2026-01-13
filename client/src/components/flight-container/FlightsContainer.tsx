import React, { useEffect, useState } from 'react';
import FlightSearchPage from '../flight-search-form/FlightSearchPage';
import FlightList from '../flight-list/FlightList';
import Box from '@mui/material/Box';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import { styles } from './FlightsContainer.styles';
import { useFlights } from '../../hooks/useFlights';
import { ErrorModal } from '../common/error-modal/ErrorModal';

const FlightsContainer: React.FC = () => {
  const { flights, loading, error, fetchFlights, clearError } = useFlights();
  const [showEmptyState, setShowEmptyState] = useState(true);
  const handleSearch = (params: any) => {
    fetchFlights(params);
  };
  useEffect(() => {
    if (flights.length > 0) {
      setShowEmptyState(false);
    }
  }, [flights]);

  return (
    <Box sx={styles.container}>
      <FlightSearchPage onSearch={handleSearch} showEmptyState={showEmptyState}/>
      <Backdrop sx={styles.backdrop} open={loading}>
        <Box sx={styles.spinnerContainer}>
          <CircularProgress size={60} thickness={4} />
          <Box sx={styles.textContainer}>
            <Box sx={styles.titleText}>
              Loading flights...
            </Box>
            <Box sx={styles.subtitleText}>
              Finding best deals ✈️
            </Box>
          </Box>
        </Box>
      </Backdrop>
      
      {error && (
        <ErrorModal 
          error={error} 
          onClose={clearError}
        />
      )}
      
      {flights?.length > 0 && <FlightList flights={flights} />}
    </Box>
  );
};

export default FlightsContainer;
