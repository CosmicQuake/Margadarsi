const API_BASE = 'http://127.0.0.1:8000/api';

export async function fetchApi<T>(endpoint: string, options?: RequestInit): Promise<T> {
  const url = `${API_BASE}${endpoint}`;
  try {
    const res = await fetch(url, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...(options?.headers || {})
      }
    });
    if (!res.ok) {
      throw new Error(`API error ${res.status}: ${res.statusText}`);
    }
    return await res.json();
  } catch (err) {
    console.warn(`[P4 API] Offline or endpoint error for ${endpoint}:`, err);
    throw err;
  }
}

export const api = {
  getHealth: () => fetchApi<{ status: string }>('/health'),
  getFamilies: () => fetchApi<any[]>('/families'),
  getFamilyById: (id: string) => fetchApi<any>(`/families/${id}`),
  submitSurvey: (data: any) => fetchApi<any>('/surveys', { method: 'POST', body: JSON.stringify(data) }),
  getPovertyScore: (id: string) => fetchApi<any>(`/poverty-score/${id}`),
  getNeeds: (familyId?: string) => fetchApi<any[]>(`/needs${familyId ? `?family_id=${familyId}` : ''}`),
  createNeed: (data: any) => fetchApi<any>('/needs', { method: 'POST', body: JSON.stringify(data) }),
  getSchemes: () => fetchApi<any[]>('/schemes'),
  performSchemeAction: (data: any) => fetchApi<any>('/schemes/action', { method: 'POST', body: JSON.stringify(data) }),
  getMentors: () => fetchApi<any[]>('/mentors'),
  getMatch: (familyId: string) => fetchApi<any>(`/matches/${familyId}`),
  adoptFamily: (data: any) => fetchApi<any>('/adoptions', { method: 'POST', body: JSON.stringify(data) }),
  getMilestones: (familyId: string) => fetchApi<any[]>(`/milestones/${familyId}`),
  getEscrow: () => fetchApi<any[]>('/escrow'),
  releaseEscrow: (data: any) => fetchApi<any>('/escrow/release', { method: 'POST', body: JSON.stringify(data) }),
  verifyEvidence: (data: any) => fetchApi<any>('/evidence/verify', { method: 'POST', body: JSON.stringify(data) }),
  getFraudAlerts: () => fetchApi<any[]>('/fraud'),
  performFraudAction: (data: any) => fetchApi<any>('/fraud/action', { method: 'POST', body: JSON.stringify(data) }),
  getVendors: () => fetchApi<any[]>('/vendors'),
  getVendorOrders: () => fetchApi<any[]>('/vendors/orders'),
  getGrievances: () => fetchApi<any[]>('/grievances'),
  createGrievance: (data: any) => fetchApi<any>('/grievances', { method: 'POST', body: JSON.stringify(data) }),
  performGrievanceAction: (data: any) => fetchApi<any>('/grievances/action', { method: 'POST', body: JSON.stringify(data) }),
  getGisMarkers: () => fetchApi<any[]>('/gis/markers'),
  getPredictiveRisks: () => fetchApi<any[]>('/analytics/predictive-risks'),
  predictFamilyRisk: (familyId: string) => fetchApi<any>(`/analytics/predict/${familyId}`, { method: 'POST' }),
  getAuditLogs: () => fetchApi<any[]>('/audit'),
  getNotifications: () => fetchApi<any[]>('/notifications'),
  processVoiceQuery: (data: any) => fetchApi<any>('/voice', { method: 'POST', body: JSON.stringify(data) }),
  runCompleteDemo: () => fetchApi<any>('/demo/run-complete', { method: 'POST' })
};
