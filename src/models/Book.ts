export interface Book {
    id: number;
    title: string;
    author: string;
    genre: string;
    description: string;
    coverImage: string;
    isAvailable: boolean;
  }

  export interface CreateBookDTO {
    id: number;
    title: string;
    author: string;
    genre: string;
    description: string;
    coverImageFile: File|null;
    isAvailable: boolean;
  }