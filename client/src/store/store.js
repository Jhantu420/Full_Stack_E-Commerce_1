import { configureStore } from '@reduxjs/toolkit';
import userReducer from './userSlice'; // Import the user slice reducer

// Configure the store with all reducers
const store = configureStore({
  reducer: {
    user: userReducer, // Register the user slice reducer
  },
});

// Export the store for use in the application
export default store;
