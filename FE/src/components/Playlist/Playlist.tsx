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
import { useDispatch, useSelector } from 'react-redux';
import { savePlaylistTrigger } from '../../pages/RecommendationList/RecommendationListSlice';
import { getUserId } from '../../pages/Login/selectors';
import { LoadingButton } from '@mui/lab';
import { getIsLoading } from '../../pages/RecommendationList/selectors';
import CheckIcon from '@mui/icons-material/Check';

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
        [theme.breakpoints.down('md')]: {
            width: 'auto',
            padding: '0 8px'
        }
    },
    playlistName: {
        marginBottom: '8px',
    },
    hideMovieList: {
        display: 'none'
    },
    title: {
        display: 'flex'
    },
    saveButton: {
        display: 'flex',
        alignItems: 'center',
        marginTop: '8px'
    },
    deleteButton: {
        marginTop: '8px'
    }
}));

const Playlist = ({ playlist, handleDelete, borderCondition, marginCondition, canDelete }: PlaylistProps) => {
    const { classes } = useStyles();
    const { t } = useTranslation('playlists');
    const [hideMovieList, setHideMovieList] = useState(false);
    const dispatch = useDispatch();
    const userId = useSelector(getUserId);
    const [isSaved, setIsSaved] = useState(false);
    const savePlaylistIsLoading = useSelector(getIsLoading);

    const handleSavePlaylistOfFriend = () => {
        const { id, movies: playlistMovies, ...rest } = playlist;
        const movies = playlistMovies.map(movie => movie.id);
        setIsSaved(true);
        dispatch(savePlaylistTrigger({ ...rest, movies, userId }));
    }

    return (
        <div className={clsx({ [classes.playlistContainer]: true, [classes.borderBottom]: borderCondition, [classes.marginTop]: marginCondition })}>
            <CenterContainer removeMarginTop>
                <div className={classes.playlistInfo}>
                    <div className={classes.title}>
                        <Typography variant='h4' className={classes.playlistName}>{playlist.name}</Typography>
                        <Button onClick={() => setHideMovieList(!hideMovieList)}>
                            {hideMovieList ? <Icon component={KeyboardArrowDownIcon} /> : <Icon component={KeyboardArrowUpIcon} />}
                        </Button>
                    </div>
                    <Typography>"{playlist.userInput}"</Typography>
                    {canDelete ? <Button onClick={() => handleDelete(playlist.id)} className={classes.deleteButton} variant="outlined">{t('deletePlaylist')}</Button> :
                        <LoadingButton disabled={isSaved} className={classes.saveButton} loading={savePlaylistIsLoading} variant="outlined" onClick={handleSavePlaylistOfFriend}>
                            {isSaved ? <><Icon component={CheckIcon} />{t('saved')}</> : t('save')}
                        </LoadingButton>}
                </div>
                <div className={clsx({ [classes.hideMovieList]: hideMovieList })}>
                    <MovieList movies={playlist.movies} />
                </div>
            </CenterContainer>
        </div>
    )
}

export default Playlist;
