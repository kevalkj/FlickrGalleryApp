import React, { useState, useEffect } from 'react';
import { useFetchFeedback } from '../API/feedbackApi';

const FeedbackComponent = ({ driverId }) => {
    const fetchFeedback = useFetchFeedback();
    const [feedback, setFeedback] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const loadFeedback = async () => {
            try {
                const data = await fetchFeedback(driverId);
                setFeedback(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        loadFeedback();
    }, [driverId]);

    if (loading) return <p>Loading feedback...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <div>
            <h3>Feedback for Driver</h3>
            {feedback.map((review) => (
                <p key={review._id}>{review.comment}</p>
            ))}
        </div>
    );
};

export default FeedbackComponent;