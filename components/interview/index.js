/* eslint-disable react/prop-types */
import React, { Component } from 'react';
import { block } from 'bem-cn';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { chooseInterviewOption } from 'store/actions/game';
import { getCurrentScene } from 'store/selectors/game';

import Text from 'components/text';

import Button from '@material-ui/core/Button';

import './index.scss';

const b = block('interview');

class Interview extends Component {
    render() {
        const { interview, interviewProgress } = this.props;
        const { person, options } = interview;
        const { usedOptions = [], topics = [], reply = {} } = interviewProgress;

        const availableOptions = (options || []).filter(option => {
            const isOpened = !option.neededTopics ||
                option.neededTopics.every(topic => topics.some(item => item.id === topic));
            const isUsed = usedOptions.includes(option.id);

            return isOpened && !isUsed;
        });

        const canChooseOption = usedOptions.length < interview.optionsLimit;

        return (
            <div className={b()}>
                <div className={b('options-count')}>
                    <Text>
                        Задано вопросов: {usedOptions.length} из {interview.optionsLimit}
                    </Text>
                </div>
                <div className={b('dialog')}>
                    <div className={b('options')}>
                        {canChooseOption && availableOptions.map(option => {
                            return (
                                <Button
                                    key={option.text}
                                    variant="contained"
                                    color="secondary"
                                    onClick={this._onOptionClick(option)}
                                    >
                                    {option.text}
                                </Button>
                            );
                        })}
                    </div>
                    {reply.text && (
                        <div className={b('reply')}>
                            <Text>
                                <span className={b('person')} style={{ color: person.color }}>
                                    {person.name}:
                                </span>
                                {' '}
                                {reply.text}
                            </Text>
                        </div>
                    )}
                </div>
            </div>
        );
    }

    _onOptionClick = option => () => {
        this.props.chooseInterviewOption(option.id);
    }
}

function mapStateToProps(state) {
    const scene = getCurrentScene(state.game);
    const interviewProgress = state.game.progress.interviews[scene.id] || {};

    return {
        interview: scene.interview,
        interviewProgress
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        chooseInterviewOption
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Interview);
