const swaggerComponents = {
  schemas: {
    User: {
      type: 'object',
      properties: {
        name: {
          type: 'string',
          example: 'John Doe',
        },
        email: {
          type: 'string',
          example: 'john.doe@example.com',
        },
        password: {
          type: 'string',
          example: 'password123',
          description: 'The user password must be at least 8 characters long.',
        },
      },
      required: ['name', 'email', 'password'],
    },
    QR: {
      type: 'object',
      properties: {
        user: {
          type: 'string',
          example: '5f5e7d8e2a9e7b1b2c7e7d8f',
        },
        type: {
          type: 'string',
          example: 'URL',
        },
        data: {
          type: 'object',
          example: {
            url: 'https://example.com',
          },
        },
        statistics: {
          type: 'object',
          properties: {
            scans: {
              type: 'number',
              example: 0,
            },
          },
        },
      },
      required: ['user', 'type', 'data'],
    },
    LoginRequest: {
      type: 'object',
      properties: {
        email: {
          type: 'string',
          example: 'johndoe@example.com',
        },
        password: {
          type: 'string',
          example: 'password123',
        },
      },
      required: ['email', 'password'],
    },
    LoginResponse: {
      type: 'object',
      properties: {
        message: {
          type: 'string',
          example: 'Login successful',
        },
        token: {
          type: 'string',
          example: 'JWT Token here',
        },
        user: {
          type: 'object',
          properties: {
            id: {
              type: 'string',
              example: '60a8b94fddab5c001be8e337',
            },
            name: {
              type: 'string',
              example: 'John Doe',
            },
            email: {
              type: 'string',
              example: 'johndoe@example.com',
            },
          },
        },
      },
    },
    RegisterRequest: {
      type: 'object',
      required: ['name', 'email', 'password'],
      properties: {
        name: {
          type: 'string',
          example: 'John Doe',
        },
        email: {
          type: 'string',
          example: 'johndoe@example.com',
        },
        password: {
          type: 'string',
          format: 'password',
          example: 'password123',
        },
      },
    },
    RegisterResponse: {
      type: 'object',
      properties: {
        message: {
          type: 'string',
          example: 'User created',
        },
        token: {
          type: 'string',
          example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
        },
        user: {
          type: 'object',
          properties: {
            id: {
              type: 'string',
              example: '605c6d25b4d843001f22d9c5',
            },
            name: {
              type: 'string',
              example: 'John Doe',
            },
            email: {
              type: 'string',
              example: 'john@example.com',
            },
          },
        },
      },
    },
    ErrorResponse: {
      type: 'object',
      properties: {
        success: {
          type: 'boolean',
          example: false,
        },
        message: {
          type: 'string',
          example: 'User already exists',
        },
      },
    },
  },
};

export default swaggerComponents;
