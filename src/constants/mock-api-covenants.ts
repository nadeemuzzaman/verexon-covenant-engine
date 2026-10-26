////////////////////////////////////////////////////////////////////////////////
// 🛑 Nothing in here has anything to do with Nextjs, it's just a fake database
////////////////////////////////////////////////////////////////////////////////

import { faker } from '@faker-js/faker';
import { matchSorter } from 'match-sorter';

export const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export type CovenantOperator = '>=' | '<=' | '=';

export type Covenant = {
  id: number;
  client_name: string;
  facility_name: string;
  covenant_type: string;
  operator: CovenantOperator;
  threshold: number;
  frequency: string;
  next_test_date: string;
  last_tested_value: number | null;
  status: string;
  notes: string;
  created_at: string;
  updated_at: string;
};

const COVENANT_TYPES = [
  'Leverage Ratio',
  'Debt Service Coverage Ratio',
  'Current Ratio',
  'Net Worth Minimum',
  'EBITDA Minimum',
  'Interest Coverage Ratio'
];

const OPERATORS: CovenantOperator[] = ['>=', '<=', '='];
const FREQUENCIES = ['Monthly', 'Quarterly', 'Semi-Annual', 'Annual'];
const STATUSES = ['Compliant', 'Breach', 'Waived', 'Pending'];

function generateRandomCovenantData(id: number): Covenant {
  const covenantType = faker.helpers.arrayElement(COVENANT_TYPES);
  const operator = faker.helpers.arrayElement(OPERATORS);
  const status = faker.helpers.arrayElement(STATUSES);
  const threshold = parseFloat(faker.finance.amount({ min: 1, max: 5, dec: 2 }));

  return {
    id,
    client_name: faker.company.name(),
    facility_name: `${faker.finance.accountName()} Facility`,
    covenant_type: covenantType,
    operator,
    threshold,
    frequency: faker.helpers.arrayElement(FREQUENCIES),
    next_test_date: faker.date.between({ from: '2026-01-01', to: '2026-12-31' }).toISOString(),
    last_tested_value:
      status === 'Pending' ? null : parseFloat(faker.finance.amount({ min: 0, max: 6, dec: 2 })),
    status,
    notes: faker.lorem.sentence(),
    created_at: faker.date.between({ from: '2022-01-01', to: '2023-12-31' }).toISOString(),
    updated_at: faker.date.recent().toISOString()
  };
}

// Mock covenant data store
export const fakeCovenants = {
  records: [] as Covenant[],

  initialize() {
    const sampleCovenants: Covenant[] = [];
    for (let i = 1; i <= 30; i++) {
      sampleCovenants.push(generateRandomCovenantData(i));
    }

    this.records = sampleCovenants;
  },

  async getAll({
    covenantTypes = [],
    statuses = [],
    search
  }: {
    covenantTypes?: string[];
    statuses?: string[];
    search?: string;
  }) {
    let covenants = [...this.records];

    if (covenantTypes.length > 0) {
      covenants = covenants.filter((covenant) => covenantTypes.includes(covenant.covenant_type));
    }

    if (statuses.length > 0) {
      covenants = covenants.filter((covenant) => statuses.includes(covenant.status));
    }

    if (search) {
      covenants = matchSorter(covenants, search, {
        keys: ['client_name', 'facility_name', 'covenant_type']
      });
    }

    return covenants;
  },

  async getCovenants({
    page = 1,
    limit = 10,
    covenantTypes,
    statuses,
    search,
    sort
  }: {
    page?: number;
    limit?: number;
    covenantTypes?: string | string[];
    statuses?: string | string[];
    search?: string;
    sort?: string;
  }) {
    await delay(800);
    const covenantTypesArray = covenantTypes
      ? Array.isArray(covenantTypes)
        ? covenantTypes
        : String(covenantTypes).split(/[.,]/)
      : [];
    const statusesArray = statuses
      ? Array.isArray(statuses)
        ? statuses
        : String(statuses).split(/[.,]/)
      : [];

    const allCovenants = await this.getAll({
      covenantTypes: covenantTypesArray,
      statuses: statusesArray,
      search
    });

    if (sort) {
      try {
        const sortItems = JSON.parse(sort) as { id: string; desc: boolean }[];
        if (sortItems.length > 0) {
          const { id, desc } = sortItems[0];
          allCovenants.sort((a, b) => {
            const aVal = (a as Record<string, unknown>)[id];
            const bVal = (b as Record<string, unknown>)[id];
            if (typeof aVal === 'number' && typeof bVal === 'number') {
              return desc ? bVal - aVal : aVal - bVal;
            }
            const aStr = String(aVal ?? '').toLowerCase();
            const bStr = String(bVal ?? '').toLowerCase();
            return desc ? bStr.localeCompare(aStr) : aStr.localeCompare(bStr);
          });
        }
      } catch {
        // Invalid sort param — ignore
      }
    }

    const totalCovenants = allCovenants.length;
    const offset = (page - 1) * limit;
    const paginatedCovenants = allCovenants.slice(offset, offset + limit);

    return {
      success: true,
      time: new Date().toISOString(),
      message: 'Sample data for testing and learning purposes',
      total_covenants: totalCovenants,
      offset,
      limit,
      covenants: paginatedCovenants
    };
  },

  async getCovenantById(id: number) {
    await delay(500);

    const covenant = this.records.find((covenant) => covenant.id === id);

    if (!covenant) {
      return {
        success: false,
        message: `Covenant with ID ${id} not found`
      };
    }

    return {
      success: true,
      time: new Date().toISOString(),
      message: `Covenant with ID ${id} found`,
      covenant
    };
  },

  async createCovenant(data: Omit<Covenant, 'id' | 'created_at' | 'updated_at'>) {
    await delay(800);

    const newCovenant: Covenant = {
      ...data,
      id: this.records.length + 1,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    };

    this.records.push(newCovenant);

    return {
      success: true,
      message: 'Covenant created successfully',
      covenant: newCovenant
    };
  },

  async updateCovenant(id: number, data: Omit<Covenant, 'id' | 'created_at' | 'updated_at'>) {
    await delay(800);

    const index = this.records.findIndex((covenant) => covenant.id === id);

    if (index === -1) {
      return { success: false, message: `Covenant with ID ${id} not found` };
    }

    this.records[index] = {
      ...this.records[index],
      ...data,
      updated_at: new Date().toISOString()
    };

    return {
      success: true,
      message: 'Covenant updated successfully',
      covenant: this.records[index]
    };
  },

  async deleteCovenant(id: number) {
    await delay(800);

    const index = this.records.findIndex((covenant) => covenant.id === id);

    if (index === -1) {
      return { success: false, message: `Covenant with ID ${id} not found` };
    }

    this.records.splice(index, 1);

    return {
      success: true,
      message: 'Covenant deleted successfully'
    };
  }
};

fakeCovenants.initialize();
