import { Box, useMediaQuery } from "@mui/material";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import UserWidget from "components/Widgets/UserWidget";
import { useGetSupplierDataQuery } from "state/api";

const Profile = () => {
    const [user, setUser] = useState(null);
    const { userId } = useParams();
    const isNonMobileScreens = useMediaQuery("(min-width:1000px)");

    let {data: supplierData, isLoading: isLoadingSupplierData} = useGetSupplierDataQuery({userId});

    return (
        <Box>
            <Box
                width="100%"
                padding="2rem"
                display={isNonMobileScreens ? "flex" : "block"}
                gap="2rem"
                justifyContent="center"
            >
                <UserWidget userId={userId} />
            </Box>
        </Box>
    )
}

export default Profile;