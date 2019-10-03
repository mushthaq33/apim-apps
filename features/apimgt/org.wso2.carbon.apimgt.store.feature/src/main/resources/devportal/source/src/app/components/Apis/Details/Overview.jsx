/*
 * Copyright (c) 2019, WSO2 Inc. (http://www.wso2.org) All Rights Reserved.
 *
 * WSO2 Inc. licenses this file to you under the Apache License,
 * Version 2.0 (the "License"); you may not use this file except
 * in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied. See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core/styles';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import MuiExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import { Link } from 'react-router-dom';
import Divider from '@material-ui/core/Divider';
import ExpansionPanelActions from '@material-ui/core/ExpansionPanelActions';
import Button from '@material-ui/core/Button';
import { FormattedMessage } from 'react-intl';
import CustomIcon from '../../Shared/CustomIcon';
import { ApiContext } from './ApiContext';
import Resources from './Resources';
import Operations from './Operations';
import Comments from './Comments/Comments';
import Sdk from './Sdk';
import API from '../../../data/api';
import OverviewDocuments from './OverviewDocuments';

/**
 *
 *
 * @param {*} theme
 */
const styles = theme => ({
    root: {
        padding: theme.spacing.unit * 3,
    },
    iconClass: {
        marginRight: 10,
        color: theme.palette.secondary.main,
    },
    boxBadge: {
        background: theme.palette.grey.A400,
        color: theme.palette.getContrastText(theme.palette.grey.A400),
        fontSize: theme.typography.h5.fontSize,
        padding: theme.spacing.unit,
        width: 30,
        height: 30,
        marginRight: 20,
        textAlign: 'center',
    },
    subscriptionBox: {
        paddingLeft: theme.spacing.unit * 2,
    },
    linkStyle: {
        color: theme.palette.getContrastText(theme.palette.background.default),
        fontSize: theme.typography.fontSize,
    },
    subscriptionTop: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
    },
    resourceWrapper: {
        height: 192,
        overflow: 'auto',
    },
    actionPanel: {
        justifyContent: 'flex-start',
    },
    linkToTest: {
        textDecoration: 'none',
    },
    button: {
        textDecoration: 'none',
    },
    verticalSpace: {
        marginLeft: theme.spacing.unit * 60,
    },
    subheading: {
        marginLeft: theme.spacing.unit * 2,
    },
    marginTop: {
        marginTop: theme.spacing(2),
    },
    subsToApp: {
        marginTop: theme.spacing(2),
    },
    subscribeButton: {
        marginLeft: theme.spacing(2),
    },
    expansionRoot: {
        minHeight: 238,
    },
    noCommentRoot: {
        backgroundImage: `url(${theme.custom.overviewPage.commentsBackground})`,
        height: '100%',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        minHeight: 192,
    },
    noDocumentRoot: {
        backgroundImage: `url(${theme.custom.overviewPage.documentsBackground})`,
        height: '100%',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        minHeight: 192,
    },
    emptyBox: {
        background: '#ffffff55',
        color: '#444',
        border: 'solid 1px #fff',
        padding: theme.spacing(2),
        marginTop: 50,
    },
});
const ExpansionPanelSummary = withStyles({
    root: {
        borderBottom: '1px solid rgba(0,0,0,.125)',
        marginBottom: -1,
        minHeight: 56,
        '&$expanded': {
            minHeight: 56,
        },
    },
    content: {
        '&$expanded': {
            margin: '12px 0',
        },
        alignItems: 'center',
    },
    expanded: {},
})(props => <MuiExpansionPanelSummary {...props} />);

ExpansionPanelSummary.muiName = 'ExpansionPanelSummary';

/**
 * Handles the Overview page for APIs and API Products.
 * @param {*} props properties passed by parent element
 * @memberof Overview
 */
