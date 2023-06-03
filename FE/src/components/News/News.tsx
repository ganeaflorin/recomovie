import React, { useState } from 'react'
import { NewsType } from '../../entities/home';
import { Button, Icon, Typography } from '@mui/material';
import { makeStyles } from 'tss-react/mui';
import clsx from 'clsx';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

const useStyles = makeStyles()((theme) => ({
    newsContainer: {
        width: '900px',
        [theme.breakpoints.down('md')]: {
            width: 'auto'
        },
    },
    image: {
        width: '100%',
        marginBottom: '16px'
    },
    hideContent: {
        display: 'none'
    },
    titleContainer: {
        display: 'flex',
        margin: '40px 0',
        position: 'relative'
    },
    content: {
        marginTop: '16px',
        marginBottom: '40px',
    },
    borderBottom: {
        borderBottom: `2px solid ${theme.palette.grey[300]}`,
    },
    expandIcon: {
        position: 'absolute',
        right: '0',
        top: '50%',
        transform: 'translateY(-50%)'
    },
    title: {
        paddingRight: '50px',

    },
    textPadding: {
        [theme.breakpoints.down('md')]: {
            paddingLeft: '8px'
        }
    }
}));
const News = ({ news, borderCondition }: { news: NewsType, borderCondition: boolean }) => {
    const { title, description, content, image } = news;
    const { classes } = useStyles();
    const [isExpanded, setIsExpanded] = useState(true);
    return (
        <div className={clsx({ [classes.newsContainer]: true, [classes.borderBottom]: borderCondition })}>
            <div className={classes.titleContainer}>
                <Typography variant="h5" className={clsx(classes.title, classes.textPadding)}>{title}</Typography>
                <Button onClick={() => setIsExpanded(!isExpanded)} className={classes.expandIcon}>
                    {!isExpanded ? <Icon component={KeyboardArrowDownIcon} /> : <Icon component={KeyboardArrowUpIcon} />}
                </Button>
            </div>
            <div className={clsx({ [classes.hideContent]: !isExpanded })}>
                <img src={image} alt="news" className={classes.image} />
                <Typography variant="h6" className={classes.textPadding}>{description}</Typography>
                <Typography variant="body1" className={clsx(classes.content, classes.textPadding)}>{content}</Typography>
            </div>
        </div >
    )
}

export default News;
