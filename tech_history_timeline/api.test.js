import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { fetchWikipediaSummary } from './api.js';

describe('Diagnostic Grid: Wikipedia Archive Service (Mocked)', () => {
    beforeEach(() => {
        // Clear or reset mocks before each diagnostic run
        vi.restoreAllMocks();
    });

    afterEach(() => {
        vi.restoreAllMocks();
    });

    it('successfully retrieves and extracts fragment summary on HTTP 200', async () => {
        // 1. Arrange: Mock a successful fetch response
        const mockPayload = {
            title: 'Apollo 11',
            extract: 'First crewed mission to land on the Moon in 1969.',
            thumbnail: { source: 'https://archive.org/apollo11.jpg' }
        };

        // TODO: Spy on globalThis.fetch and mock a resolved response:
        vi.spyOn(globalThis, 'fetch').mockResolvedValueOnce({
             ok: true,
             json: async () => mockPayload
            });

        // 2. Act: Call fetchWikipediaSummary('Apollo_11')
        let response = await fetchWikipediaSummary("Apollo 11")

        // 3. Assert:
        // - Verify fetch was called with the expected Wikipedia endpoint URL
        // - Verify the returned object matches the extracted fields
        expect(fetch).toHaveBeenCalledWith("https://en.wikipedia.org/api/rest_v1/page/summary/Apollo 11")
        expect(response).toEqual({
            title: 'Apollo 11',
            extract: 'First crewed mission to land on the Moon in 1969.',
            thumbnail: 'https://archive.org/apollo11.jpg'
        })
    });

    it('throws a specific 404 error when the fragment does not exist', async () => {
        // 1. Arrange: Mock a 404 response
        vi.spyOn(globalThis, 'fetch').mockResolvedValueOnce({
             ok: false,
             status: 404
         });

        // 2. Act & 3. Assert:
        // Verify that fetchWikipediaSummary('Nonexistent_Topic') rejects with the expected error message:
        await expect(fetchWikipediaSummary('Nonexistent_Topic'))
            .rejects.toThrow("Fragment not found in Wikipedia archives (404).");
    });

    it('handles deep network transmission failure', async () => {
        // 1. Arrange: Mock fetch rejecting with a network error
        vi.spyOn(globalThis, 'fetch').mockRejectedValueOnce(new Error('Network offline'));

        // 2. Act & 3. Assert:
        // Verify that fetchWikipediaSummary rejects with 'Network offline'
        await expect(fetchWikipediaSummary("any title")).rejects.toThrow("Network offline");
    });
});
