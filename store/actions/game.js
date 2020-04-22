import {
    STORE_PROGRESS,
    CHANGE_SCENE,
    CHOOSE_INTERVIEW_OPTION,
    CHOOSE_ARTICLE_TOPIC
} from 'store/constants/game';

export function storeProgress(progress) {
    return { type: STORE_PROGRESS, progress };
}

export function changeScene(sceneId) {
    return { type: CHANGE_SCENE, sceneId };
}

export function chooseInterviewOption(optionId) {
    return { type: CHOOSE_INTERVIEW_OPTION, optionId };
}

export function chooseArticleTopic(topicId) {
    return { type: CHOOSE_ARTICLE_TOPIC, topicId };
}
