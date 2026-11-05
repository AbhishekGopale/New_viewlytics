// ErrorBoundary.js

import React, { useState, useEffect } from "react";
import { View, Text } from "react-native";
import ServerScreen from "./ServerScreen";

const ErrorBoundary = ({ children }) => {
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    const handleErrors = (error, errorInfo) => {
      setHasError(true);
      // Log the error to an error reporting service
      console.error(error, errorInfo);
    };

    // Attach the error handler
    const errorHandler = global.ErrorUtils.getGlobalHandler();
    global.ErrorUtils.setGlobalHandler((error, errorInfo) => {
      handleErrors(error, errorInfo);
      if (errorHandler) {
        errorHandler(error, errorInfo);
      }
    });

    return () => {
      // Detach the error handler when the component unmounts
      global.ErrorUtils.setGlobalHandler(errorHandler);
    };
  }, []);

  if (hasError) {
    // You can customize the error message and styling here
    return (
      <View>
        <ServerScreen />
      </View>
    );
  }

  return children;
};

export default ErrorBoundary;
