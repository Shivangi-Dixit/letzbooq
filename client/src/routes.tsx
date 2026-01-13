// src/routes.tsx
import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import FlightsContainer from './components/flight-container/FlightsContainer';

export const AppRoutes: React.FC = () => (
  <Routes>
    <Route path="*" element={<FlightsContainer />} />
  </Routes>
);
