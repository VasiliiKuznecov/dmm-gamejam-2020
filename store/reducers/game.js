/* eslint-disable max-len */
import { handleActions } from 'redux-actions';

import {
    STORE_PROGRESS,
    CHANGE_SCENE,
    CHOOSE_INTERVIEW_OPTION,
    CHOOSE_ARTICLE_TOPIC
} from 'store/constants/game';
import { getCurrentScene } from 'store/selectors/game';

function storeProgress(state, action) {
    return { ...state, progress: action.progress };
}

function changeScene(state, action) {
    let { sceneId } = action;

    if (!sceneId) {
        const currentSceneId = state.progress.sceneId;
        const currentSceneIndex = state.scenes.findIndex(item => item.id === currentSceneId);
        const newScene = state.scenes[currentSceneIndex + 1];

        sceneId = newScene.id;
    }

    return {
        ...state,
        progress: {
            ...state.progress,
            sceneId
        }
    };
}

function chooseInterviewOption(state, action) {
    const { optionId } = action;
    const currentScene = getCurrentScene(state);
    const option = currentScene.interview.options.find(item => item.id === optionId);
    let interviewProgress = state.progress.interviews[currentScene.id];

    if (!interviewProgress) {
        interviewProgress = {
            topics: [],
            usedOptions: [],
            reply: {}
        };
    }

    const { topics, usedOptions } = interviewProgress;

    return {
        ...state,
        progress: {
            ...state.progress,
            interviews: {
                ...state.progress.interviews,
                [currentScene.id]: {
                    ...interviewProgress,
                    topics: [...topics, ...(option.reply.topics || [])],
                    usedOptions: [...usedOptions, option.id],
                    reply: option.reply
                }
            }
        }
    };
}

function chooseArticleTopic(state, action) {
    const { topicId } = action;
    const currentScene = getCurrentScene(state);
    let articleProgress = state.progress.articles[currentScene.id];

    if (!articleProgress) {
        articleProgress = {
            usedTopics: [],
            views: 0
        };
    }

    const { usedTopics } = articleProgress;

    const newUsedTopics = usedTopics.includes(topicId) ?
        usedTopics.filter(item => item !== topicId) :
        [...usedTopics, topicId];

    if (newUsedTopics.length > 2) {
        return state;
    }

    return {
        ...state,
        progress: {
            ...state.progress,
            articles: {
                ...state.progress.articles,
                [currentScene.id]: {
                    ...articleProgress,
                    usedTopics: newUsedTopics
                }
            }
        }
    };
}

