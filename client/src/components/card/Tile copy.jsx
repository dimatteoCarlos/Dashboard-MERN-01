//Tile.jsx
//Parent: Products.jsx

import { styled } from '@mui/material/styles';

import {
  Card,
  CardContent,
  CardActions,
  Collapse,
  IconButton,
  Typography,
  Box,
} from '@mui/material';

// import CardHeader from '@mui/material/CardHeader';
// import CardMedia from '@mui/material/CardMedia';
// import Avatar from '@mui/material/Avatar';
// import { IconButtonProps } from '@mui/material/IconButton';
// import { red } from '@mui/material/colors';

import MoreVertIcon from '@mui/icons-material/MoreVert';

import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

// interface ExpandMoreProps extends IconButtonProps {
//   expand: boolean;
// }

import { Rating, useTheme } from '@mui/material';
import { useState } from 'react';

const ExpandMore = styled(
  (
    props
    // : ExpandMoreProps
  ) => {
    const { expand, ...other } = props;
    return <IconButton {...other} />;
  }
)(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(540deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.largest, //shortest
  }),
}));

//------------------------------
export default function Tile({
  field_1,
  field_2,
  field_3,
  field_4,
  field_5,
  field_6,
  field_7,
  field_8,
  field_9,
}) {
  const theme = useTheme();
  const [isExpanded, setIsExpanded] = useState(false);

  const handleExpandClick = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <Card
      sx={{
        backgroundImage: 'none',
        backgroundColor: theme.palette.background.alt,
        borderRadius: '0.55rem',
        maxWidth: 345,
      }}
    >
      {/* <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: 'tomato' }} aria-label='recipe'>
            C
          </Avatar>
        }
        action={
          <IconButton aria-label='settings'>
            <MoreVertIcon />
          </IconButton>
        }
        title='Title'
        subheader='September 14, 2016'
      /> */}

      {/* <CardMedia
        component='img'
        height='194'
        image='/static/images/cards/paella.jpg'
        alt='Paella dish'
      /> */}

      <CardContent>
        <Typography
          gutterBottom={true}
          sx={{
            fontSize: '1rem',
            color: theme.palette.secondary[700],
          }}
        >
          {field_1}
        </Typography>
        <Typography
          variant='h4'
          component='div'
          // color=''
        >
          {field_2}
        </Typography>

        <Typography mb='1.5rem' color={theme.palette.secondary[400]}>
          $ {Number(field_3).toFixed(2)}
        </Typography>

        <Rating value={Number({ field_4 })} readOnly />

        <Typography variant='body2'>{field_5}</Typography>
      </CardContent>

      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          gap: '1rem',
          // border: '1px solid red',
        }}
      >
        <CardActions disableSpacing>
          <IconButton aria-label='add to favorites'>
            <FavoriteIcon />
          </IconButton>
          <IconButton aria-label='share'>
            <ShareIcon />
          </IconButton>
        </CardActions>

        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            alignmentBaseline: 'bottom',
            gap: '1rem',
            // border: '1px solid yellow',
          }}
        >
          <Typography mr='end'>see more</Typography>

          <ExpandMore
            expand={isExpanded}
            onClick={handleExpandClick}
            aria-expanded={isExpanded}
            aria-label='see more'
          >
            <ExpandMoreIcon />
          </ExpandMore>
        </Box>
      </Box>

      <Collapse
        in={isExpanded}
        timeout='auto'
        unmountOnExit
        sx={{ color: theme.palette.neutral[300] }}
      >
        <CardContent>
          <Typography>id: {field_6}</Typography>
          <Typography >{field_7}</Typography>
          <Typography >{field_8}</Typography>
          <Typography >{field_9}</Typography>
          {/* <Typography></Typography> */}
        </CardContent>
      </Collapse>
    </Card>
  );
}
