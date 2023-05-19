import React from 'react';
import { makeStyles } from 'tss-react/mui';
import clsx from 'clsx';

const useStyles = makeStyles()((theme) => ({
    container: {
        display: 'flex',
        width: '100%',
        height: '100%',
        alignItems: 'center',
        flexDirection: 'column',
    },
    marginTop: {
        marginTop: '200px',
    }
}));

interface CenterContainerProps {
    children: React.ReactNode,
    removeMarginTop?: boolean,
}

const CenterContainer = ({ children, removeMarginTop }: CenterContainerProps) => {
    const { classes } = useStyles();

    return (
        <div className={clsx({ [classes.container]: true, [classes.marginTop]: !removeMarginTop })}>
            {children}
        </div>
    )
}

export default CenterContainer;
