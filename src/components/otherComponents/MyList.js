import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemIcon from '@mui/material/ListItemIcon';
import LabelIcon from '@mui/icons-material/Label';
import ListItemText from '@mui/material/ListItemText';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import FolderIcon from '@mui/icons-material/Folder';
import DeleteIcon from '@mui/icons-material/Delete';
import { InterpreterModeSharp } from '@mui/icons-material';

const MyList = ({items, header}) => {

function generate(element) {
  return [items].map((index) =>
    React.cloneElement(element, {
      key: index
    }),
  );
}

const Demo = styled('div')(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
}));


  const [dense, setDense] = React.useState(false);
  const [secondary, setSecondary] = React.useState(true);

  return (
    // <Box sx={{ flexGrow: 1, maxWidth: 752 }}>
      <Grid container spacing={2}>

<Grid item xs={12} md={12}>
          <Typography sx={{ mt: 4, mb: 2 }} variant="upperCaseBold" component="div">
            {header}
          </Typography>
          <Demo>
            <List dense={dense}>
              {items.map((item, index) => 

                  (<ListItem key={index}>
                      <ListItemIcon>
                          <LabelIcon />
                      </ListItemIcon>
                      <ListItemText
                          primary={item.primary}
                          secondary={secondary ? item.secondary : null}
                      />
                  </ListItem>
                  )
              )}
            </List>
          </Demo>
        </Grid>
      </Grid>
    //   </Box>
  );
              }

export default MyList
