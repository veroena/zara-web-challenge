import { renderHook } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { useHandleFavorite } from '../../hooks/useHandleFavorite';

describe('useHandleFavorite', () => {
  it('returns an object containing a function', () => {
    const returnedFunction = renderHook(() => useHandleFavorite());
    
    expect(returnedFunction.result.current).toBeTypeOf('object');
    expect(returnedFunction.result.current.handleFavorite).toBeTypeOf('function');
	});
});