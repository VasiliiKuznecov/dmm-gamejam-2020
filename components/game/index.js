/* eslint-disable react/prop-types */
import React, { Component } from 'react';
import { block } from 'bem-cn';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { storeProgress, changeScene } from 'store/actions/game';
import { getCurrentScene } from 'store/selectors/game';

import Article from 'components/article';
import ArticleResults from 'components/article-results';
import Interview from 'components/interview';
import Text from 'components/text';

import Button from '@material-ui/core/Button';

import './index.scss';

const b = block('game');

class Game extends Component {
    // eslint-disable-next-line complexity
    render() {
        const { scene, options, type } = this.props.sceneData;
        const { backgroundColor, backgroundImage, text } = scene;

        const style = {
            backgroundImage: `url(${backgroundImage})`,
            backgroundColor
        };

        return (
            <div className={b()} style={style}>
                {text && (
                    <div className={b('text')}>
                        <Text>
                            <span dangerouslySetInnerHTML={{ __html: text }} />
                        </Text>
                    </div>
                )}
                {type === 'interview' && <Interview />}
                {type === 'article' && <Article />}
                {type === 'article-results' && <ArticleResults />}
                <div className={b('options')}>
                    {options && options.map(option => {
                        return (
                            <Button
                                key={option.text}
                                variant="contained"
                                color="primary"
                                onClick={this._onOptionClick(option)}
                                >
                                {option.text}
                            </Button>
                        );
                    })}
                </div>
            </div>
        );
    }

    _onOptionClick = option => () => {
        this.props.changeScene(option.nextSceneId);
    }
}

function mapStateToProps(state) {
    return {
        sceneData: getCurrentScene(state.game)
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        storeProgress,
        changeScene
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Game);
