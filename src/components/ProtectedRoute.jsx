// src/components/ProtectedRoute.jsx
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

/**
 * <ProtectedRoute allowedRoles={['patient']} element={<SomePage />} />
 * Solo permite acceder si user.role está en allowedRoles.
 */
export default function ProtectedRoute({ allowedRoles, element }) {
  const { user } = useAuth();

  if (!user) {
    // No autenticado
    return <Navigate to="/login" replace />;
  }

  if (!allowedRoles.includes(user.role)) {
    // Role no permitido
    return <Navigate to="/" replace />;
  }

  // Usuario autenticado y rol permitido
  return element;
}
