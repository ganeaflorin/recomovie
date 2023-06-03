import React from 'react'
import { Button, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { makeStyles } from 'tss-react/mui';
import { FriendSectionProps } from '../../entities/friends';

const useStyles = makeStyles()((theme) => ({
    friendContainer: {
        display: 'grid',
        gridTemplateColumns: 'repeat(3, auto)',
        columnGap: '30px',
        rowGap: '20px',
        alignItems: 'center',
        [theme.breakpoints.down('sm')]: {
            columnGap: '10px'
        }
    },
    noData: {
        textAlign: 'center',
    },
}));


const FriendRequestList = ({ data: friendRequests, userId, updateFriendshipStatus }: FriendSectionProps) => {
    const { t } = useTranslation('friends');
    const { classes } = useStyles();

    return (
        <>
            {friendRequests.length === 0 && <Typography variant='h5' className={classes.noData}>{t('noFriendRequests')}</Typography>}
            <div className={classes.friendContainer}>
                {friendRequests.map((friendRequest) =>
                    <>
                        <Typography variant="h6">{friendRequest.username}</Typography>
                        <Button variant="contained" onClick={() => updateFriendshipStatus(friendRequest.id, userId, true)}>
                            {t('acceptFriendRequest')}
                        </Button>
                        <Button variant="outlined" onClick={() => updateFriendshipStatus(friendRequest.id, userId, false)}>
                            {t('declineFriendRequest')}
                        </Button >
                    </>
                )}
            </div >
        </>);
}
export default FriendRequestList;