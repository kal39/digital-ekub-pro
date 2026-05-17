const BASE_URL = 'http://localhost:8080/api';

export interface EkubProfile {
  id: number;
  name: string;
  contributionPool: string;
  balance: number;
  trustScore: number;
  nextPaymentDate: string;
  isActive: boolean;
}

export const ekubApiService = {
  // Fetches current member details safely
  async getProfile(): Promise<EkubProfile> {
    const res = await fetch(`${BASE_URL}/member/profile`);
    if (!res.ok) throw new Error('Failed to retrieve server data profile.');
    return res.json();
  },

  // Triggers emergency account lockdown routines
  async triggerEmergencyFreeze(memberId: number, reason: string): Promise<{ status: string; message: string }> {
    const res = await fetch(`${BASE_URL}/emergency-freeze`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ memberId, reason }),
    });
    if (!res.ok) throw new Error('Failed to transmit critical security instructions.');
    return res.json();
  }
};