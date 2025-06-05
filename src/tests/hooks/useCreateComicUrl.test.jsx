import { renderHook } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { useCreateComicURL } from '../../hooks/useCreateComicURL';

describe('useCreateComicURL', () => {
	it('returns a valid url for fetching comics from the Marvel API', () => {
		const characterId = 99999;
		const publicKey = 'fed39f81ba3c865cc68774567de288d7';
		const url = renderHook(() => useCreateComicURL(characterId));

		expect(url.result.current).toContain(characterId);
		expect(url.result.current).toContain(publicKey);
	});
});
