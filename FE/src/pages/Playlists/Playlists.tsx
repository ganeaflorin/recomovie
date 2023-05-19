import React, { useEffect } from 'react'
import { getData, getIsDeleted, getIsLoading } from './selectors';
import { useDispatch, useSelector } from 'react-redux';
import { getUserId } from '../Login/selectors';
import { clearIsDeleted, deletePlaylistTrigger, getPlaylistsTrigger } from './PlaylistsSlice';
import { Typography } from '@mui/material';
import { makeStyles } from 'tss-react/mui';
import Loader from '../../components/Loader';
import { useTranslation } from 'react-i18next';
import Playlist from '../../components/Playlist';

const useStyles = makeStyles()((theme) => ({
    noPlaylists: {
        marginTop: '200px',
        textAlign: 'center',
    }
}));

const Playlists = () => {
    const dispatch = useDispatch();
    const { classes } = useStyles();
    const { t } = useTranslation('playlists');

    const playlists = useSelector(getData);
    const userId = useSelector(getUserId);
    const isLoading = useSelector(getIsLoading);
    const isDeleted = useSelector(getIsDeleted);

    useEffect(() => {
        dispatch(getPlaylistsTrigger({ userId }))
    }, [dispatch, userId]);

    useEffect(() => {
        if (isDeleted) {
            dispatch(getPlaylistsTrigger({ userId }))
            dispatch(clearIsDeleted());
        }
    }, [dispatch, isDeleted, userId]);

    const handleDelete = (playlistId: string) => {
        dispatch(deletePlaylistTrigger({ playlistId }));
    };


    return (
        <Loader condition={isLoading}>
            {playlists.length === 0 && <Typography variant='h4' className={classes.noPlaylists}>{t('noPlaylists')}</Typography>}
            {playlists.length > 0 && playlists.map((playlist, index) =>
                <Playlist playlist={playlist} handleDelete={handleDelete} borderCondition={index !== playlists.length - 1} marginCondition={index === 0} />
            )}
        </Loader>
    )
}

export default Playlists;