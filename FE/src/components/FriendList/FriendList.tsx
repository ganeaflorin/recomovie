import { Button, Typography } from '@mui/material';
import React from 'react'
import { useTranslation } from 'react-i18next';
import { makeStyles } from 'tss-react/mui';
import paths from '../../common/paths';
import { Link } from 'react-router-dom';
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
    }
}));

const FriendList = ({ userId, data: friendList, updateFriendshipStatus }: FriendSectionProps) => {
    const { t } = useTranslation('friends');
    const { classes } = useStyles();

    return (
        <>
            {friendList.length === 0 && <Typography variant='h5' className={classes.noData}>{t('noFriends')}</Typography>}
            <div className={classes.friendContainer}>
                {friendList.map(friend =>
                    <>
                        <Typography variant="h6">{friend.username}</Typography>
                        <Link to={`${paths.profile}/${friend.id}`}>
                            <Button variant="contained">{t('viewProfile')}</Button>
                        </Link>
                        <Button variant="outlined" onClick={() => updateFriendshipStatus(userId, friend.id, false)}>{t('removeFriend')}</Button>
                    </>
                )}
            </div>
        </>
    )
}

export default FriendList;
