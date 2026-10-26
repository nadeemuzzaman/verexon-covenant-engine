// ============================================================
// Covenant Service — Data Access Layer
// ============================================================
// This is the ONLY file you modify when connecting to your backend.
// Queries (queries.ts) and components import from here — they never change.
//
// Pick your pattern and replace the function bodies below:
//
// 1. Server Actions + ORM (Prisma / Drizzle / Supabase)
//    → Add 'use server' at the top of this file
//    → Call your ORM directly in each function
//
// 2. Route Handlers + ORM
//    → import { apiClient } from '@/lib/api-client'
//    → return apiClient<CovenantsResponse>('/covenants?...')
//    → Replace mock calls in route handlers (src/app/api/covenants/) with ORM
//
// 3. BFF — Route Handlers proxy to external backend (Laravel, Go, etc.)
//    → import { apiClient } from '@/lib/api-client'
//    → return apiClient<CovenantsResponse>('/covenants?...')
//    → Route handlers proxy requests to your external backend service
//
// 4. Direct external API (frontend-only, no Next.js backend)
//    → const res = await fetch('https://your-api.com/covenants?...')
//    → return res.json()
//
// Current: Mock (in-memory fake data for demo/prototyping)
// ============================================================

import { fakeCovenants } from '@/constants/mock-api-covenants';
import type {
  CovenantFilters,
  CovenantsResponse,
  CovenantByIdResponse,
  CovenantMutationPayload
} from './types';

export async function getCovenants(filters: CovenantFilters): Promise<CovenantsResponse> {
  return fakeCovenants.getCovenants(filters);
}

export async function getCovenantById(id: number): Promise<CovenantByIdResponse> {
  return fakeCovenants.getCovenantById(id) as Promise<CovenantByIdResponse>;
}

export async function createCovenant(data: CovenantMutationPayload) {
  return fakeCovenants.createCovenant(data);
}

export async function updateCovenant(id: number, data: CovenantMutationPayload) {
  return fakeCovenants.updateCovenant(id, data);
}

export async function deleteCovenant(id: number) {
  return fakeCovenants.deleteCovenant(id);
}
