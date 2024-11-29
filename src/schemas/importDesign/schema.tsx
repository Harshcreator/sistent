const importDesignSchema = {
  type: 'object',
  properties: {
    name: {
      type: 'string',
      title: 'Design file name',
      default: 'Untitled Design',
      'x-rjsf-grid-area': '6',
      description:
        'Provide a name for your design file. This name will help you identify the file more easily. You can also change the name of your design after importing it.'
    },
    designType: {
      title: 'Design type',
      enum: ['Helm Chart', 'Kubernetes Manifest', 'Docker Compose', 'Meshery Design'],
      'x-rjsf-grid-area': '6',
      description:
        "Select the type of design you are uploading. The 'Design Type' determines the format, structure, and content of the file you are uploading. Choose the appropriate design type that matches the nature of your file. Checkout https://docs.meshery.io/guides/configuration-management/creating-a-meshery-design to learn more about designs"
    }
  },
  allOf: [
    {
      if: {
        properties: {
          designType: {
            const: 'Helm Chart'
          }
        }
      },
      then: {
        properties: {
          uploadType: {
            title: 'Upload method',
            enum: ['File Upload', 'URL Import'],
            default: 'URL Import',
            'x-rjsf-grid-area': '12',
            description:
              "Choose the method you prefer to upload your Helm Chart design file. Select 'File Upload' if you have the file on your local system, or 'URL Import' if you have the file hosted online."
          }
        },
        allOf: [
          {
            if: {
              properties: {
                uploadType: {
                  const: 'File Upload'
                }
              }
            },
            then: {
              properties: {
                file: {
                  type: 'string',
                  format: 'file',
                  description: 'Browse the Helm Chart file from your file system',
                  'x-rjsf-grid-area': '12'
                }
              },
              required: ['file']
            }
          },
          {
            if: {
              properties: {
                uploadType: {
                  const: 'URL Import'
                }
              }
            },
            then: {
              properties: {
                url: {
                  type: 'string',
                  format: 'uri',
                  title: 'URL',
                  description:
                    'Provide the URL of the Helm Chart design file you want to import. This should be a direct URL to the file, for example: https://raw.github.com/your-design-file.yaml',
                  'x-rjsf-grid-area': '12'
                }
              },
              required: ['url']
            }
          }
        ],
        required: ['uploadType']
      }
    },
    {
      if: {
        properties: {
          designType: {
            not: {
              const: 'Helm Chart'
            }
          }
        }
      },
      then: {
        properties: {
          uploadType: {
            title: 'Upload method',
            enum: ['File Upload', 'URL Import'],
            default: 'URL Import',
            'x-rjsf-grid-area': '12',
            description:
              "Choose the method you prefer to upload your design file. Select 'File Upload' if you have the file on your local system, or 'URL Import' if you have the file hosted online."
          }
        },
        allOf: [
          {
            if: {
              properties: {
                uploadType: {
                  const: 'File Upload'
                }
              }
            },
            then: {
              properties: {
                file: {
                  type: 'string',
                  format: 'file',
                  description: 'Browse the design file from your file system',
                  'x-rjsf-grid-area': '12'
                }
              },
              required: ['file']
            }
          },
          {
            if: {
              properties: {
                uploadType: {
                  const: 'URL Import'
                }
              }
            },
            then: {
              properties: {
                url: {
                  type: 'string',
                  format: 'uri',
                  title: 'URL',
                  description:
                    'Provide the URL of the design file you want to import. This should be a direct URL to the file, for example: https://raw.github.com/your-design-file.yaml',
                  'x-rjsf-grid-area': '12'
                }
              },
              required: ['url']
            }
          }
        ],
        required: ['uploadType']
      }
    },
    {
      required: ['designType']
    }
  ]
};

export default importDesignSchema;
