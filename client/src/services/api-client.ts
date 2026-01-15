import { hostUrl } from '@/services/const';

type FetchOptions = RequestInit & {
    // Add custom options here if needed in the future
};

export async function fetchClient<T = any>(endpoint: string, options: FetchOptions = {}): Promise<T> {
    const { headers, ...rest } = options;

    const defaultHeaders: HeadersInit = {
        'Content-Type': 'application/json',
        ...headers,
    };

    const url = `${hostUrl}${endpoint}`;

    const response = await fetch(url, {
        ...rest,
        headers: defaultHeaders,
    });

    if (!response.ok) {
        const errorBody = await response.json().catch(() => ({}));

        if (response.status === 401) {
            console.log('Token expired or unauthorized');
            // Handle logout or refresh token logic here
        }

        throw new Error(errorBody.message || 'Network error');
    }

    return response.json();
}
