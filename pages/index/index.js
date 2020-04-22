import React from 'react';
import { block } from 'bem-cn';
import Head from 'next/head';

import Game from 'components/game';

import './index.scss';

const b = block('index-page');

export default class IndexPage extends React.Component {
    render() {
        return (
            <div className={b()}>
                <Head>
                    <title>Время</title>
                </Head>
                <Game />
            </div>
        );
    }
}
