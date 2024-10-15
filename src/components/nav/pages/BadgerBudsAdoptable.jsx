import React, { useContext, useState, useEffect } from 'react';
import BadgerBudsDataContext from '../../../contexts/BadgerBudsDataContext';
import BadgerBudSummary from '../../BadgerBudSummary';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';

export default function BadgerBudsAdoptable(props) {
    
    const buddies = useContext(BadgerBudsDataContext);
    const [availableBuddies, setAvailableBuddies] = useState([]);

    useEffect(() => {
        const savedCatIds = JSON.parse(sessionStorage.getItem('savedCatIds')) || [];
        const adoptedCatIds = JSON.parse(sessionStorage.getItem('adoptedCatIds')) || [];
        const filteredBuddies = buddies.filter(buddy => 
            !savedCatIds.includes(buddy.id) && !adoptedCatIds.includes(buddy.id)
        );
        setAvailableBuddies(filteredBuddies);
    }, [buddies]);

    const handleSave = (buddyId) => {
        const updatedAvailableBuddies = availableBuddies.filter(buddy => buddy.id !== buddyId);
        setAvailableBuddies(updatedAvailableBuddies);
        const savedCatIds = JSON.parse(sessionStorage.getItem('savedCatIds')) || [];
        savedCatIds.push(buddyId);
        sessionStorage.setItem('savedCatIds', JSON.stringify(savedCatIds));
    };
    
    return (
        <Container>
            <h1>Available Badger Buds</h1>
            <p>The following cats are looking for a loving home! Could you help?</p>
            
            {availableBuddies.length === 0 ? (
                <p>No buds are available for adoption!</p>
            ) : (
                <Row>
                    {availableBuddies.map(buddy => (
                        <Col key={buddy.id} xs={12} sm={12} md={12} lg={6} xl={4}>
                            <Card>
                                <Card.Body>
                                    <BadgerBudSummary 
                                        buddy={buddy} 
                                        onSave={() => handleSave(buddy.id)} 
                                    />
                                </Card.Body>
                            </Card>
                        </Col>
                    ))}
                </Row>
            )}
        </Container>
    );
}