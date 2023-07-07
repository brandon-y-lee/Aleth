import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Typography, useTheme } from "@mui/material";
import FlexBetween from "components/FlexBetween";

const UserWidget = ({ userId: id }) => {
    const [user, setUser] = useState(null);
    const theme = useTheme();
    const navigate = useNavigate();
    const token = useSelector((state) => state.token);

    const getUser = async () => {
        try {
            if (!id) {
                console.error('userId is undefined');
                return;
            }
    
            const response = await fetch(`http://localhost:5001/client/supplierData?userId=${id}`, {
                method: "GET",
                // headers: { Authorization: `Bearer ${token}` },
            });
    
            if (!response.ok) {
                console.error('Server response was not ok', response);
                return;
            }
    
            const data = await response.json();
    
            if (!data || !data.supplierData || data.supplierData.length === 0) {
                console.error('Invalid server response', data);
                return;
            }
    
            setUser(data.supplierData[0]);
        } catch (error) {
            console.error('Failed to fetch user', error);
        }
    };
    

    useEffect(() => {
        getUser();
    }, []);

    if (!user) {
        return null;
    }

    // const {
    //     name,
    //     description,
    //     city,
    //     country,
    //     userId,
    //     coordinates,
    //     type,
    //     material,
    // } = user;

    const {
        Company: name,
        UserType: type,
    } = user;

    return (
        <FlexBetween
            gap="0.5rem"
            pb="1rem"
            onClick={() => navigate(`/profile/${id}`)}
        >
            <Box>
                <Typography
                    variant="h4"
                    fontWeight="500"
                    >
                    {name} {type}
                </Typography>
            </Box>
        </FlexBetween>
    )
}

export default UserWidget;