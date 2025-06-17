declare global {
  namespace Express {
    interface Request {
      user?: { id: string; email: string }; // Example custom property
    }
  }
}

export {};
