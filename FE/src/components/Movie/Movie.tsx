import React from 'react'
import { MovieDetails } from '../../entities/recommendationList';
import { makeStyles } from 'tss-react/mui';
import { Icon, Typography } from '@mui/material';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import ScheduleIcon from '@mui/icons-material/Schedule';
import { useTranslation } from 'react-i18next';
import { getRuntimeInHours } from './utils';
import { v4 as uuidv4 } from 'uuid';

const useStyles = makeStyles()((theme) => ({
    container: {
        display: 'flex',
        maxWidth: '900px',
        [theme.breakpoints.down('sm')]: {
            flexDirection: 'column',
            alignItems: 'center',
        },
    },
    poster: {
        marginRight: '20px',
        maxHeight: '450px',
        maxWidth: '300px',
        border: '2px solid black',
        [theme.breakpoints.down('sm')]: {
            marginRight: '0',
        },
    },
    details: {
        display: 'flex',
        flexDirection: 'column',
        maxHeight: '100%',
        [theme.breakpoints.down('sm')]: {
            margin: '10px 20px',
            alignItems: 'center',
        },

    },
    alignCenter: {
        display: 'flex',
        alignItems: 'center',
        flexWrap: 'wrap',
    },
    marginRight: {
        marginRight: '10px',
    },
    separator: {
        margin: '0 10px',
        color: theme.palette.grey[400],
    },
    description: {
        marginTop: '40px',
        [theme.breakpoints.down('sm')]: {
            marginTop: '20px',
        },
    },
    genre: {
        textTransform: 'capitalize',
        margin: '10px 10px 0 0',
    },
    persons: {
        marginTop: 'auto',
        [theme.breakpoints.down('sm')]: {
            marginTop: '20px',
        },
    },
    title: {
        [theme.breakpoints.down('sm')]: {
            textAlign: 'center',
        },
    }
}));


const Movie = ({ movie }: { movie: MovieDetails }) => {
    const { classes } = useStyles();
    const { t } = useTranslation('recommendations');
    const { posterPath, releaseDate, genres, description, title, cast, runtime, director } = movie;

    return (
        <div className={classes.container}>
            <img src={posterPath} alt="movie poster" className={classes.poster}></img>
            <div className={classes.details}>
                <Typography variant="h4" className={classes.title}>{title}</Typography>
                <div className={classes.alignCenter}>
                    <div className={classes.alignCenter}>
                        <Icon component={CalendarMonthIcon} className={classes.marginRight} />
                        <Typography>{releaseDate}</Typography>
                    </div>
                    <Typography className={classes.separator}>|</Typography>
                    <div className={classes.alignCenter}>
                        <Icon component={ScheduleIcon} className={classes.marginRight} />
                        <Typography>{getRuntimeInHours(runtime)}</Typography>
                    </div>
                </div>
                <div className={classes.alignCenter}>
                    {genres.map((genre) => <Typography key={uuidv4()} variant="subtitle2" className={classes.genre}>
                        {genre}
                    </Typography>)}
                </div>
                <Typography className={classes.description}>{description}</Typography>
                <div className={classes.persons}>
                    <div className={classes.alignCenter}>
                        <Typography variant="subtitle2" className={classes.marginRight}>{t('movieDetails.director')}</Typography>
                        <Typography>{director}</Typography>
                    </div>
                    <div className={classes.alignCenter}>
                        <Typography variant="subtitle2" className={classes.marginRight}>{t('movieDetails.cast')}</Typography>
                        {cast.map((actor, index) =>
                            <>
                                <Typography key={uuidv4()}>{actor}</Typography>
                                {index < cast.length - 1 && <Typography key={uuidv4()} className={classes.separator}>|</Typography>}
                            </>

                        )}
                    </div>
                </div>
            </div>
        </div >
    )
}

export default Movie;