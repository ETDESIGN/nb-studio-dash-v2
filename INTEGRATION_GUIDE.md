
# NB Studio Mission Control: Integration Guide

**Version:** 1.0
**Target System:** OpenClaw / Custom Backend
**Framework:** React 19 / Next.js 16 / Tailwind CSS

---

## 1. System Overview

NB Studio Mission Control is a "Headless" Operational Dashboard. It is designed to be **agnostic** of your backend architecture. It serves two primary functions:

1.  **Visualization (Read):** It renders the state of your system based on a single, unified JSON data object.
2.  **Command (Write):** It issues commands (Halt Agent, Deploy, Reboot) via asynchronous function calls.

Currently, the application runs in **Simulation Mode** using `mockData.ts`. This guide details how to replace the simulation with your real-time system data.

---

## 2. The Data Contract

The dashboard expects a specific JSON structure to populate its widgets. Your backend must expose an API endpoint (e.g., `GET /api/mission-control/status`) that returns the following structure.

### 2.1 Core Types (`types.ts`)

Refer to `types.ts` for strict TypeScript definitions. Below is the JSON payload your backend needs to generate:

```json
{
  "uplinkTime": "2024-02-20T14:30:00.000Z",
  
  "stats": {
    "totalAgents": 12,
    "activeSessions": 4,
    "costToday": 1.25,
    "tokensToday": 450000,
    "tasksCompletedToday": 84
  },

  "systemHealth": {
    "cpu": 45.2,          // Percentage (0-100)
    "disk": 82,           // Percentage (0-100)
    "memory": {
      "used": 4096,       // MB
      "total": 16384,     // MB
      "percent": 25       // Percentage
    }
  },

  "services": {
    "openclawGateway": { "status": "running" }, // 'running' | 'stopped' | 'error'
    "costMonitor": { "status": "active" },
    "pulseUplink": { "status": "sending" }
  },

  "agents": [
    {
      "id": "agent-alpha",
      "name": "Architect_01",
      "role": "CTO",
      "model": "Gemini 1.5 Pro",
      "status": "working", // 'thinking' | 'idle' | 'offline' | 'error' | 'working'
      "task": "Refactoring API middleware...",
      "contextUsed": 80,   // kTokens
      "contextTotal": 128, // kTokens
      "contextBreakdown": { "system": 10, "user": 20, "rag": 60, "output": 10 },
      "tools": ["AWS", "Kubectl"],
      "color": "emerald"
    }
  ],

  "socialQueue": [
    { "day": 1, "title": "Launch Tweet", "type": "Twitter", "status": "Scheduled" }
  ],

  "vaultFiles": [
    { 
      "id": "f1", 
      "name": "logs.txt", 
      "type": "file", 
      "category": "doc", 
      "modified": "Today" 
    }
  ]
}
```

---

## 3. Connecting the "Read" Stream

The application uses **SWR (Stale-While-Revalidate)** for data fetching. This handles polling, caching, and revalidation automatically.

### Step 1: Create the API Client

Create a new file `src/lib/api.ts` (or similar) to handle the real fetch.

```typescript
// src/lib/api.ts
import { DashboardData } from '../types';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api';

export const fetchDashboardData = async (): Promise<DashboardData> => {
  const response = await fetch(`${API_URL}/dashboard`);
  
  if (!response.ok) {
    throw new Error('Failed to fetch mission control data');
  }
  
  return response.json();
};
```

### Step 2: Swap Mock for Real Data

In `App.tsx`, locate the `useSWR` hook and replace the fetcher.

**Before:**
```typescript
import { fetchMockData } from './mockData';

// ... inside App component
const { data } = useSWR('dashboard-data', fetchMockData, {
    refreshInterval: 2000, // Polls every 2 seconds
    fallbackData: INITIAL_DATA
});
```

**After:**
```typescript
import { fetchDashboardData } from './lib/api'; // Import your new real fetcher

// ... inside App component
const { data, error } = useSWR('/api/dashboard', fetchDashboardData, {
    refreshInterval: 5000, // Adjust polling rate as needed
    dedupingInterval: 2000,
});

if (error) return <ErrorScreen />; // Implement a basic error view
if (!data) return <LoadingScreen />;
```

---

## 4. Connecting the "Write" Stream (Actions)

The dashboard allows users to perform actions (e.g., stopping an agent, triggering a protocol). You need to wire these UI events to your backend.

### 4.1 Halt Agent

In `App.tsx`, look for `handleHaltAgent`.

```typescript
const handleHaltAgent = async (id: string) => {
    // 1. Optimistic UI Update (Optional): Visually stop the agent immediately
    notify('info', 'COMMAND SENT', `Halt signal sent to ${id}...`);

    try {
        // 2. Call your backend
        await fetch(`${API_URL}/agents/${id}/halt`, { method: 'POST' });
        
        notify('success', 'CONFIRMED', `Agent ${id} has stopped.`);
        
        // 3. Revalidate data to get fresh state
        mutate('/api/dashboard'); 
    } catch (err) {
        notify('error', 'FAILURE', `Could not halt agent: ${err.message}`);
    }
}
```

### 4.2 Protocol Triggers

In the `TasksView` component (inside `App.tsx`), the `handleTrigger` function controls task execution.

```typescript
const handleTrigger = async (id: number, name: string) => {
    // ... UI state logic ...
    
    // Replace the setTimeout simulation with a real API call
    try {
        const res = await fetch(`${API_URL}/protocols/trigger`, {
            method: 'POST',
            body: JSON.stringify({ protocolId: id })
        });
        
        // Handle streaming logs if your backend supports it (Server-Sent Events)
        // Or simply poll for status updates via the main loop
    } catch (e) {
        // Handle error
    }
};
```

---

## 5. Advanced: The "Pulse" Architecture

If you are following the **Local Heart, Cloud View** plan (using Vercel KV), your integration is even simpler.

1.  **Local Machine:** Runs the `scripts/pulse.js` (from the Improvement Plan) to push JSON files to Vercel KV.
2.  **Frontend:** Simply fetches from the Vercel KV endpoint.

No direct connection to the local machine is required for the *Frontend*. It simply reads the "State Cache" stored in the cloud.

---

## 6. Customization Guide

### 6.1 Adding New Widgets
1.  Create a component in `components/widgets/MyNewWidget.tsx`.
2.  Wrap it in `<WidgetFrame title="My Widget">...</WidgetFrame>`.
3.  Add it to the Grid layout in `DashboardView` within `App.tsx`.

### 6.2 Theming
The app uses Tailwind CSS classes.
*   **Colors:** Defined in `index.html` script tag under `tailwind.config`.
*   **Dark Mode:** Controlled by the `dark` class on the `<html>` element.

### 6.3 Icons
We use `lucide-react`. To add new icons, import them in `App.tsx`:
```typescript
import { NewIconName } from 'lucide-react';
```

---

## 7. Troubleshooting

*   **CORS Errors:** Ensure your backend sends `Access-Control-Allow-Origin: *` (or your specific frontend domain) headers.
*   **Charts Empty:** Ensure `generateChartData` in `mockData.ts` is replaced or that your backend provides `chartHistory` array in the main JSON payload.
*   **Hydration Errors:** If using Next.js SSR, ensure data fetching happens in `useEffect` or use `dynamic(() => import(...), { ssr: false })` for heavy client-side widgets like Recharts.
