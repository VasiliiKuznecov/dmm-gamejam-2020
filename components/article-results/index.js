/* eslint-disable react/prop-types */
import React, { Component } from 'react';
import { block } from 'bem-cn';

import { connect } from 'react-redux';

import { getCurrentScene } from 'store/selectors/game';

import Text from 'components/text';

import './index.scss';

const b = block('article-results');

class ArticleResults extends Component {
    render() {
        const { articleResults, articleProgress } = this.props;
        const { usedTopics } = articleProgress;

        const bonuses = articleResults.bonuses.filter(bonus => {
            return bonus.topics.every(topic => usedTopics.includes(topic));
        });
        const views = bonuses.reduce((sum, bonus) => {
            return sum + bonus.views;
        }, articleResults.baseViews);

        return (
            <div className={b()}>
                <div className={b('base-views')}>
                    <Text>
                        Людей, которые в любом случае посмотрели бы новость:
                        {' '}{articleResults.baseViews}
                    </Text>
                </div>
                <div className={b('bonuses')}>
                    {bonuses.map(bonus => {
                        return (
                            <div key={bonus.text} className={b('bonus')}>
                                <Text theme={bonus.type}>
                                    +{bonus.views} просмотров: {bonus.text}
                                </Text>
                            </div>
                        );
                    })}
                </div>
                <div className={b('views')}>
                    <Text>
                        Всего просмотров: {views}
                    </Text>
                </div>
            </div>
        );
    }

    _onTopicClick = topic => () => {
        this.props.chooseArticleTopic(topic.id);
    }
}

function mapStateToProps(state) {
    const scene = getCurrentScene(state.game);
    const { articleResults } = scene;
    const articleProgress = state.game.progress.articles[scene.articleId] || {};

    return {
        articleResults,
        articleProgress
    };
}

export default connect(mapStateToProps)(ArticleResults);
