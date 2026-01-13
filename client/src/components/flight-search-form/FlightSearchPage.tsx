import React, { useState } from 'react';
import {
  Box,
  Container,
  Typography,
  Paper,
  RadioGroup,
  FormControlLabel,
  Radio,
  Button,
  Stack,
  IconButton,
  Popover,
  Divider,
  Switch,
  FormControl,
  Select,
  MenuItem,
} from '@mui/material';
import {
  SyncAlt as SyncAltIcon,
  Search as SearchIcon,
  People as PeopleIcon,
  Add as AddIcon,
  Remove as RemoveIcon,
  FlightTakeoff as FlightTakeoffIcon
} from '@mui/icons-material';
import { LocationAutocomplete } from '../common/location-autocomplete/LocationAutocomplete';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocationOption } from '../../interfaces/location.interface';
import { styles } from './FlightSearchPage.styles';
import { motion, AnimatePresence } from 'framer-motion';
import { formatDateForAPI } from '../../utils/dateHelpers';
import EmptyState from '../empty-state/EmptyState';
interface Props {
  onSearch: (params: any) => void;
    showEmptyState?: boolean;
}

const FlightSearchPage: React.FC<Props> = ({ onSearch, showEmptyState }) => {
  const [origin, setOrigin] = useState<LocationOption | null>(null);
  const [destination, setDestination] = useState<LocationOption | null>(null);
  const [departureDate, setDepartureDate] = useState<Date | null>(null);
  const [returnDate, setReturnDate] = useState<Date | null>(null);
  const [tripType, setTripType] = useState<'ONE_WAY' | 'ROUND_TRIP'>('ONE_WAY');
  const [nonStopOnly, setNonStopOnly] = useState(false);
  const [adults, setAdults] = useState(1);
  const [children, setChildren] = useState(0);
  const [infants, setInfants] = useState(0);
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const [travelClass, setTravelClass] = useState<'ECONOMY' | 'PREMIUM_ECONOMY' | 'BUSINESS' | 'FIRST'>('ECONOMY');

  const handlePassengerClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handlePassengerClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const params = {
      origin: origin?.iataCode,
      destination: destination?.iataCode,
      departureDate: formatDateForAPI(departureDate),
      returnDate: tripType === 'ROUND_TRIP' ? formatDateForAPI(returnDate) : undefined,
      adults: adults,
      children: children,
      infants: infants,
      nonStop: nonStopOnly,
      travelClass: travelClass,
    };
    onSearch(params);
  };

  const PassengerControl = ({ label, value, setter, min = 0, max = 10 }: any) => (
    <Box sx={styles.passengerControl}>
      <Typography variant="body2" sx={styles.passengerLabel}>{label}</Typography>
      <Stack direction="row" spacing={1} alignItems="center">
        <IconButton 
          size="small" 
          onClick={() => setter(Math.max(min, value - 1))} 
          sx={{ border: '1px solid', borderColor: 'divider' }}
        >
          <RemoveIcon fontSize="inherit" />
        </IconButton>
        <Typography sx={{ minWidth: 20, textAlign: 'center', fontWeight: 700 }}>
          {value}
        </Typography>
        <IconButton 
          size="small" 
          onClick={() => setter(Math.min(max, value + 1))} 
          sx={{ border: '1px solid', borderColor: 'divider' }}
        >
          <AddIcon fontSize="inherit" />
        </IconButton>
      </Stack>
    </Box>
  );

  const isSearchDisabled = !origin || !destination || !departureDate || (tripType === 'ROUND_TRIP' && !returnDate);

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Box component="form" onSubmit={handleSubmit} sx={styles.formContainer}>
        <Container maxWidth="lg">
          {/* Hero text */}
          <Box sx={styles.heroSection}>
            <Typography variant="h4" sx={styles.heroTitle}>
              Explore the{' '}
              <Box component="span" sx={styles.gradientText}>
                World
              </Box>
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Find the best flights for your next adventure.
            </Typography>
          </Box>

          <Paper elevation={0} sx={styles.paper}>
            <Box sx={styles.topRow}>
              <RadioGroup
                row
                value={tripType}
                onChange={(e) => setTripType(e.target.value as any)}
              >
                <FormControlLabel 
                  value="ONE_WAY" 
                  control={<Radio size="small" />} 
                  label={<Typography variant="caption" sx={{ fontWeight: 700 }}>One Way</Typography>} 
                />
                <FormControlLabel 
                  value="ROUND_TRIP" 
                  control={<Radio size="small" />} 
                  label={<Typography variant="caption" sx={{ fontWeight: 700 }}>Round Trip</Typography>} 
                />
              </RadioGroup>

          <Box >
    <Typography variant="caption" sx={{ fontWeight: 600, color: 'text.primary' }}>
      Non-stop
    </Typography>
    <Switch
      checked={nonStopOnly}
      onChange={(e) => setNonStopOnly(e.target.checked)}
      size="small"
      sx={styles.nonStopToggle}
    />
  </Box>

   <Box>
      <FormControl size="small" sx={{ minWidth: 300 }}>
        <Select value={travelClass} onChange={(e) => setTravelClass(e.target.value as typeof travelClass)}
          sx={{ 
            '& .MuiSelect-select': { 
              py: 0.75, 
              fontSize: '0.75rem' 
            } 
          }}
        >
          <MenuItem value="ECONOMY" sx={{ fontSize: '0.75rem' }}>Economy</MenuItem>
          <MenuItem value="PREMIUM_ECONOMY" sx={{ fontSize: '0.75rem' }}>Premium Economy</MenuItem>
          <MenuItem value="BUSINESS" sx={{ fontSize: '0.75rem' }}>Business</MenuItem>
          <MenuItem value="FIRST" sx={{ fontSize: '0.75rem' }}>First</MenuItem>
        </Select>
      </FormControl>
    </Box>

              <Button
                size="small"
                variant="outlined"
                startIcon={<PeopleIcon sx={{ fontSize: 16 }} />}
                onClick={handlePassengerClick}
                sx={styles.passengerButton}
              >
                {adults} Adult{adults > 1 ? 's' : ''}, {children} Child{children !== 1 ? 'ren' : ''}, {infants} Infant{infants !== 1 ? 's' : ''}
              </Button>
              <Popover
                open={open}
                anchorEl={anchorEl}
                onClose={handlePassengerClose}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                transformOrigin={{ vertical: 'top', horizontal: 'right' }}
                sx={{ mt: 1 }}
              >
                <Box sx={styles.popoverContent}>
                  <PassengerControl label="Adults" value={adults} setter={setAdults} min={1} max={10} />
                  <Divider sx={{ my: 1 }} />
                  <PassengerControl label="Children" value={children} setter={setChildren} min={0} max={10} />
                  <Divider sx={{ my: 1 }} />
                  <PassengerControl label="Infants" value={infants} setter={setInfants} min={0} max={10} />
                </Box>
              </Popover>
            </Box>

            <Stack direction={{ xs: 'column', lg: 'row' }} spacing={1} sx={styles.mainStack}>
              <Box sx={styles.locationsContainer}>
                <Box sx={styles.locationInput}>
                  <Typography variant="caption" color="text.secondary" sx={styles.locationLabel}>
                    FROM
                  </Typography>
                  <LocationAutocomplete label="" onSelect={setOrigin} />
                </Box>
                {/* <Box sx={styles.swapIconContainer}>
                  <SyncAltIcon sx={{ color: 'primary.main', fontSize: 16, opacity: 0.8 }} />
                </Box> */}
                <Box sx={styles.locationInput}>
                  <Typography variant="caption" color="text.secondary" sx={styles.locationLabel}>
                    TO
                  </Typography>
                  <LocationAutocomplete label="" onSelect={setDestination} />
                </Box>
              </Box>

              <Stack direction="row" spacing={1} sx={styles.datesContainer}>
                <DatePicker
                  label="Departure"
                  value={departureDate}
                  onChange={(newValue) => setDepartureDate(newValue)}
                  minDate={new Date()}
                  slotProps={{ 
                    textField: { 
                      fullWidth: true, 
                      size: 'small', 
                      sx: styles.datePickerField 
                    } 
                  }}
                />
                {tripType === 'ROUND_TRIP' && (
                <DatePicker
                  label="Return"
                  value={returnDate}
                  onChange={(newValue) => setReturnDate(newValue)}
                   minDate={departureDate || new Date()}
                  slotProps={{ 
                    textField: { 
                      fullWidth: true, 
                      size: 'small', 
                      sx: styles.datePickerField 
                    } 
                  }}
                />
              )}
              </Stack>

              <Button
                variant="contained"
                type="submit"
                startIcon={<SearchIcon />}
                disabled={isSearchDisabled}
                sx={styles.searchButton}
              >
                Search
              </Button>
            </Stack>
          </Paper>
        </Container>
      </Box>
            <AnimatePresence>
        {showEmptyState && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <EmptyState />
          </motion.div>
        )}
      </AnimatePresence>

    </LocalizationProvider>
  );
};



export default FlightSearchPage;
