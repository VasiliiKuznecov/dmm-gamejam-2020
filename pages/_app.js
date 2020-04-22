import React from 'react';
import App, { Container } from 'next/app';

import { Provider } from 'react-redux';
import withRedux from 'next-redux-wrapper';
import JssProvider from 'react-jss/lib/JssProvider';

import getPageContext from 'helpers/getPageContext';

import { MuiThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';

import createStore from 'store';

import Fonts from 'components/fonts';

class CustomApp extends App {
    pageContext = getPageContext()

    static async getInitialProps({ Component, ctx }) {
        let pageProps = {};

        if (Component.getInitialProps) {
            pageProps = await Component.getInitialProps({ ctx });
        }

        return { pageProps };
    }

    componentDidMount() {
        // Remove the server-side injected CSS.
        const jssStyles = document.querySelector('#jss-server-side');

        if (jssStyles && jssStyles.parentNode) {
            jssStyles.parentNode.removeChild(jssStyles);
        }
    }

    render() {
        const { Component, pageProps, store } = this.props;

        return (
            <Container>
                {/* Wrap every page in Jss and Theme providers */}
                <JssProvider
                    registry={this.pageContext.sheetsRegistry}
                    generateClassName={this.pageContext.generateClassName}
                    >
                    {/* MuiThemeProvider makes the theme available down the React
                    tree thanks to React context. */}
                    <MuiThemeProvider
                        theme={this.pageContext.theme}
                        sheetsManager={this.pageContext.sheetsManager}
                        >
                        <Provider store={store}>
                            <Fonts />
                            <CssBaseline />
                            <Component pageContext={this.pageContext} {...pageProps} />
                        </Provider>
                    </MuiThemeProvider>
                </JssProvider>
            </Container>
        );
    }
}

export default withRedux(createStore)(CustomApp);
