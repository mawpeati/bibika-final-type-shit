import axios from 'axios';
import { Category, Listing } from '../types';

const BASE_URL = 'https://lalafo-sardar-default-rtdb.europe-west1.firebasedatabase.app';

export const createCategory = async (name: string) => {
  const response = await axios.post(`${BASE_URL}/categories.json`, { name });
  return { id: response.data.name, name };
};

export const getCategories = async (): Promise<Category[]> => {
  const response = await axios.get(`${BASE_URL}/categories.json`);
  const data = response.data;
  if (!data) return [];
  return Object.entries(data).map(([id, value]: [string, any]) => ({
    id,
    name: value.name,
  }));
};

export const updateCategory = async (id: string, name: string) => {
  await axios.patch(`${BASE_URL}/categories/${id}.json`, { name });
};

export const createListing = async (listing: Omit<Listing, 'id'>) => {
  const response = await axios.post(`${BASE_URL}/listings.json`, listing);
  return { id: response.data.name, ...listing };
};

export const getListings = async (): Promise<Listing[]> => {
  const response = await axios.get(`${BASE_URL}/listings.json`);
  const data = response.data;
  if (!data) return [];
  return Object.entries(data).map(([id, value]: [string, any]) => ({
    id,
    title: value.title,
    description: value.description,
    price: value.price,
    categoryName: value.categoryName,
    imageUrl: value.imageUrl,
  }));
};

export const updateListing = async (id: string, listing: Omit<Listing, 'id'>) => {
  await axios.patch(`${BASE_URL}/listings/${id}.json`, listing);
};