import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getFriendListTrigger, getFriendRequestsTrigger, updateFriendStatusTrigger } from './FriendsSlice';
import { getUserId } from '../Login/selectors';
import { getFriendList, getFriendRequests } from './selectors';
import FriendList from '../../components/FriendList';
import { Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import FriendRequestList from '../../components/FriendRequestList';
import { makeStyles } from 'tss-react/mui';

const useStyles = makeStyles()((theme) => ({
    friendsContainer: {
        marginTop: '200px',
        width: '100%',
        display: 'flex',
        justifyContent: 'space-evenly',
        [theme.breakpoints.down('md')]: {
            flexDirection: 'column',
            alignItems: 'center',
            marginTop: '0px'
        },
    },
    sectionContainer: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        [theme.breakpoints.down('md')]: {
            marginTop: '100px'
        }
    },
    title: {
        marginBottom: '60px',
    },
    addNewFriendTitle: {
        marginBottom: '50px'
    }
}));

const Friends = () => {
    const dispatch = useDispatch();
    const { t } = useTranslation('friends');
    const id = useSelector(getUserId);
    const friendList = useSelector(getFriendList);
    const friendRequests = useSelector(getFriendRequests);
    const { classes } = useStyles();
    const getFriendListPayload = { id };

    useEffect(() => {
        dispatch(getFriendListTrigger(getFriendListPayload));
        dispatch(getFriendRequestsTrigger(getFriendListPayload));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const updateFriendshipStatus = (sendingUserId: string, receivingUserId: string, status: boolean) => {
        const payload = { sendingUserId, receivingUserId, status };
        dispatch(updateFriendStatusTrigger(payload));
        setTimeout(() => {
            dispatch(getFriendListTrigger(getFriendListPayload));
            dispatch(getFriendRequestsTrigger(getFriendListPayload));
        }, 100);
    }

    return (
        <div className={classes.friendsContainer}>
            <div className={classes.sectionContainer}>
                <Typography variant="h4" className={classes.title}>{t('friendRequestsTitle')}</Typography>
                <FriendRequestList data={friendRequests} userId={id} updateFriendshipStatus={updateFriendshipStatus} />
            </div>
            <div className={classes.sectionContainer}>
                <Typography variant="h4" className={classes.title}>{t('friendListTitle')}</Typography>
                <FriendList data={friendList} updateFriendshipStatus={updateFriendshipStatus} userId={id} />
            </div>
        </div>
    )
}

export default Friends;
