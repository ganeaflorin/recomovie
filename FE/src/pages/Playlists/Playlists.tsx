import React, { useEffect } from 'react'
import { getData, getIsDeleted, getIsLoading } from './selectors';
import { useDispatch, useSelector } from 'react-redux';
import { getUserId } from '../Login/selectors';
import { clearIsDeleted, deletePlaylistTrigger, getPlaylistsTrigger } from './PlaylistsSlice';
import { Typography } from '@mui/material';
import { makeStyles } from 'tss-react/mui';
import Loader from '../../components/Loader';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import { getFriendListTrigger } from '../Friends/FriendsSlice';
import { getFriendUsername } from '../Friends/selectors';
import Playlist from '../../components/Playlist';
import { v4 as uuidv4 } from 'uuid';

const useStyles = makeStyles()((theme) => ({
    noPlaylists: {
        marginTop: '100px',
        textAlign: 'center',
    },
}));

const Playlists = () => {
    const dispatch = useDispatch();
    const { classes } = useStyles();
    const { t } = useTranslation('playlists');

    const playlists = useSelector(getData);
    const userId = useSelector(getUserId);
    const isLoading = useSelector(getIsLoading);
    const isDeleted = useSelector(getIsDeleted);
    const { userId: friendId } = useParams();
    const friendName = useSelector(getFriendUsername(friendId));

    useEffect(() => {
        dispatch(getPlaylistsTrigger({ userId: friendId || userId }));
        if (friendId) {
            dispatch(getFriendListTrigger({ id: userId }))
        }
    }, [dispatch, userId, friendId]);

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
            {playlists.length === 0 &&
                ((friendId && friendId !== String(userId)) ? <Typography variant='h5' className={classes.noPlaylists}>{t('friendNoPlaylists', { friendName })}</Typography>
                    : <Typography variant='h5' className={classes.noPlaylists}>{t('noPlaylists')}</Typography>)}
            {playlists.length > 0 && playlists.map((playlist, index) =>
                <Playlist playlist={playlist} key={uuidv4()} canDelete={friendId === undefined} handleDelete={handleDelete} borderCondition={index !== playlists.length - 1} marginCondition={index === 0} />
            )}
        </Loader>
    )
}

export default Playlists;