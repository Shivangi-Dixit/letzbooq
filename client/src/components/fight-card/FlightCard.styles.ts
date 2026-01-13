import { SxProps, Theme } from '@mui/material';

export const styles: Record<string, SxProps<Theme>> = {
  // Card
  card: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    borderRadius: 2,
    border: "1px solid",
    borderColor: "divider",
    transition: "all 0.2s ease-in-out",
    '&:hover': {
      transform: "translateY(-2px)",
      boxShadow: 4,
      borderColor: "primary.main",
    }
  },
  
  header: {
    p: { xs: 1.25, pb: 1 },
    display: "flex", 
    justifyContent: "space-between", 
    alignItems: "center", 
    bgcolor: "rgba(59, 130, 246, 0.03)"
  },
  airlineStack: {
    direction: "row", 
    spacing: 0.75, 
    alignItems: "center"
  },
  avatar: {
    bgcolor: "primary.main", 
    width: 20, 
    height: 20, 
    fontSize: "0.6rem", 
    fontWeight: 800
  },
  
  content: {
    p: 1.25, 
    flexGrow: 1
  },
  itinerary: {
    mt: (theme: Theme) => ({ xs: theme.spacing(1.5), default: 0 })
  },
  headerRow: {
    display: "flex", 
    alignItems: "center", 
    gap: 1, 
    mb: 1
  },
  chip: {
    height: 16, 
    fontSize: "0.55rem", 
    fontWeight: 800, 
    borderRadius: 1
  },
  durationText: {
    fontWeight: 700, 
    fontSize: "0.65rem"
  },
  
  segmentGrid: {
    spacing: 0.5, 
    alignItems: "center"
  },
  originGrid: {
    size: { xs: 4, sm: 4 }
  },
  centerGrid: {
    textAlign: "center"
  },
  destGrid: {
    textAlign: "right"
  },
  airportText: {
    fontWeight: 800, 
    fontSize: "0.8rem", 
    lineHeight: 1
  },
  timeText: {
    fontWeight: 800, 
    fontSize: "0.7rem", 
    display: "block"
  },
  flightIconRow: {
    display: "flex", 
    alignItems: "center", 
    mb: 0.25
  },
  flightLine: {
    flex: 1, 
    height: 1, 
    bgcolor: "divider"
  },
  flightIcon: {
    fontSize: 10, 
    color: "primary.main", 
    mx: 0.25, 
    transform: "rotate(90deg)"
  },
  flightNumber: {
    fontSize: "0.55rem", 
    fontWeight: 700, 
    opacity: 0.6, 
    display: "block", 
    whiteSpace: "nowrap"
  },
  
  layoverBox: {
    display: "flex", 
    alignItems: "center", 
    justifyContent: "center", 
    gap: 0.25, 
    my: 0.5, 
    py: 0.25, 
    bgcolor: "rgba(255, 152, 0, 0.05)", 
    borderRadius: 0.5
  },
  
  divider: {
    my: 1, 
    borderStyle: "dashed"
  },
  footer: {
    p: 0.75, 
    textAlign: 'center', 
    borderTop: "1px solid", 
    borderColor: "rgba(0,0,0,0.05)"
  },
  footerText: {
    display: 'flex', 
    alignItems: 'center', 
    justifyContent: 'center', 
    gap: 0.25, 
    fontSize: "0.55rem"
  },
  classText: {
    fontWeight: 700, 
    fontSize: "0.65rem"
  },
  headerRowRight:{
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      flex: 1,
      ml: 1
    }
};
