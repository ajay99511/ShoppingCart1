import { Alert, AlertTitle, Button, ButtonGroup, Container, List, ListItem, ListItemText, Typography } from "@mui/material";
import agent from "../../app/api/agent";
import { useState } from "react";


export default function error(){
    const [validationErrors,setValidationErrors] = useState<string[]>([]);

    function getValidationError()
    {
        agent.testErrors.getValidationError()
        .then(()=>console.log('Cant See this'))
        .catch(error=>setValidationErrors(error))
    };
    return(
        <Container>
            <Typography gutterBottom variant="h4">
                Testing Errors 
                </Typography>
                <ButtonGroup fullWidth>
                    <Button variant="contained" onClick={()=>agent.testErrors.get400Error().catch(error=>console.log(error))}>Get400 Error</Button>
                    <Button variant="contained" onClick={()=>agent.testErrors.get401Error().catch(error=>console.log(error))}>Get401 Error</Button>
                    <Button variant="contained" onClick={()=>agent.testErrors.get404Error().catch(error=>console.log(error))}>Get404 Error</Button>
                    <Button variant="contained" onClick={()=>agent.testErrors.get500Error().catch(error=>console.log(error))}>Get500 Error</Button>
                    <Button variant="contained" onClick={getValidationError}>Get Validation Error</Button>
                </ButtonGroup>
                {validationErrors.length>0 &&
                <Alert severity="error">
                    <AlertTitle>Validation Errors</AlertTitle>
                    <List>
                    {validationErrors.map(error=>
                    (
                        <ListItem key={error}>
                            <ListItemText>{error}</ListItemText>
                        </ListItem>
                    )
                )}
                    </List>
                </Alert>
                    }
        </Container>
    )
}