import React, { useState } from 'react';
import Card from 'react-bootstrap/Card';
import Carousel from 'react-bootstrap/Carousel';

export default function BadgerBudSummary({ buddy, onSave }) {
    const [showMore, setShowMore] = useState(false);
    const firstImageId = buddy.imgIds[0];
    const imgUrl = `https://raw.githubusercontent.com/CS571-F24/hw5-api-static-content/main/cats/${firstImageId}`;

    const toggleShowMore = () => {
        setShowMore(!showMore);
    };

    const handleSave = () => {
        let savedCatIds = JSON.parse(sessionStorage.getItem('savedCatIds')) || [];
        savedCatIds.push(buddy.id);
        sessionStorage.setItem('savedCatIds', JSON.stringify(savedCatIds));
        alert(`${buddy.name} has been added to your basket!`);
        onSave(buddy.id);
    };

    return (
        <div className="summary">
            {showMore ? (
                <Carousel>
                    {buddy.imgIds.map((imgId, index) => (
                        <Carousel.Item key={buddy.id}>
                            <img
                                src={`https://raw.githubusercontent.com/CS571-F24/hw5-api-static-content/main/cats/${imgId}`}
                                alt={`A picture of ${buddy.name}`}
                                className='d-block w-100'
                                style={{ width: '100%', height: '400px', objectFit: 'cover' }}
                            />
                        </Carousel.Item>
                    ))}
                </Carousel>
            ) : (
                <img
                    src={imgUrl}
                    alt={`A picture of ${buddy.name}`}
                    className='d-block w-100'
                    style={{ width: '100%', height: '400px', objectFit: 'cover' }}
                />
            )}
            <h2>{buddy.name}</h2>

            {showMore && (
                <div className="info">
                    <p>{buddy.gender}</p>
                    <p>{buddy.breed}</p>
                    <p>{buddy.age}</p>
                    <p>{buddy.description}</p>
                </div>
            )}
            <button type="button" className="btn btn-primary" onClick={toggleShowMore}>
                {showMore ? 'Show Less' : 'Show More'}
            </button>
            <button type="button" className="btn btn-secondary ms-2" onClick={handleSave}>
                <i className="bi bi-heart"></i> Save
            </button>
        </div>
    );
}
