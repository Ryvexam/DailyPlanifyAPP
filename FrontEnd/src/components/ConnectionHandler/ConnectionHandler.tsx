// src/components/ConnectionHandler.tsx
import React, { useEffect, useState, ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import { handleCheckConnection } from '../utils.ts';
import Loader from '../../common/Loader/Loader.tsx';

interface ConnectionHandlerProps {
  children: ReactNode;
}

const ConnectionHandler: React.FC<ConnectionHandlerProps> = ({ children }) => {
  const [connectionStatus, setConnectionStatus] = useState<'checking' | 'ok' | 'failed'>('checking');

  useEffect(() => {
    const checkConnection = async () => {
      const isConnected = await handleCheckConnection();
      setConnectionStatus(isConnected ? 'ok' : 'failed');
    };

    checkConnection();
  }, []);

  if (connectionStatus === 'checking') {
    return (
        <Loader/>
    );
  } else if (connectionStatus === 'failed') {
    return <Navigate to="/auth/signin" replace />;
  }

  return <>{children}</>;
};

export default ConnectionHandler;
