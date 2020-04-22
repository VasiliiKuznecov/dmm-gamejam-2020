// eslint-disable-next-line import/prefer-default-export
export function getCurrentScene(state) {
    const { sceneId } = state.progress;

    return state.scenes.find(item => item.id === sceneId);
}
