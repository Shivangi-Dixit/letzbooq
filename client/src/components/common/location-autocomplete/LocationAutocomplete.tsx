import { useState, useEffect } from 'react';
import {
  TextField,
  Autocomplete,
  Box,
  Typography,
  CircularProgress,
} from '@mui/material';
import { LocationOn as LocationIcon, Flight as FlightIcon } from '@mui/icons-material';
import React from 'react';

import { styles } from './LocationAutocomplete.styles';
import { useLocationSearch } from '../../../hooks/useLocationSearch';
import { LocationOption } from '../../../interfaces/location.interface';
import { ErrorModal } from '../error-modal/ErrorModal';

interface Props {
  label: string;
  onSelect: (location: LocationOption) => void;
}

export const LocationAutocomplete = ({ label, onSelect }: Props) => {
  const [input, setInput] = useState('');
  const [open, setOpen] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState<LocationOption | null>(null);
  const { results, loading, error, clearError } = useLocationSearch(input);

  const options = React.useMemo(() => {
    const seen = new Set<string>();
    return (input?.length >= 3 ? results : []).filter((location) => {
      if (seen.has(location.iataCode)) return false;
      seen.add(location.iataCode);
      return true;
    });
  }, [results, input]);

  const handleSelection = (value: LocationOption | null) => {
    if (value) {
      setSelectedLocation(value);
      onSelect(value);
      setInput(`${value.city} (${value.iataCode})`);
      setOpen(false);
    }
  };

  useEffect(() => {
    if (input?.length === 0) {
      setSelectedLocation(null);
    }
  }, [input]);

  const endAdornment = (
    <>
      {loading && input.length >= 3 ? (
        <CircularProgress color="inherit" size={16} sx={styles.spinner} />
      ) : (
        <FlightIcon sx={styles.flightIcon} />
      )}
    </>
  );

  return (
    <>
    <Autocomplete
      open={open && input?.length >= 3}
      onOpen={() => input?.length >= 3 && setOpen(true)}
      onClose={() => setOpen(false)}
      options={options}
      loading={loading && input?.length >= 3}
      inputValue={input}
      value={selectedLocation}
      onInputChange={(_, newInputValue) => {
        setInput(newInputValue);
        if (newInputValue?.length < 3) {
          setSelectedLocation(null);
        }
        setOpen(newInputValue?.length >= 3);
      }}
      onChange={(_, value) => handleSelection(value)}
      getOptionLabel={(option) => `${option.city} (${option.iataCode})`}
      isOptionEqualToValue={(option, value) => option.iataCode === value?.iataCode}
      
      ListboxProps={{ sx: styles.listbox }}
      
      renderInput={(params) => (
        <TextField
          {...params}
          variant="standard"
          label={label}
          placeholder="Search city or airport"
          InputProps={{
            ...params.InputProps,
            disableUnderline: true,
            endAdornment: (
              <>
                {endAdornment}
                {params.InputProps.endAdornment}
              </>
            ),
            sx: styles.inputProps,
          }}
        />
      )}
      
      renderOption={(props, option) => (
        <Box component="li" {...props} key={option.iataCode} sx={styles.option}>
          <LocationIcon sx={styles.locationIcon} />
          <Box sx={styles.optionContent}>
            <Box sx={styles.optionCity}>
              <Typography variant="body2" sx={{ fontWeight: 600 }}>
                {option.city}
              </Typography>
              <Typography variant="caption" sx={{ fontWeight: 700, opacity: 0.7 }}>
                {option.iataCode}
              </Typography>
            </Box>
            <Typography variant="caption" color="text.secondary">
              {option.country}
            </Typography>
          </Box>
        </Box>
      )}
    />
          {error && (
            <ErrorModal 
              error={error} 
              onClose={clearError}
            />
          )}
          </>
  );
};
