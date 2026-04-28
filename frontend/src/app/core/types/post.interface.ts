export type PostType = 'NEWS' | 'EVENT' | 'ANNOUNCEMENT'; //Tipos possíveis de postagem

//Administrador que criou a postagem
export interface PostAdmin {
  id: number;
  name: string;
}

export interface Postar {
    id: number;
    title: string;
    content: string;
    postType: PostType;
    publishedAt: string;
    createdAt: string;
    updatedAt: string;
    admin: PostAdmin;
    local : string
    imageUrls: string[];
}
