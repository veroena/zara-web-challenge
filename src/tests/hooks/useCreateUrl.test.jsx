import { renderHook } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { useCreateURL } from '../../hooks/useCreateURL';

describe('useCreateComicURL', () => {

  it('returns a valid url for fetching list of characters from the Marvel API', () => {
    const characterName = 'storm'
    const url = renderHook(() => useCreateURL());

    expect(url.result.current).not.toContain(characterName);
  });
  
  it('returns a valid url for fetching character information from the Marvel API', () => {
    const characterName = 'storm'
    const url = renderHook(() => useCreateURL(characterName));

    expect(url.result.current).toContain(characterName);
  });
});
