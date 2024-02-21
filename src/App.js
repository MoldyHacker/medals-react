import React, { useState, useEffect } from 'react';
import axios from 'axios'; // Import Axios
import Country from './components/Country';
import NewCountry from './components/NewCountry';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Badge from 'react-bootstrap/Badge';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import './App.css';

const App = () => {
  const apiEndpoint = "https://medals-api-6.azurewebsites.net/";
  const [countries, setCountries] = useState([
    // Initial state can be empty or fetched from the API
  ]);
  const [medals, setMedals] = useState([
    { id: 1, name: 'gold' },
    { id: 2, name: 'silver' },
    { id: 3, name: 'bronze' },
  ]);

  // Function to fetch countries from the API
  const fetchCountries = async () => {
    try {
      const response = await axios.get(`${apiEndpoint}/countries`);
      setCountries(response.data);
    } catch (error) {
      console.error("Error fetching countries:", error);
    }
  };

  const handleAdd = async (name) => {
    try {
      await axios.post(`${apiEndpoint}/countries`, { name, gold: 0, silver: 0, bronze: 0 });
      fetchCountries(); // Refresh the list of countries after adding
    } catch (error) {
      console.error("Error adding country:", error);
    }
  };

  const handleDelete = async (countryId) => {
    try {
      await axios.delete(`${apiEndpoint}/countries/${countryId}`);
      fetchCountries(); // Refresh the list of countries after deletion
    } catch (error) {
      console.error("Error deleting country:", error);
    }
  };

  const getAllMedalsTotal = () => {
    let sum = 0;
    medals.forEach(medal => {
      sum += countries.reduce((a, b) => a + b[medal.name], 0);
    });
    return sum;
  };

  // Fetch countries when the component mounts
  useEffect(() => {
    fetchCountries();
  }, []); // The empty array ensures this effect runs only once after the initial render

  return (
    <React.Fragment>
      <Navbar className="navbar-dark bg-dark">
          <Container fluid>
            <Navbar.Brand>
              Olympic Medals
              <Badge className="ms-2" bg="light" text="dark" pill>{ getAllMedalsTotal() }</Badge>
            </Navbar.Brand>
            <NewCountry onAdd={ handleAdd } />
          </Container>
      </Navbar>
      <Container fluid>
      <Row>
      { countries.map(country => 
        <Col xs="12" md="6" lg="4" xl="2" className="mt-3" key={ country.id }>
          <Country  
            country={ country } 
            medals={ medals }
            onDelete={ handleDelete }
            onIncrement={ handleIncrement } 
            onDecrement={ handleDecrement } />
        </Col>
      )}
      </Row>
    </Container>
  </React.Fragment>
  );
};

export default App;