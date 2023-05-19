import { Button, Icon, Typography } from '@mui/material';
import clsx from 'clsx';
import React, { useState } from 'react'
import { makeStyles } from 'tss-react/mui';
import CenterContainer from '../CenterContainer';
import MovieList from '../MovieList';
import { PlaylistProps } from '../../entities/playlists';
import { useTranslation } from 'react-i18next';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
const useStyles = makeStyles()((theme) => ({
    playlistContainer: {
        maxWidth: '1344px',
        width: '900px',
        [theme.breakpoints.down('md')]: {
            width: '100vw'
        },
    },
    borderBottom: {
        borderBottom: `2px solid ${theme.palette.grey[300]}`,
    },
    marginTop: {
        marginTop: '40px'
    },
    playlistInfo: {
        maxWidth: '900px',
        alignSelf: 'start',
        width: '100%',
        margin: '20px 0 40px 0',
    },
    playlistName: {
        marginBottom: '8px',
    },
    hideMovieList: {
        display: 'none'
    },
    title: {
        display: 'flex'
    }
}));

const Playlist = ({ playlist, handleDelete, borderCondition, marginCondition }: PlaylistProps) => {
    const { classes } = useStyles();
    const { t } = useTranslation('playlists');
    const [hideMovieList, setHideMovieList] = useState(false);

    return (
        <div className={clsx({ [classes.playlistContainer]: true, [classes.borderBottom]: borderCondition, [classes.marginTop]: marginCondition })}>
            <CenterContainer removeMarginTop>
                <div className={classes.playlistInfo}>
                    <div className={classes.title}>
                        <Typography variant='h2' className={classes.playlistName}>{playlist.name}</Typography>
                        <Button onClick={() => setHideMovieList(!hideMovieList)}>
                            {hideMovieList ? <Icon component={KeyboardArrowDownIcon} /> : <Icon component={KeyboardArrowUpIcon} />}
                        </Button>
                    </div>
                    <Button onClick={() => handleDelete(playlist.id)}>{t('deletePlaylist')}</Button>
                    <Typography>"{playlist.userInput}"</Typography>
                </div>
                <div className={clsx({ [classes.hideMovieList]: hideMovieList })}>
                    <MovieList movies={playlist.movies} />
                </div>
            </CenterContainer>
        </div>
    )
}

export default Playlist;
