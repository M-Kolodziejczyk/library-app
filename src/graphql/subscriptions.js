/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateCustomer = /* GraphQL */ `
  subscription OnCreateCustomer {
    onCreateCustomer {
      id
      name
      phoneNumber
      email
      ordersByDate {
        nextToken
      }
      ordersByStatus {
        nextToken
      }
      createdAt
      updatedAt
    }
  }
`;
export const onUpdateCustomer = /* GraphQL */ `
  subscription OnUpdateCustomer {
    onUpdateCustomer {
      id
      name
      phoneNumber
      email
      ordersByDate {
        nextToken
      }
      ordersByStatus {
        nextToken
      }
      createdAt
      updatedAt
    }
  }
`;
export const onDeleteCustomer = /* GraphQL */ `
  subscription OnDeleteCustomer {
    onDeleteCustomer {
      id
      name
      phoneNumber
      email
      ordersByDate {
        nextToken
      }
      ordersByStatus {
        nextToken
      }
      createdAt
      updatedAt
    }
  }
`;
export const onCreateAuthor = /* GraphQL */ `
  subscription OnCreateAuthor {
    onCreateAuthor {
      id
      firstName
      lastName
      birthDate
      description
      createdAt
      updatedAt
      books {
        nextToken
      }
    }
  }
`;
export const onUpdateAuthor = /* GraphQL */ `
  subscription OnUpdateAuthor {
    onUpdateAuthor {
      id
      firstName
      lastName
      birthDate
      description
      createdAt
      updatedAt
      books {
        nextToken
      }
    }
  }
`;
export const onDeleteAuthor = /* GraphQL */ `
  subscription OnDeleteAuthor {
    onDeleteAuthor {
      id
      firstName
      lastName
      birthDate
      description
      createdAt
      updatedAt
      books {
        nextToken
      }
    }
  }
`;
export const onCreateBook = /* GraphQL */ `
  subscription OnCreateBook {
    onCreateBook {
      id
      title
      authorID
      createdAt
      publisher
      publishedDate
      language
      description
      category
      totalPages
      isbn
      totalCopies
      status
      orders {
        nextToken
      }
      updatedAt
      author {
        id
        firstName
        lastName
        birthDate
        description
        createdAt
        updatedAt
      }
    }
  }
`;
export const onUpdateBook = /* GraphQL */ `
  subscription OnUpdateBook {
    onUpdateBook {
      id
      title
      authorID
      createdAt
      publisher
      publishedDate
      language
      description
      category
      totalPages
      isbn
      totalCopies
      status
      orders {
        nextToken
      }
      updatedAt
      author {
        id
        firstName
        lastName
        birthDate
        description
        createdAt
        updatedAt
      }
    }
  }
`;
export const onDeleteBook = /* GraphQL */ `
  subscription OnDeleteBook {
    onDeleteBook {
      id
      title
      authorID
      createdAt
      publisher
      publishedDate
      language
      description
      category
      totalPages
      isbn
      totalCopies
      status
      orders {
        nextToken
      }
      updatedAt
      author {
        id
        firstName
        lastName
        birthDate
        description
        createdAt
        updatedAt
      }
    }
  }
`;
