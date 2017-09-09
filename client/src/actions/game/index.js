export * from './default';
export * from './newSeason';

export function selectGameTab(n) {
	return { type: 'SELECT_GAME_TAB', tab: n };
}