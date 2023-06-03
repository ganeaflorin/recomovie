import { Button, Icon, TextField } from '@mui/material';
import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { clearData, savePlaylistTrigger, updatePlaylistName } from '../RecommendationListSlice';
import { useTranslation } from 'react-i18next';
import { makeStyles } from 'tss-react/mui';
import { LoadingButton } from '@mui/lab';
import CheckIcon from '@mui/icons-material/Check';
import { getInput, getMoviesIds, getPlaylistData } from '../selectors';
import { getUserId } from '../../Login/selectors';

const useStyles = makeStyles()((theme) => ({
    playlistContainer: {
        height: '120px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        margin: '40px 0'
    },
    submitButton: {
        display: 'flex',
        alignItems: 'center'
    },
    buttonsContainer: {
        display: 'flex',
        width: '100%',
        justifyContent: 'space-evenly'
    }
}));

const PlaylistForm = () => {
    const dispatch = useDispatch();
    const { t } = useTranslation('recommendations');
    const { classes } = useStyles();
    const { isLoading, isSaved } = useSelector(getPlaylistData);
    const movies: string[] = useSelector(getMoviesIds);
    const { name } = useSelector(getPlaylistData);
    const userInput: string = useSelector(getInput);
    const userId: string = useSelector(getUserId);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { value } = e.target;
        dispatch(updatePlaylistName(value));
    }

    const handleSubmit = () => {
        dispatch(savePlaylistTrigger({ movies, name, userInput, userId }));
    }

    const handleClear = () => {
        dispatch(clearData());
    }

    return (
        <div className={classes.playlistContainer}>
            <TextField disabled={isSaved} onChange={handleChange} label={t('playlist.name')} />
            <div className={classes.buttonsContainer}>
                <LoadingButton disabled={isSaved} className={classes.submitButton} loading={isLoading} variant="contained" onClick={handleSubmit}>
                    {isSaved ? <><Icon component={CheckIcon} />{t('saved')}</> : t('save')}
                </LoadingButton>
                <Button variant="contained" onClick={handleClear}>{t('clearButton')}</Button>
            </div>
        </div>
    )
}

export default PlaylistForm;