import { describe, it, expect, Experimental } from 'vitest';
import { createCategoryFilter, Event, getEarliestEvent, countEventsByCategory } from './events.js';

describe('Diagnostic Grid: Fragment Filtering Protocol', () => {
    // Mission 1: Verify the fragment filtering logic
    it('should filter events correctly by category', () => {
        // 1. Arrange (Given): Create a sample dataset of test fragments
        const mockEvents = [
            new Event({ id: 101, title: 'Test Rocket', year: 2000, category: 'space', description: 'Test', sourceUrl: '' }),
            new Event({ id: 102, title: 'Test Engine', year: 1800, category: 'transport', description: 'Test', sourceUrl: '' }),
            new Event({ id: 103, title: 'Test Satellite', year: 1990, category: 'space', description: 'Test', sourceUrl: '' }),
        ];

        // 2. Act (When): Run the filter for category 'space'
        let spaceFilter = createCategoryFilter("space");
        let spaceEvents = spaceFilter(mockEvents);

        // 3. Assert (Then): Verify the filtered results
        // quantity test:
        expect(spaceEvents).toHaveLength(2);
        // identity test: 
        expect(spaceEvents.every(event => event.category === "space")).toBe(true);
    });
});

describe('Diagnostic Grid: Temporal Analytics Protocol', () => {
    // Mission 2: Utility Verification & Edge Cases
    describe('getEarliestEvent', () => {
        it('identifies the event with the earliest chronological year', () => {
            // TODO: Arrange sample events with varying years, act, and assert
            // Arrange:
            const mockEvents = [
                new Event({ id: 101, title: 'Test Rocket', year: -2500, category: 'space', description: 'Test', sourceUrl: '' }),
                new Event({ id: 102, title: 'Test Engine', year: 1450, category: 'transport', description: 'Test', sourceUrl: '' }),
                new Event({ id: 103, title: 'Test Satellite', year: 1969, category: 'information', description: 'Test', sourceUrl: '' }),
            ] 

            // act:
            let earliestEvent = getEarliestEvent(mockEvents);

            // assert
            expect(earliestEvent.year).toEqual(-2500)
        });

        it('handles an empty archive gracefully', () => {
            // TODO: Act on an empty array [] and assert the expected outcome
            // arrange
            const mockEvents = []
            
            // act
            let earliestEvent = getEarliestEvent(mockEvents); 

            // assert
            expect(earliestEvent).toBeUndefined();
        });
    });

    describe('countEventsByCategory', () => {
        it('tallies event counts across all categories accurately', () => {
            // TODO: Arrange sample events, act, and assert category count object with toEqual()
            const mockEvents = [
                new Event({ id: 101, title: 'Test Rocket', year: 2000, category: 'space', description: 'Test', sourceUrl: '' }),
                new Event({ id: 102, title: 'Test Engine', year: 1800, category: 'transport', description: 'Test', sourceUrl: '' }),
                new Event({ id: 103, title: 'Test Satellite', year: 1990, category: 'space', description: 'Test', sourceUrl: '' }),
                new Event({ id: 103, title: 'Test writing quill', year: 1000, category: 'transport', description: 'Test', sourceUrl: '' }),
            ];

            // act
            let counts = countEventsByCategory(mockEvents);


            // assert
            expect(counts).toEqual(
                {
                    "space": 2,
                    "transport": 2,
                }
            )
        });

        it('returns an empty object when the archive is empty', () => {
            // TODO: Act on [] and assert toEqual({})
            // arranage
            let emptyEvents = []

            // act
            let emptyCounts = countEventsByCategory(emptyEvents)
            
            // assert
            expect(emptyCounts).toEqual({})
        });
    });
});

