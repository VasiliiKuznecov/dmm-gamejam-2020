/* eslint-disable react/prop-types */
import React, { Component } from 'react';
import { block } from 'bem-cn';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { chooseArticleTopic } from 'store/actions/game';
import { getCurrentScene } from 'store/selectors/game';

import Text from 'components/text';

import Button from '@material-ui/core/Button';

import './index.scss';

const b = block('article');

class Article extends Component {
    render() {
        const { interviewProgress, articleProgress } = this.props;
        const { topics } = interviewProgress;

        return (
            <div className={b()}>
                <Text>
                    <div className={b('topics')}>
                        {topics.map(topic => {
                            const isSelected = articleProgress.usedTopics.includes(topic.id);

                            return (
                                <Button
                                    key={topic.text}
                                    variant={isSelected ? 'contained' : 'outlined'}
                                    color="secondary"
                                    onClick={this._onTopicClick(topic)}
                                    >
                                    {topic.text}
                                </Button>
                            );
                        })}
                    </div>
                </Text>
            </div>
        );
    }

    _onTopicClick = topic => () => {
        this.props.chooseArticleTopic(topic.id);
    }
}

function mapStateToProps(state) {
    const scene = getCurrentScene(state.game);
    const interviewProgress = state.game.progress.interviews[scene.interviewId] || {};
    const articleProgress = state.game.progress.articles[scene.id] || {};

    return {
        interviewProgress,
        articleProgress
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        chooseArticleTopic
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Article);
