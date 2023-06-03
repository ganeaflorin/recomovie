import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { getFriendshipStatusTrigger, getUserProfileTrigger, sendFriendRequestTrigger } from './UserProfileSlice';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Icon, Typography } from '@mui/material';
import { getReceivingUserId, getSendingUserId, getStatus, getUserProfileData, getUserProfileError } from './selectors';
import Playlists from '../Playlists';
import { useTranslation } from 'react-i18next';
import { getUserId } from '../Login/selectors';
import { updateFriendStatusTrigger } from '../Friends/FriendsSlice';
import { makeStyles } from 'tss-react/mui';
import CenterContainer from '../../components/CenterContainer';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

const useStyles = makeStyles()((theme) => ({
    userProfileContainer: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        width: '900px',
        marginTop: '60px',
        [theme.breakpoints.down('md')]: {
            width: '100%'
        }
    },
    profile: {
        alignSelf: 'start',
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        borderBottom: `2px solid ${theme.palette.grey[300]}`,
        paddingBottom: '20px',
        [theme.breakpoints.down(701)]: {
            flexDirection: 'column',
        }
    },
    userInfo: {
        display: 'flex',
        alignItems: 'center'
    },
    profileIcon: {
        marginRight: '10px',
        width: '40px',
        height: '40px',
        color: theme.palette.primary.main
    },
    button: {
        marginLeft: '20px'
    },
    viewPlaylistsForbidden: {
        marginTop: '100px',
    }
}));

const UserProfile = () => {
    const currentUserId = useSelector(getUserId);
    const { userId: id } = useParams();
    const { classes } = useStyles();
    const dispatch = useDispatch();
    const { t } = useTranslation('userProfile');
    const { username } = useSelector(getUserProfileData);
    const status = useSelector(getStatus);
    const sendingUserId = useSelector(getSendingUserId);
    const receivingUserId = useSelector(getReceivingUserId);
    const userProfileError = useSelector(getUserProfileError);
    const isOwnProfile = String(currentUserId) === id;

    const updateFriendshipStatus = (sendingUserId: string, receivingUserId: string | undefined, status: boolean) => {
        const payload = { sendingUserId, receivingUserId, status };
        dispatch(updateFriendStatusTrigger(payload));
        dispatch(getFriendshipStatusTrigger({ sendingUserId: currentUserId, receivingUserId: id }))

    }

    const sendFriendRequest = (sendingUserId: string, receivingUserId: string | undefined) => {
        const payload = { sendingUserId, receivingUserId };
        dispatch(sendFriendRequestTrigger(payload));
    }

    useEffect(() => {
        dispatch(getUserProfileTrigger({ id }));
        dispatch(getFriendshipStatusTrigger({ sendingUserId: currentUserId, receivingUserId: id }))
    }, [id, currentUserId, dispatch]);

    return (
        <>
            {userProfileError &&
                <CenterContainer>
                    <Typography variant="h5">{t(`errors.${userProfileError.message}`)}</Typography>
                </CenterContainer>
            }
            {
                !userProfileError &&
                <div className={classes.userProfileContainer}>
                    <div className={classes.profile}>
                        <div className={classes.userInfo}>
                            <Icon component={AccountCircleIcon} className={classes.profileIcon} />
                            <Typography variant="h2">{username}</Typography>
                        </div>
                        {!isOwnProfile && <div>
                            {status &&
                                <Button className={classes.button} variant="outlined" onClick={() => updateFriendshipStatus(currentUserId, id, false)}>{t('removeFriend')}</Button>}
                            {status === false &&
                                <Button className={classes.button} variant="contained" onClick={() => sendFriendRequest(currentUserId, id)}>{t('addFriend')}</Button>}
                            {status === null && sendingUserId === currentUserId &&
                                <Button className={classes.button} variant="outlined" onClick={() => updateFriendshipStatus(currentUserId, id, false)}>{t('cancelFriend')}</Button>}
                            {status === null && receivingUserId === currentUserId &&
                                <>
                                    <Button className={classes.button} variant="contained" onClick={() => updateFriendshipStatus(currentUserId, id, true)}>{t('acceptFriend')}</Button>
                                    <Button className={classes.button} variant="outlined" onClick={() => updateFriendshipStatus(currentUserId, id, false)}>{t('declineFriend')}</Button>
                                </>
                            }
                        </div>
                        }
                    </div>
                    {(status || isOwnProfile) && <Playlists />}
                    {!status && !isOwnProfile && <Typography variant="h5" className={classes.viewPlaylistsForbidden}>{t('viewPlaylistsForbidden')}</Typography>}
                </div>
            }
        </>

    )
}
export default UserProfile;