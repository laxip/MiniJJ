import { atom, selector } from 'recoil';
import { fetchJobOffers } from '../../api/jobOffersApi';

export type JobOfferItem = {
  city: string;
  companyLogoUrl: string;
  companyName: string;
  companySize: string;
  companyUrl: string;
  countryCode: string;
  employmentType: string;
  experienceLevel: string;
  id: string;
  latitude: number;
  longitude: number;
  markerIcon: string;
  publishedAt: string;
  remote: boolean;
  salaryCurrency: string;
  salaryFrom: number;
  salaryTo: number;
  skills: Array<{
    name: string;
    level: number;
  }>;
  street: string;
  title: string;
  pointerId?: string;
};

export const jobOffersSelector = selector<JobOfferItem[]>({
  key: 'jobOffersSelector',
  get: async () => {
    const response = await fetchJobOffers();

    return response.data;
  },
});

export const jobOfferColors = atom<{
  [k: string]: number[];
}>({
  key: 'jobOfferColors',
  default: {},
});

export const hoveredJobOffer = atom<string | null | undefined>({
  key: 'hoveredJobOffer',
  default: null,
});
