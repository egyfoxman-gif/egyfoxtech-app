export type CategoryType = 
  | 'all'
  | 'cards'
  | 'ebanks'
  | 'instapay'
  | 'investing'
  | 'freelance'
  | 'tutorials';

export interface Video {
  id: string; // YouTube Video ID
  title: string;
  titleEn?: string;
  description: string;
  descriptionEn?: string;
  thumbnailUrl?: string;
  publishedAt: string;
  publishTimestamp?: number;
  duration: string;
  views: string;
  viewsRaw?: number;
  likes: string;
  category: CategoryType;
  playlistId?: string;
  isFeatured?: boolean;
  tags: string[];
  articleUrl?: string; // Direct link to article on egyfoxtech.com
}

export interface Playlist {
  id: string;
  title: string;
  titleEn: string;
  description: string;
  descriptionEn: string;
  videoCount: number;
  coverVideoId: string;
  createdAt?: string;
}

export interface ChannelNotification {
  id: string;
  title: string;
  titleEn: string;
  body: string;
  bodyEn: string;
  timestamp: number;
  videoId?: string;
  articleUrl?: string;
  isRead: boolean;
  type: 'video' | 'announcement' | 'live' | 'card';
}

export interface VirtualCard {
  id: string;
  name: string;
  nameAr: string;
  provider: 'visa' | 'mastercard' | 'crypto';
  image: string; // uploaded card path
  badge?: string;
  currency: string;
  monthlyFee: string;
  issuanceFee: string;
  depositMethods: string;
  referralUrl: string;
  promoCode?: string;
  videoId?: string; // Tutorial video on channel
  articleUrl?: string;
  features: string[];
  featuresEn?: string[];
  description: string;
  isBybitPay?: boolean;
}

export type Language = 'ar' | 'en';
export type ThemeMode = 'dark' | 'light';
export type TabType = 'videos' | 'bybitpay' | 'cards' | 'converter' | 'playlists' | 'notifications' | 'channel' | 'home';
