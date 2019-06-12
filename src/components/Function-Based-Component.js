import React, { useState, useEffect } from 'react';
import { Container, Button, Row } from 'reactstrap';
import axios from 'axios';

const FunctionBasedComponent = () => {
  const [users, setUsers] = useState({data:[]});
  const [newDataIsNeeded, setNewDataIsNeeded] = useState(true);
  const [showDetails, setShowDetails] = useState(false);

  const fetchUsers = async () => {
    const response = await axios.get(`https://jsonplaceholder.typicode.com/users`);
    setNewDataIsNeeded(false);
    setUsers({data:response.data});
  };

  useEffect(() => {
    if (!newDataIsNeeded)
      return;
    fetchUsers();
    return () => { 

    }
  }, [newDataIsNeeded]);

  const handleClick = event => { setShowDetails(!showDetails) };
  const reloadData = event => {
    setNewDataIsNeeded(!newDataIsNeeded);
  };
  return (
    <Container>
      <button onClick={reloadData}>Reload Data</button>
      {
        users.data.map((user) => (
          <ul key={user.id}>
            <li>
              <strong>{user.name}</strong>
              <div>
                <Button
                  onClick={handleClick}
                >
                  {showDetails ? "Close Additional Info" : "More Info"}
                </Button>
                {showDetails &&
                  <Container className="additional-info">
                    <Row>
                      {`Email: ${user.email}`}
                    </Row>
                    <Row>
                      {`Phone: ${user.phone}`}
                    </Row>
                    <Row>
                      {`Website: ${user.website}`}
                    </Row>
                  </Container>
                }
              </div>
            </li>
          </ul>
        ))
      }
    </Container>
  )
}

export default FunctionBasedComponent;
