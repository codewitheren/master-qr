const userEndpoints = {
  '/api/v1/users': {
    get: {
      summary: 'Get all users',
      description: 'Retrieve a list of all users.',
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
      description: 'Retrieve a single user by their ID.',
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
      summary: 'Authenticate a user',
      description: 'Authenticate a user with the given credentials.',
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

// const qrEndpoints = {};

const swaggerEndpoints = {
  ...userEndpoints,
  // ...qrEndpoints,
};

export default swaggerEndpoints;
