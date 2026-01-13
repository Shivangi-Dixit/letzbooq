import React from 'react';
import {
  Box,
  Modal,
  Typography,
  Button,
  Fade,
  Backdrop
} from '@mui/material';
import { Close as CloseIcon, Error as ErrorIcon } from '@mui/icons-material';
import { styles } from './ErrorModal.styles';

interface ErrorModalProps {
  error: string;
  onClose: () => void;
}

export const ErrorModal: React.FC<ErrorModalProps> = ({ 
  error, 
  onClose 
}) => {
  return (
    <Modal
      open={true}
      onClose={onClose}
      closeAfterTransition
      slots={{ backdrop: Backdrop }}
      slotProps={{ 
        backdrop: { 
          timeout: 300,
          sx: styles.modalBackdrop
        } 
      }}
    >
      <Fade in={true}>
        <Box sx={styles.modalBox}>
          <Box sx={styles.header}>
            <ErrorIcon color="error" sx={styles.errorIcon} />
            <Box sx={styles.titleContainer}>
                <Typography variant="h6" sx={styles.title}>
                Flight Search Failed
                </Typography>
              <Typography variant="caption" sx={styles.subtitle}>
                Please try different dates or routes
              </Typography>
            </Box>
          </Box>
          
          <Typography sx={styles.errorMessage}>
            {error}
          </Typography>
          
          <Button
            fullWidth
            variant="contained"
            onClick={onClose}
            startIcon={<CloseIcon />}
            sx={styles.dismissButton}
          >
            Dismiss & Try Again
          </Button>
        </Box>
      </Fade>
    </Modal>
  );
};
