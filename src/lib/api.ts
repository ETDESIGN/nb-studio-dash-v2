
import { DashboardData } from '../types';

const API_ENDPOINT = 'http://localhost:3002/api/dashboard';

export const fetchDashboardData = async (): Promise<DashboardData> => {
  try {
    const response = await fetch(API_ENDPOINT);
    
    if (!response.ok) {
      throw new Error(`Uplink Error: ${response.status} ${response.statusText}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error("Connection to Mission Control Backend failed:", error);
    throw error;
  }
};
