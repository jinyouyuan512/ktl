
export interface Game {
  id: string;
  title: string;
  description: string;
  coverImage: string;
}

export interface Guide {
  id: string;
  gameId: string;
  title: string;
  content: string;
}

export interface ChatMessage {
  id: number;
  sender: 'user' | 'ai';
  text: string;
  isLoading?: boolean;
}
