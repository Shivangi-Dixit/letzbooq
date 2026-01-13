import React, { createContext, useContext, useState, ReactNode } from 'react';
import { ErrorModal } from '../components/common/error-modal/ErrorModal';

let currentError: string | null = null;
let errorListeners: Array<(error: string | null) => void> = [];

export const showError = (message: string): void => {
  currentError = message;
  errorListeners.forEach(listener => listener(currentError!));
};

export const clearError = (): void => {
  currentError = null;
  errorListeners.forEach(listener => listener(null));
};

export const subscribeToErrors = (listener: (error: string | null) => void) => {
  errorListeners.push(listener);
  return () => {
    errorListeners = errorListeners.filter(l => l !== listener);
  };
};

interface ErrorContextType {
  error: string | null;
  showError: (message: string) => void;
  clearError: () => void;
}

const ErrorContext = createContext<ErrorContextType | undefined>(undefined);

export const useError = (): ErrorContextType => {
  const context = useContext(ErrorContext);
  if (!context) {
    throw new Error('useError must be used within ErrorProvider');
  }
  return context;
};

interface ErrorProviderProps {
  children: ReactNode;
}

export const ErrorProvider: React.FC<ErrorProviderProps> = ({ children }) => {
  const [error, setError] = useState<string | null>(null);

  React.useEffect(() => {
    return subscribeToErrors(setError);
  }, []);

  const handleShowError = (message: string) => {
    setError(message);
  };

  const handleClearError = () => {
    setError(null);
  };

  return (
    <ErrorContext.Provider value={{ error, showError: handleShowError, clearError: handleClearError }}>
      {children}
      {error && (
        <ErrorModal 
          error={error} 
          onClose={handleClearError}
        />
      )}
    </ErrorContext.Provider>
  );
};
