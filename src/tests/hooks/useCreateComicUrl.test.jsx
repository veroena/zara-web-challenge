import { renderHook } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { useCreateComicURL } from '../../hooks/useCreateComicURL';

describe('useCreateComicURL', () => {
  it('returns a valid url for fetching comics from the Marvel API', () => {
    const characterId = 99999;
    const publicKey = import.meta.env.VITE_PUBLIC_KEY;
    const url = renderHook(() => useCreateComicURL(characterId));

    expect(url.result.current).toContain(characterId);
    expect(url.result.current).toContain(publicKey);
  });
})
