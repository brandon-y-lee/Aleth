import { Box, useMediaQuery } from "@mui/material";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import UserWidget from "components/Widgets/UserWidget";
import { useGetSupplierDataQuery } from "state/api";

const Profile = () => {
    const [user, setUser] = useState(null);
    const { userId } = useParams();
    console.log(userId);
    const isNonMobileScreens = useMediaQuery("(min-width:1000px)");

    let {data: supplierData, isLoading: isLoadingSupplierData} = useGetSupplierDataQuery({userId});

    console.log(supplierData);

    return (
        <Box>
        </Box>
    )
}

export default Profile;