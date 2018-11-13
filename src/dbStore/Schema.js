const tourSchema = {
    version: 0,
    title: 'tour schema',
    description: 'describes a tour details',
    type: 'object',
    properties: {
        name: {
            type: 'string',
        },
        id: {
            type: 'string',
            primary: true,
        },
        createdAt: {
            type: 'string',
        },
        completedWorkItems: {
            type: 'array',
            item: {
                type: 'object',
                properties: {
                    itemId: {
                        type: 'string',
                    },
                    completed: {
                       type: 'string'
                    },
                    completedAt: {
                        type: 'string',
                    },
                }
            }
        }
    },
    required: ['name'],
};

export default tourSchema;
