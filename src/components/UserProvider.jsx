import React, { createContext, useContext, useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import axios from 'axios' // Makes HTTP requests

const UserContext = createContext(); // Creates context

export const UserProvider = ({ children }) => {
  const [searchTerm, setSearchTerm] = useState('') // Search request that is typed in the search bar
  const apiKey = import.meta.env.VITE_API_KEY // Authorization key
  const baseUrl = import.meta.env.VITE_BASE_URL // URL for HTTP requests
  const [data, setData] = useState(null) // Stores fetched data
  const [loading, setLoading] = useState(false) // Loading state
  const [error, setError] = useState(null) // Stores errors
  const [searchTrigger, setSearchTrigger] = useState(false) // State to trigger search
  const [showResults, setShowResults] = useState(false)

  const clearError = () => {
    setError(null);
};

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        const response = await axios.get(`${baseUrl}/${searchTerm}`, {
          headers: {
            Authorization: `Bearer ${apiKey}`
          }
        });
        const responseData = await response.data; // Extracts data from the response
        console.log(responseData) // Logs the data to the console
        setData(responseData) // Set the fetched data into the state
        setShowResults(true); // Set showResults to true when data is fetched
        setError(null); // Clear any previous errors
      } catch (error) {
        setError('No results') // If an error occurs during the fetch, set an error message
        setShowResults(false); // Set showResults to false when an error occurs
      } finally {
        setLoading(false); // Regardless of success or failure, set loading to false
      }
    };

    if (searchTrigger) {
      // Fetch data only when searchTrigger is true
      fetchData()
      setSearchTrigger(false) // Reset searchTrigger after fetching data
    }
  }, [apiKey, baseUrl, searchTerm, searchTrigger]) // Add searchTrigger as a dependency

  const handleSearch = () => {
    setSearchTrigger(true) // Set searchTrigger to true when the button is clicked
  }

  return (
    <UserContext.Provider value={{ data, loading, error, searchTerm, setSearchTerm, handleSearch, showResults, setShowResults, clearError }}>
      {children}
    </UserContext.Provider>
  );
};

// Children prop passed to UserProvider must be a React node and is required
UserProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export const useUser = () => useContext(UserContext);
