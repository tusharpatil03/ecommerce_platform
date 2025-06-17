import z from 'zod';

export const AuthInput = z.object({
  email: z.string().email('Invalid email format'),
  password: z.string().min(8, 'Password must contain at least 8 characters'),
});

export const ProductInput = z.object({
  key: z
    .string()
    .min(1, 'Key is Required')
    .max(8, 'key must be less than 8 characters'),
  name: z
    .string()
    .min(1, 'Name is required')
    .max(100, 'Name must be less than 100 characters'),
  description: z
    .string()
    .min(1, 'Description is required')
    .max(600, 'Description must be less than 600 characters'),
  price: z
    .number()
    .min(0, 'Price must be a positive number')
    .max(99999999, 'Price must be less than 100 million'),
  rating: z
    .number()
    .min(1, 'Rating must be at least 1')
    .max(5, 'Rating must be at most 5')
    .optional(),
  images: z
    .array(
      z.object({
        public_id: z.string().min(1, 'Public ID is required'),
        url: z.string().url('Invalid URL format'),
      }),
    )
    .nonempty('At least one image is required'),
  category: z
    .enum([
      'electronics',
      'clothing',
      'wearings',
      'food',
      'beauty',
      'mechanical',
      'drinks',
      'any',
    ])
    .default('any'),
  stock: z
    .number()
    .min(0, 'Stock must be a non-negative number')
    .max(999, 'Stock must be less than 10 billion')
    .default(1),
});
