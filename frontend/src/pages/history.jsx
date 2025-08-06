import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import Card from '@mui/material/Card';
import Box from '@mui/material/Box';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import HomeIcon from '@mui/icons-material/Home';
import { IconButton } from '@mui/material';

export default function History() {
    const { getHistoryOfUser } = useContext(AuthContext);
    const [meetings, setMeetings] = useState([]);
    const [error, setError] = useState('');
    const routeTo = useNavigate();

    useEffect(() => {
        const fetchHistory = async () => {
            // --- FIX: Clear previous errors and data before fetching ---
            setError('');
            setMeetings([]);
            // ---------------------------------------------------------
            try {
                const history = await getHistoryOfUser();
                setMeetings(history);
            } catch (err) {
                // Set an error message if the fetch fails (e.g., 401 Unauthorized)
                setError('Could not fetch history. Please make sure you are logged in.');
                console.error(err);
            }
        };
        fetchHistory();
    }, [getHistoryOfUser]); // Added dependency to the useEffect hook

    const formatDate = (dateString) => {
        if (!dateString) return 'N/A';
        const date = new Date(dateString);
        const day = date.getDate().toString().padStart(2, "0");
        const month = (date.getMonth() + 1).toString().padStart(2, "0");
        const year = date.getFullYear();
        return `${day}/${month}/${year}`;
    };

    return (
        <div style={{ padding: '2rem' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', marginBottom: '2rem' }}>
                <IconButton onClick={() => routeTo("/home")}>
                    <HomeIcon />
                </IconButton>
                <Typography variant="h4">Meeting History</Typography>
            </Box>

            {error && <Typography color="error">{error}</Typography>}

            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: '1rem' }}>
                {meetings.length > 0 ? meetings.map((meeting) => (
                    // --- FIX: Added a unique and stable key from the database (_id) ---
                    // The key is on the outermost element inside the map.
                    <Card key={meeting._id} sx={{ minWidth: 275 }} variant="outlined">
                        <CardContent>
                            <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                                Code: {meeting.meetingCode}
                            </Typography>
                            <Typography sx={{ mb: 1.5 }} color="text.secondary">
                                {/* --- FIX: Using the correct 'createdAt' field from the schema --- */}
                                Date: {formatDate(meeting.createdAt)}
                            </Typography>
                        </CardContent>
                        <CardActions>
                            <Button size="small" onClick={() => routeTo(`/${meeting.meetingCode}`)}>Join Again</Button>
                        </CardActions>
                    </Card>
                )) : (
                    !error && <Typography>No meeting history found.</Typography>
                )}
            </Box>
        </div>
    );
}
