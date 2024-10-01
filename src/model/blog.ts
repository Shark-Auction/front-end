interface Role {
  id: number;
  name: string;
}

interface User {
  id: number;
  full_name: string;
  user_name: string;
  phone_number: string;
  email: string;
  address: string;
  imageUrl: string | null;
  date_of_birth: string;
  role_id: Role;
  email_verified: boolean;
  is_active: boolean;
}

export interface Blog {
  createdAt: string;
  updatedAt: string;
  id: number;
  title: string;
  content: string;
  user: User;
  blogImages: Image[];
}

interface Image {
  id: number;
  url: string;
}
