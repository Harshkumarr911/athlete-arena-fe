export const API_BASE_URL ='http://localhost:8080/api';

export const ROLES = {
  ATHLETE: 'ATHLETE',
  COACH: 'COACH',
  ADMIN: 'ADMIN',
};

export const VIDEO_CATEGORIES = [
  'SPEED',
  'STRENGTH',
  'RECOVERY',
  'NUTRITION',
  'TECHNIQUE',
  'CARDIO',
  'FLEXIBILITY',
  'MENTAL',
];

export const MAX_FILE_SIZE = {
  IMAGE: 5 * 1024 * 1024, // 5MB
  VIDEO: 100 * 1024 * 1024, // 100MB
};

export const ACCEPTED_FILE_TYPES = {
  IMAGE: ['image/jpeg', 'image/png', 'image/gif', 'image/webp'],
  VIDEO: ['video/mp4', 'video/webm', 'video/ogg'],
};

export const ROUTES = {
  HOME: '/',
  LOGIN: '/login',
  REGISTER: '/register',
  FEED: '/feed',
  VIDEOS: '/videos',
  COMMUNITY: '/community',
  PROFILE: '/profile/:id',
};