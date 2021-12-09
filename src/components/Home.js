import OrganizedTripList from "./OrganizedTripList";
import AdventureList from "./AdventureList"
import NavBar from "./NavBar"
import {useEffect} from "react"
import * as React from 'react';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import{useContext} from "react"
import {UserContext} from "../context/userState"

function Home({changeUser}){
    const{user, setUser} = useContext(UserContext)    
    useEffect(() => {
        fetch(`http://localhost:9595/users/${user.username}`)
        .then(r => r.json())
        .then(data => changeUser(data))
    }, [])

    return(
        <>
            <NavBar currentUser={user}/>
            <h1>Welcome {user.first_name} {user.last_name}</h1>
            <Box sx={{ width: '100%' }}>
            <h1>Welcome {user.first_name} {user.last_name}</h1>
                <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                    <Grid item xs={6}>
                        <OrganizedTripList currentUser={user} changeUser={changeUser}/>
                    </Grid>
                    <Grid item xs={6}>
                        <AdventureList currentUser={user}/>
                    </Grid>
                </Grid>
            </Box>
        </>
    );
}

export default Home