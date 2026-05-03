const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api/v1';

export async function apiFetch<T>(
    endpoint: string,
    options: RequestInit = {}
): Promise<T> {
    const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
    
    const headers = {
        'Content-Type': 'application/json',
        ...(token ? { 'Authorization': `Bearer ${token}` } : {}),
        ...options.headers,
    } as Record<string, string>;

    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
        ...options,
        headers,
    });

    if (!response.ok) {
        let errorData;
        try {
            errorData = await response.json();
        } catch (e) {
            errorData = { detail: 'An unexpected error occurred' };
        }
        
        if (response.status === 401 && typeof window !== 'undefined') {
            localStorage.removeItem('token');
            localStorage.removeItem('refresh_token');
            window.location.href = '/login';
        }

        throw new Error(errorData.detail || response.statusText);
    }

    if (response.status === 204) {
        return {} as T;
    }

    return response.json();
}

export const api = {
    get: <T>(endpoint: string, options?: RequestInit) => 
        apiFetch<T>(endpoint, { ...options, method: 'GET' }),
    post: <T>(endpoint: string, data: any, options?: RequestInit) => 
        apiFetch<T>(endpoint, { ...options, method: 'POST', body: JSON.stringify(data) }),
    patch: <T>(endpoint: string, data: any, options?: RequestInit) => 
        apiFetch<T>(endpoint, { ...options, method: 'PATCH', body: JSON.stringify(data) }),
    put: <T>(endpoint: string, data: any, options?: RequestInit) => 
        apiFetch<T>(endpoint, { ...options, method: 'PUT', body: JSON.stringify(data) }),
    delete: <T>(endpoint: string, options?: RequestInit) => 
        apiFetch<T>(endpoint, { ...options, method: 'DELETE' }),
};
