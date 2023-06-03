import React from 'react'
import CenterContainer from '../../components/CenterContainer';
import { useTranslation } from 'react-i18next';
import { Typography } from '@mui/material';

const Forbidden = () => {
    const { t } = useTranslation('common');
    return (
        <CenterContainer>
            <Typography variant="h5">
                {t('forbidden')}
            </Typography>
        </CenterContainer>
    )
}

export default Forbidden;