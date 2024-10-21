const userEndpoints = {
  '/api/v1/users': {
    get: {
      summary: 'Get all users',
      description: 'Get a list of all users.',
      tags: ['Users'],
      responses: {
        200: {
          description: 'A list of users.',
          content: {
            'application/json': {
              schema: {
                type: 'array',
                items: { $ref: '#/components/schemas/User' },
              },
            },
          },
        },
      },
    },
  },
  '/api/v1/users/{id}': {
    get: {
      summary: 'Get user by ID',
      description: 'Get a single user by their ID.',
      tags: ['Users'],
      parameters: [
        {
          in: 'path',
          name: 'id',
          required: true,
          description: 'User ID',
          schema: { type: 'string' },
        },
      ],
      responses: {
        200: {
          description: 'A user object.',
          content: {
            'application/json': {
              schema: { $ref: '#/components/schemas/User' },
            },
          },
        },
        404: { description: 'User not found.' },
      },
    },
    put: {
      summary: 'Update a user',
      description: "Update a user's information by their ID.",
      tags: ['Users'],
      parameters: [
        {
          in: 'path',
          name: 'id',
          required: true,
          description: 'User ID',
          schema: { type: 'string' },
        },
      ],
      requestBody: {
        required: true,
        content: {
          'application/json': { schema: { $ref: '#/components/schemas/User' } },
        },
      },
      responses: {
        200: {
          description: 'The updated user object.',
          content: {
            'application/json': {
              schema: { $ref: '#/components/schemas/User' },
            },
          },
        },
        404: { description: 'User not found.' },
      },
    },
    delete: {
      summary: 'Delete a user',
      description: 'Delete a user by their ID.',
      tags: ['Users'],
      parameters: [
        {
          in: 'path',
          name: 'id',
          required: true,
          description: 'User ID',
          schema: { type: 'string' },
        },
      ],
      responses: {
        204: { description: 'User deleted successfully.' },
        404: { description: 'User not found.' },
      },
    },
  },
  '/api/v1/users/login': {
    post: {
      summary: 'Login a user',
      description: 'Authenticate a user with email and password.',
      tags: ['Users'],
      requestBody: {
        required: true,
        content: {
          'application/json': {
            schema: { $ref: '#/components/schemas/LoginRequest' },
          },
        },
      },
      responses: {
        200: {
          description: 'The authenticated user.',
          content: {
            'application/json': {
              schema: { $ref: '#/components/schemas/LoginResponse' },
            },
          },
        },
        401: { description: 'Unauthorized.' },
      },
    },
  },
  '/api/v1/users/register': {
    post: {
      summary: 'Register a new user',
      description: 'Create a new user account with name, email, and password.',
      tags: ['Users'],
      requestBody: {
        required: true,
        content: {
          'application/json': {
            schema: { $ref: '#/components/schemas/RegisterRequest' },
          },
        },
      },
      responses: {
        201: {
          description: 'User created successfully.',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  message: { type: 'string', example: 'User created' },
                  token: {
                    type: 'string',
                    description: 'JWT token for authentication',
                  },
                  user: { $ref: '#/components/schemas/RegisterResponse' },
                },
              },
            },
          },
        },
        400: {
          description: 'User already exists or invalid data.',
          content: {
            'application/json': {
              schema: { $ref: '#/components/schemas/ErrorResponse' },
            },
          },
        },
        500: { description: 'Server error.' },
      },
    },
  },
};

const qrEndpoints = {
  '/api/v1/qrs': {
    get: {
      summary: 'Get all QRs',
      description: 'Get a list of all QR codes.',
      tags: ['QR Codes'],
      responses: {
        200: {
          description: 'A list of QR codes.',
          content: {
            'application/json': {
              schema: {
                type: 'array',
                items: { $ref: '#/components/schemas/QR' },
              },
            },
          },
        },
      },
    },
    post: {
      summary: 'Create a new QR code',
      description: 'Create a new QR code with a name, description, and URL.',
      tags: ['QR Codes'],
      requestBody: {
        required: true,
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                type: { type: 'string', example: 'url' },
                data: {
                  type: 'object',
                  example: { url: 'https://example.com' },
                },
              },
              required: ['type', 'data'],
            },
          },
        },
      },
      responses: {
        201: {
          description: 'QR code created successfully.',
          content: {
            'application/json': {
              schema: { $ref: '#/components/schemas/QR' },
            },
          },
        },
        400: {
          description: 'Invalid data.',
          content: {
            'application/json': {
              schema: { $ref: '#/components/schemas/ErrorResponse' },
            },
          },
        },
        500: { description: 'Server error.' },
      },
    },
  },
  '/api/v1/qrs/{id}': {
    get: {
      summary: 'Get QR by ID',
      description: 'Get a single QR code by its ID.',
      tags: ['QR Codes'],
      parameters: [
        {
          in: 'path',
          name: 'id',
          required: true,
          description: 'QR code ID',
          schema: { type: 'string' },
        },
      ],
      responses: {
        200: {
          description: 'A QR code object.',
          content: {
            'application/json': {
              schema: { $ref: '#/components/schemas/QR' },
            },
          },
        },
        404: { description: 'QR code not found.' },
      },
    },
    put: {
      summary: 'Update a QR code',
      description: 'Update a QR code by its ID.',
      tags: ['QR Codes'],
      parameters: [
        {
          in: 'path',
          name: 'id',
          required: true,
          description: 'QR code ID',
          schema: { type: 'string' },
        },
      ],
      requestBody: {
        required: true,
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                type: { type: 'string', example: 'url' },
                data: {
                  type: 'object',
                  example: { url: 'https://example.com' },
                },
              },
            },
          },
        },
      },
      responses: {
        200: {
          description: 'The updated QR code object.',
          content: {
            'application/json': {
              schema: { $ref: '#/components/schemas/QR' },
            },
          },
        },
        404: { description: 'QR code not found.' },
      },
    },
    delete: {
      summary: 'Delete a QR code',
      description: 'Delete a QR code by its ID.',
      tags: ['QR Codes'],
      parameters: [
        {
          in: 'path',
          name: 'id',
          required: true,
          description: 'QR code ID',
          schema: { type: 'string' },
        },
      ],
      responses: {
        204: { description: 'QR code deleted successfully.' },
        404: { description: 'QR code not found.' },
      },
    },
  },
  '/api/v1/qrs/my-qrs': {
    get: {
      summary: 'Get my QR codes',
      description:
        'Get a list of all QR codes created by the authenticated user.',
      tags: ['QR Codes'],
      responses: {
        200: {
          description: 'A list of QR codes.',
          content: {
            'application/json': {
              schema: {
                type: 'array',
                items: { $ref: '#/components/schemas/QR' },
              },
            },
          },
        },
      },
    },
  },
  '/api/v1/qrs/scan/{id}': {
    get: {
      summary: 'Scan a QR code',
      description: 'Scan a QR code by its ID.',
      tags: ['QR Codes'],
      parameters: [
        {
          in: 'path',
          name: 'id',
          required: true,
          description: 'QR code ID',
          schema: { type: 'string' },
        },
      ],
      responses: {
        200: {
          description: 'QR code scanned successfully.',
          content: {
            'application/json': {
              schema: { $ref: '#/components/schemas/QR' },
            },
          },
        },
        404: { description: 'QR code not found.' },
      },
    },
  },
};

const swaggerEndpoints = {
  ...userEndpoints,
  ...qrEndpoints,
};

export default swaggerEndpoints;
