// src/utils/helpers.ts

export function formatDate(date: Date): string {
    return date.toISOString().split('T')[0];
}

export function validateInput(input: string): boolean {
    return input.trim().length > 0;
}

// Additional utility functions can be added here.