function Overview(props) {
    const { classes, theme } = props;
    const [totalComments, setCount] = useState(0);
    const getResourcesForAPIs = (apiType, api) => {
        switch (apiType) {
            case 'GRAPHQL':
                return <Operations api={api} />;
            case 'WS':
                return '';
            default:
                return <Resources api={api} />;
        }
    };

    const getTitleForAPIOperationType = (apiType) => {
        switch (apiType) {
            case 'GRAPHQL':
                return <FormattedMessage id='Apis.Details.Overview.operations.title' defaultMessage='Operations' />;
            default:
                return <FormattedMessage id='Apis.Details.Overview.resources.title' defaultMessage='Resources' />;
        }
    };
    const openWizard = () => {};
    return (
        <ApiContext.Consumer>
            {({ api, applicationsAvailable, subscribedApplications }) => (
                <Grid container className={classes.root} spacing={2}>
                    {!api.advertiseInfo.advertised && (
                        <Grid item xs={12} lg={6}>
                            <ExpansionPanel defaultExpanded>
                                <ExpansionPanelSummary>
                                    <CustomIcon
                                        strokeColor={theme.palette.secondary.main}
                                        className={classes.iconClass}
                                        width={24}
                                        height={24}
                                        icon='credentials'
                                    />
                                    <Typography className={classes.heading} variant='h6'>
                                        <FormattedMessage
                                            id='Apis.Details.Overview.api.credentials'
                                            defaultMessage='API Credentials'
                                        />
                                    </Typography>
                                </ExpansionPanelSummary>
                                <ExpansionPanelDetails classes={{ root: classes.expansionRoot }}>
                                    <Grid container className={classes.root} spacing={2}>
                                        <Grid item xs={12}>
                                            <Typography variant='subtitle2'>
                                                <FormattedMessage
                                                    id='Apis.Details.Overview.subscribe.to.application'
                                                    defaultMessage='Generate Credentials'
                                                />
                                            </Typography>
                                            <Typography variant='body2'>
                                                <FormattedMessage
                                                    id='Apis.Details.Overview.credential.wizard.info'
                                                    defaultMessage={
                                                        'Use the Key Generation Wizard. Create a new application -> Subscribe -> '
                                                        + ' Generate keys and Access Token to invoke this API.'
                                                    }
                                                />
                                            </Typography>
                                            <Link
                                                to={{
                                                    pathname: '/apis/' + api.id + '/credentials/wizard',
                                                }}
                                            >
                                                <Button
                                                    variant='contained'
                                                    color='primary'
                                                    size='large'
                                                    onClick={openWizard}
                                                >
                                                    <FormattedMessage
                                                        id='Apis.Details.Overview.credential.wizard.title'
                                                        defaultMessage='Key Generation Wizard'
                                                    />
                                                </Button>
                                            </Link>
                                            {applicationsAvailable && applicationsAvailable.length > 0 && (
                                                <React.Fragment>
                                                    <Link to={'/apis/' + api.id + '/credentials'}>
                                                        <Button
                                                            variant='contained'
                                                            color='primary'
                                                            size='large'
                                                            className={classes.subscribeButton}
                                                        >
                                                            <FormattedMessage
                                                                id='Apis.Details.Overview.subscribe.to.application.btn'
                                                                defaultMessage='Subscribe to an Application'
                                                            />
                                                        </Button>
                                                    </Link>
                                                    <Typography variant='body2'>
                                                        {` ${applicationsAvailable.length} `}
                                                        {applicationsAvailable.length === 1 ? (
                                                            <FormattedMessage
                                                                id='Apis.Details.Overview.subscribe.to.application.content'
                                                                defaultMessage='Application'
                                                            />
                                                        ) : (
                                                            <FormattedMessage
                                                                id='Apis.Details.Overview.subscribe.to.application.content'
                                                                defaultMessage='Applications'
                                                            />
                                                        )}
                                                    </Typography>
                                                </React.Fragment>
                                            )}
                                        </Grid>
                                        <Grid item xs={12}>
                                            <Typography variant='subtitle2'>
                                                <FormattedMessage
                                                    id='Apis.Details.Overview.view.credentials'
                                                    defaultMessage='View Credentials'
                                                />
                                            </Typography>
                                            <Link to={'/apis/' + api.id + '/credentials'} className={classes.linkStyle}>
                                                <Typography variant='body2'>
                                                    {subscribedApplications.length}
                                                    {' '}
                                                    <FormattedMessage
                                                        id='Apis.Details.Overview.subscriptions'
                                                        defaultMessage='Subscriptions'
                                                    />
                                                </Typography>
                                            </Link>
                                        </Grid>
                                    </Grid>
                                </ExpansionPanelDetails>
                            </ExpansionPanel>
                        </Grid>
                    )}
                    {api.type !== 'WS' && (
                        <Grid item xs={12} lg={6}>
                            <ExpansionPanel defaultExpanded>
                                <ExpansionPanelSummary>
                                    <CustomIcon
                                        strokeColor={theme.palette.secondary.main}
                                        className={classes.iconClass}
                                        width={24}
                                        height={24}
                                        icon='credentials'
                                    />
                                    {getTitleForAPIOperationType(api.type)}
                                    <Typography className={classes.heading} variant='h6' />
                                </ExpansionPanelSummary>
                                <ExpansionPanelDetails className={classes.resourceWrapper}>
                                    {getResourcesForAPIs(api.type, api)}
                                </ExpansionPanelDetails>
                                {!api.advertiseInfo.advertised && (
                                    <React.Fragment>
                                        <Divider />
                                        <ExpansionPanelActions className={classes.actionPanel}>
                                            <Link to={'/apis/' + api.id + '/test'} className={classes.linkToTest}>
                                                <Button size='small' color='primary'>
                                                    <FormattedMessage
                                                        id='Apis.Details.Overview.resources.show.more'
                                                        defaultMessage='Test >>'
                                                    />
                                                </Button>
                                            </Link>
                                        </ExpansionPanelActions>
                                    </React.Fragment>
                                )}
                            </ExpansionPanel>
                        </Grid>
                    )}
                    {!api.advertiseInfo.advertised && (
                        <React.Fragment>
                            <Grid item xs={12} lg={6}>
                                <ExpansionPanel defaultExpanded>
                                    <ExpansionPanelSummary>
                                        <CustomIcon
                                            strokeColor={theme.palette.secondary.main}
                                            className={classes.iconClass}
                                            width={24}
                                            height={24}
                                            icon='comments'
                                        />
                                        <Typography className={classes.heading} variant='h6'>
                                            <FormattedMessage
                                                id='Apis.Details.Overview.comments.title'
                                                defaultMessage='Comments'
                                            />
                                        </Typography>
                                        <Typography className={classes.subheading}>
                                            {' ' + (totalComments > 3 ? 3 : totalComments) + ' of ' + totalComments}
                                        </Typography>
                                    </ExpansionPanelSummary>
                                    <ExpansionPanelDetails
                                        classes={{ root: classNames({ [classes.noCommentRoot]: totalComments === 0 }) }}
                                    >
                                        {api && <Comments apiId={api.id} showLatest isOverview setCount={setCount} />}
                                        {totalComments === 0 && (
                                            <Grid container className={classes.root} spacing={2}>
                                                <Grid item xs={12}>
                                                    <div className={classes.emptyBox}>
                                                        <Typography variant='body2'>
                                                            <FormattedMessage
                                                                id='Apis.Details.Overview.comments.no.content'
                                                                defaultMessage='No Comments Yet'
                                                            />
                                                        </Typography>
                                                    </div>
                                                </Grid>
                                            </Grid>
                                        )}
                                    </ExpansionPanelDetails>
                                    <Divider />
                                    <ExpansionPanelActions className={classes.actionPanel}>
                                        <Link to={'/apis/' + api.id + '/comments'} className={classes.button}>
                                            <Button size='small' color='primary'>
                                                <FormattedMessage
                                                    id='Apis.Details.Overview.comments.show.more'
                                                    defaultMessage='Show More >>'
                                                />
                                            </Button>
                                        </Link>
                                    </ExpansionPanelActions>
                                </ExpansionPanel>
                            </Grid>
                            {api.type !== 'WS' && (
                                <Grid item xs={6}>
                                    <ExpansionPanel defaultExpanded>
                                        <ExpansionPanelSummary>
                                            <CustomIcon
                                                strokeColor={theme.palette.secondary.main}
                                                className={classes.iconClass}
                                                width={24}
                                                height={24}
                                                icon='sdk'
                                            />
                                            <Typography className={classes.heading} variant='h6'>
                                                <FormattedMessage
                                                    id='Apis.Details.Overview.sdk.generation.title'
                                                    defaultMessage='SDK Generation'
                                                />
                                            </Typography>
                                        </ExpansionPanelSummary>
                                        <ExpansionPanelDetails className={classes.resourceWrapper}>
                                            <Grid container className={classes.root} spacing={2}>
                                                {api && <Sdk apiId={api.id} onlyIcons />}
                                                <Grid item xs={12}>
                                                    <Typography>
                                                        <FormattedMessage
                                                            id='Apis.Details.Overview.sdk.generation.description'
                                                            defaultMessage='If you wants to create a software application to consume the subscribed APIs, you can generate client side SDK for a supported language/framework and use it as a start point to write the software application.'
                                                        />
                                                    </Typography>
                                                </Grid>
                                            </Grid>
                                        </ExpansionPanelDetails>
                                        <Divider />
                                        <ExpansionPanelActions className={classes.actionPanel}>
                                            <Link to={'/apis/' + api.id + '/sdk'} className={classes.linkToTest}>
                                                <Button size='small' color='primary'>
                                                    <FormattedMessage
                                                        id='Apis.Details.Overview.sdk.generation.show.more'
                                                        defaultMessage='Show More >>'
                                                    />
                                                </Button>
                                            </Link>
                                        </ExpansionPanelActions>
                                    </ExpansionPanel>
                                </Grid>
                            )}
                        </React.Fragment>
                    )}
                    <Grid item xs={12} lg={6}>
                        <ExpansionPanel defaultExpanded>
                            <ExpansionPanelSummary>
                                <CustomIcon
                                    strokeColor={theme.palette.secondary.main}
                                    className={classes.iconClass}
                                    width={24}
                                    height={24}
                                    icon='docs'
                                />

                                <Typography className={classes.heading} variant='h6'>
                                    <FormattedMessage
                                        id='Apis.Details.Overview.documents.title'
                                        defaultMessage='Documents'
                                    />
                                </Typography>
                            </ExpansionPanelSummary>
                            <ExpansionPanelDetails
                                classes={{ root: classNames({ [classes.noDocumentRoot]: totalComments === 0 }) }}
                            >
                                <Grid container className={classes.root} spacing={2}>
                                    <OverviewDocuments apiId={api.id} />
                                </Grid>
                            </ExpansionPanelDetails>
                        </ExpansionPanel>
                    </Grid>
                </Grid>
            )}
        </ApiContext.Consumer>
    );
}

Overview.propTypes = {
    classes: PropTypes.instanceOf(Object).isRequired,
    theme: PropTypes.instanceOf(Object).isRequired,
};

export default withStyles(styles, { withTheme: true })(Overview);