export default handleActions(
    {
        [STORE_PROGRESS]: storeProgress,
        [CHANGE_SCENE]: changeScene,
        [CHOOSE_INTERVIEW_OPTION]: chooseInterviewOption,
        [CHOOSE_ARTICLE_TOPIC]: chooseArticleTopic
    },
    {
        scenes: [
            {
                id: 'start',
                type: 'story',
                scene: {
                    backgroundColor: '#ccdde8',
                    text: 'Вы новый корреспондент программы <mark>"Время"</mark>. Просмотров у вашего СМИ все меньше, поэтому руководство просит делать новости как можно более скандальными.'
                },
                options: [
                    {
                        text: 'Хорошо, мне нужна эта работа'
                        // Можно задать след сцену: nextSceneId: 'first-interview'
                    }
                ]
            },
            {
                id: 'first-interview-start',
                type: 'story',
                scene: {
                    backgroundImage: 'https://jrnlst.ru/sites/default/files/covers/shutterstock_398015416.jpg',
                    text: 'Вы проводите интервью с известным певцом. У него загруженный график, поэтому времени вам хватит всего на 3 вопроса.'
                },
                options: [
                    {
                        text: 'Я готов'
                    },
                    {
                        text: 'Я вытяну из него самое интересное!'
                    }
                ]
            },
            {
                id: 'first-interview',
                type: 'interview',
                scene: {
                    backgroundImage: 'https://jrnlst.ru/sites/default/files/covers/shutterstock_398015416.jpg'
                },
                options: [
                    {
                        text: 'Закончить интервью'
                    }
                ],
                interview: {
                    optionsLimit: 3,
                    person: {
                        name: 'Певец',
                        color: '#00f'
                    },
                    options: [
                        {
                            id: 'when-new-album',
                            text: 'Когда выйдет новый альбом?',
                            reply: {
                                text: 'Думаю, через месяц',
                                topics: [
                                    {
                                        id: 'new-album',
                                        text: 'Скоро выйдет новый альбом'
                                    }
                                ]
                            }
                        },
                        {
                            id: 'what-about-new-album',
                            text: 'А про что будет новый альбом?',
                            neededTopics: ['new-album'],
                            reply: {
                                text: 'Про то, чем живут реперы',
                                topics: [
                                    {
                                        id: 'album-about-rappers',
                                        text: 'Альбом будет про реперов'
                                    }
                                ]
                            }
                        },
                        {
                            id: 'do-you-write-yourself',
                            text: 'Вы сами пишите слова для альбома?',
                            neededTopics: ['new-album'],
                            reply: {
                                text: 'Нет, я только исполнитель',
                                topics: [
                                    {
                                        id: 'only-singer',
                                        text: 'Он только исполнитель'
                                    },
                                    {
                                        id: 'others-text',
                                        text: 'Текст пишут за него'
                                    }
                                ]
                            }
                        },
                        {
                            id: 'how-much',
                            text: 'Сколько вы зарабатываете?',
                            reply: {
                                text: 'Ну, достаточно',
                                topics: [
                                    {
                                        id: 'enough-money',
                                        text: 'Зарабатывает достаточно'
                                    }
                                ]
                            }
                        },
                        {
                            id: 'do-you-know-pushin',
                            text: 'Вы знаете Андрея Пушина?',
                            reply: {
                                text: 'Кого?',
                                topics: [
                                    {
                                        id: 'doesnt-know-pushin',
                                        text: 'Не знает Пушина'
                                    }
                                ]
                            }
                        },
                        {
                            id: 'why-music',
                            text: 'Почему вы решили заняться музыкой?',
                            reply: {
                                text: 'Это идея моего брата',
                                topics: [
                                    {
                                        id: 'brothers-idea',
                                        text: 'Идея брата'
                                    }
                                ]
                            }
                        }
                    ]
                }
            },
            {
                id: 'first-article',
                type: 'article',
                interviewId: 'first-interview',
                scene: {
                    backgroundImage: 'https://storage.tpu.ru/common/2018/03/30/Po75sCv8.jpg',
                    text: 'Пора написать первую статью по собранным данным! Нужно выбрать 2 темы, на которых я сконцентрируюсь'
                },
                options: [
                    {
                        text: 'Закончить статью'
                    }
                ]
            },
            {
                id: 'first-article-results',
                type: 'article-results',
                articleId: 'first-article',
                scene: {
                    backgroundImage: 'https://storage.tpu.ru/common/2018/03/30/Po75sCv8.jpg',
                    text: 'Сколько же просмотров собрала моя первая новость?'
                },
                articleResults: {
                    baseViews: 23,
                    bonuses: [
                        {
                            topics: ['album-about-rappers'],
                            text: 'Кажется, всем надоели песни про жизнь реперов',
                            views: 2,
                            type: 'low'
                        },
                        {
                            topics: ['brothers-idea'],
                            text: 'Пара человек удивилась: "Ого, у него есть брат"',
                            views: 2,
                            type: 'low'
                        },
                        {
                            topics: ['new-album'],
                            text: 'Вы пишите, что певец скоро выпустит новый альбом',
                            views: 11,
                            type: 'low'
                        },
                        {
                            topics: ['only-singer'],
                            text: 'Вы пиште, что он только поет, но, кажется, это никому не интересно',
                            views: 14,
                            type: 'low'
                        },
                        {
                            topics: ['doesnt-know-pushin'],
                            text: 'С того, что певец не знает Пушина, кекнуло несколько человек с МатМеха',
                            views: 27,
                            type: 'middle'
                        },
                        {
                            topics: ['others-text'],
                            text: 'Вы акцентируете внимание на том, что текст певец написал не сам',
                            views: 56,
                            type: 'middle'
                        },
                        {
                            topics: ['enough-money'],
                            text: 'Вы приукрашиваете понятие "зарабатывает достаточно денег"',
                            views: 49,
                            type: 'middle'
                        },
                        {
                            topics: ['brothers-idea', 'new-album'],
                            text: 'Вы немного изменяете формулировку и получается, что это его брат придумал идею для нового альбома.',
                            views: 45,
                            type: 'middle'
                        },
                        {
                            topics: ['enough-money', 'others-text'],
                            text: 'Вы пишите, что у певца достаточно денег, чтобы не писать тексты самому',
                            views: 313,
                            type: 'high'
                        }
                    ]
                }
            }
        ],
        progress: {
            sceneId: 'start',
            interviews: {
                'first-interview': {
                    usedOptions: [],
                    topics: [],
                    reply: {}
                }
            },
            articles: {
                'first-article': {
                    usedTopics: []
                }
            }
        }
    }
);
