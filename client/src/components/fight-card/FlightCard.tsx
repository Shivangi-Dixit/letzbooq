import React from "react";
import {
  Card,
  Box,
  Avatar,
  Typography,
  Divider,
  CardContent,
  Chip,
  Grid,
  Stack
} from "@mui/material";
import { AccessTime, FlightTakeoff, Luggage, SwapHoriz } from "@mui/icons-material";
import { formatDuration } from "../../utils/formatDuration";
import { Flight } from "../../interfaces/flight.interfaces";
import { styles } from './FlightCard.styles';
import { formatTime } from "../../utils/formatTime";

interface FlightCardProps {
  flight: Flight;
}

const FlightCard: React.FC<FlightCardProps> = ({ flight }) => {
  const renderItinerary = (
    label: string,
    duration: string,
    segments: Flight["outbound"]["segments"]
  ) => (
    <Box sx={styles.itinerary}>
      <Box sx={styles.headerRow}>
        <Chip
          label={label}
          size="small"
          color="primary"
          sx={styles.chip}
        />
      <Box sx={styles.headerRowRight}>
      <Typography variant="caption" color="text.secondary" sx={styles.durationText}>
        {formatDuration(duration)}
      </Typography>
      <Typography variant="caption" color="text.secondary" sx={styles.classText}>
        {flight.outbound.segments[0].cabin} CLASS
      </Typography>
    </Box>
      </Box>

      {segments.map((seg, sIdx) => {
        const showLayover = sIdx < segments?.length - 1;
        return (
          <Box key={sIdx}>
            <Grid container sx={styles.segmentGrid}>
              <Grid size={4}>
                <Typography variant="subtitle2" sx={styles.airportText}>
                  {seg.from}
                </Typography>
                <Typography variant="caption" sx={{ ...styles.timeText, color: "primary.main" }}>
                  {formatTime(seg.departureTime)}
                </Typography>
              </Grid>

              <Grid size={4} sx={styles.centerGrid}>
                <Box sx={styles.flightIconRow}>
                  <Box sx={styles.flightLine} />
                  <FlightTakeoff sx={styles.flightIcon} />
                  <Box sx={styles.flightLine} />
                </Box>
                <Typography variant="caption" sx={styles.flightNumber}>
                  {seg.carrier}{seg.flightNumber}
                </Typography>
              </Grid>

              <Grid size={4} sx={styles.destGrid}>
                <Typography variant="subtitle2" sx={styles.airportText}>
                  {seg.to}
                </Typography>
                <Typography variant="caption" sx={{ ...styles.timeText, color: "success.main" }}>
                  {formatTime(seg.arrivalTime)}
                </Typography>
              </Grid>
            </Grid>

            {showLayover && (
              <Box sx={styles.layoverBox}>
                <SwapHoriz sx={{ fontSize: 10, color: "warning.main" }} />
                <Typography variant="caption" sx={{ fontSize: "0.55rem", color: "warning.main", fontWeight: 800 }}>
                  Layover {formatDuration("PT1H30M")}
                </Typography>
              </Box>
            )}
          </Box>
        );
      })}
    </Box>
  );

  return (
    <Card sx={styles.card}>
      <Box sx={styles.header}>
        <Stack sx={styles.airlineStack}>
          <Avatar sx={styles.avatar}>
            {flight.airline.substring(0, 2).toUpperCase()}
          </Avatar>
        </Stack>
        <Typography variant="subtitle2" color="primary" sx={{ fontWeight: 900, fontSize: "0.85rem" }}>
          {flight.price.currency} {flight.price.total}
        </Typography>
      </Box>

      <CardContent sx={styles.content}>
        {renderItinerary("Departure", flight.outbound.duration, flight.outbound.segments)}
        {flight.inbound && (
          <>
            <Divider sx={styles.divider} />
            {renderItinerary("Return", flight.inbound.duration, flight.inbound.segments)}
          </>
        )}
      </CardContent>

      <Box sx={styles.footer}>
        <Typography variant="caption" color="text.secondary" sx={styles.footerText}>
          <Luggage sx={{ fontSize: 8 }} /> 
          {flight.outbound.segments[0].checkedBags} Bag Included
        </Typography>
      </Box>
    </Card>
  );
};

export default FlightCard;
