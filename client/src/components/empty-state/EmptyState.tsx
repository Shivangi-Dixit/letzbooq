// src/components/flight-search-form/EmptyState.tsx
import React from 'react';
import { Box, Typography } from '@mui/material';
import { FlightTakeoff as FlightTakeoffIcon } from '@mui/icons-material';
import { motion } from 'framer-motion';
import { styles } from './EmptyState.styles';

const EmptyState: React.FC = () => {
  return (
    <Box sx={styles.container}>
      {/* Animated Plane */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ 
          duration: 0.8,
          repeat: Infinity,
          repeatType: "reverse",
          ease: "easeInOut"
        }}
      >
        <Box sx={styles.planeContainer}>
          <motion.div
            animate={{ 
              scale: [1, 1.1, 1],
              rotate: [0, 5, -5, 0]
            }}
            transition={{ 
              duration: 4,
              repeat: Infinity,
              ease: "linear"
            }}
          >
            <FlightTakeoffIcon sx={styles.planeIcon} />
          </motion.div>
          
          {/* Animated Rings */}
          {[1, 2, 3].map((i) => (
            <Box
              key={i}
              component={motion.div}
              animate={{
                scale: [1, 1.5],
                opacity: [0.3, 0]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                delay: i * 0.6,
                ease: "easeOut"
              }}
              sx={styles.ring}
            />
          ))}
        </Box>
      </motion.div>

      {/* Text */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
      >
        <Typography variant="h5" sx={styles.title}>
          Where would you like to go?
        </Typography>
        <Typography variant="body1" sx={styles.subtitle}>
          Enter your destination above and we'll find the best flight options for your next journey.
        </Typography>
      </motion.div>
    </Box>
  );
};

export default EmptyState;
