import { Autocomplete, TextField } from '@mui/material';
import React from 'react'
import { useTranslation } from 'react-i18next';
import { makeStyles } from 'tss-react/mui';
import paths from '../../common/paths';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getUsers } from '../../pages/Users/selectors';
import { getUsersTrigger, } from '../../pages/Users/UserSlice';
import { User } from '../../entities/common';

const useStyles = makeStyles()((theme) => ({
    autocomplete: {
        width: '360px',
        borderRadius: '30px',
        marginLeft: '30px',
        '& .MuiInputBase-root': {
            borderRadius: '30px',
            color: 'white'
        },
        '& .MuiFormLabel-root': {
            color: 'white !important'
        },
        '& .MuiAutocomplete-endAdornment': {
            'button svg': {
                color: 'white'
            }
        }
    }
}
));

const UserSearch = () => {
    const users = useSelector(getUsers);
    const { t } = useTranslation('common');
    const { classes } = useStyles();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const onInputChange = (e: any) => {
        const { value } = e?.target ?? {};
        if (value?.length >= 3) {
            dispatch(getUsersTrigger({ query: value }));
        }
    }

    const handleChange = (_: any, option: User | null) => {
        if (option) {
            navigate(`${paths.profile}/${option?.id}`);
        }
    }

    return (
        <Autocomplete
            className={classes.autocomplete}
            onChange={handleChange}
            options={users}
            renderInput={(params) => <TextField {...params} label={t('searchFriend')} />}
            getOptionLabel={(option) => option.username}
            onInputChange={onInputChange}
        />
    )
}

export default UserSearch;