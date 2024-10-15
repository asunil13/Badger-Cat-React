import React, { useContext, useState, useEffect } from 'react';
import BadgerBudsDataContext from '../../../contexts/BadgerBudsDataContext';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';

export default function BadgerBudsBasket(props) {
    const buddies = useContext(BadgerBudsDataContext);
    const [savedBuddies, setSavedBuddies] = useState([]);

    useEffect(() => {
        const savedCatIds = JSON.parse(sessionStorage.getItem('savedCatIds')) || [];
        const filteredBuddies = buddies.filter(buddy => savedCatIds.includes(buddy.id));
        setSavedBuddies(filteredBuddies);
    }, [buddies]);

    const unselectBuddy = (id) => {
        const savedCatIds = JSON.parse(sessionStorage.getItem('savedCatIds')) || [];
        const updatedSavedCatIds = savedCatIds.filter(catId => catId !== id);
        sessionStorage.setItem('savedCatIds', JSON.stringify(updatedSavedCatIds));

        const remove = savedBuddies.find(buddy => buddy.id === id);
        if (remove) {
            alert(`${remove.name} has been removed from your basket!`);
        }

        setSavedBuddies(prev => prev.filter(buddy => buddy.id !== id));
    };

    const adoptBuddy = (id) => {
        const adoptedCatIds = JSON.parse(sessionStorage.getItem('adoptedCatIds')) || [];
        adoptedCatIds.push(id);
        sessionStorage.setItem('adoptedCatIds', JSON.stringify(adoptedCatIds));
    
        const savedCatIds = JSON.parse(sessionStorage.getItem('savedCatIds')) || [];
        const updatedSavedCatIds = savedCatIds.filter(catId => catId !== id);
        sessionStorage.setItem('savedCatIds', JSON.stringify(updatedSavedCatIds));
    
        const adopt = savedBuddies.find(buddy => buddy.id === id);
        if (adopt) {
            alert(`Thank you for adopting ${adopt.name}!`);
        }
    
        setSavedBuddies(prev => prev.filter(buddy => buddy.id !== id));
    };
    

    return (
        <Container>
            <h1>Badger Buds Basket</h1>
            <p>These cute cats could be all yours!</p>

            <Row>
                {savedBuddies.length > 0 ? (
                    savedBuddies.map(buddy => (
                        <Col 
                            key={buddy.id} 
                            xs={12}
                            sm={6}  
                            md={4} 
                            lg={3}
                        >
                            <Card>
                                <Card.Img 
                                    variant="top" 
                                    src={`https://raw.githubusercontent.com/CS571-F24/hw5-api-static-content/main/cats/${buddy.imgIds[0]}`} 
                                    alt={`A picture of ${buddy.name}`} 
                                />
                                <Card.Body>
                                    <Card.Title>{buddy.name}</Card.Title>
                                    <button type="button" className="btn btn-secondary" onClick={() => unselectBuddy(buddy.id)}>Unselect</button>
                                    <button type="button" className="btn btn-success ms-2" onClick={() => adoptBuddy(buddy.id)}>Adopt</button>
                                </Card.Body>
                            </Card>
                        </Col>
                    ))
                ) : (
                    <Col xs={12}>
                        <p>You have no buds in your basket!</p>
                    </Col>
                )}
            </Row>
        </Container>
    );
}