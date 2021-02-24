/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getOrder = /* GraphQL */ `
  query GetOrder($id: ID!) {
    getOrder(id: $id) {
      id
      customer
      customerId
      status
      createdAt
      books {
        nextToken
      }
      updatedAt
    }
  }
`;
export const listOrders = /* GraphQL */ `
  query ListOrders(
    $filter: ModelOrderFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listOrders(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        customer
        customerId
        status
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getCustomer = /* GraphQL */ `
  query GetCustomer($email: String!) {
    getCustomer(email: $email) {
      id
      firstName
      email
      lastName
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
export const listCustomers = /* GraphQL */ `
  query ListCustomers(
    $email: String
    $filter: ModelCustomerFilterInput
    $limit: Int
    $nextToken: String
    $sortDirection: ModelSortDirection
  ) {
    listCustomers(
      email: $email
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      sortDirection: $sortDirection
    ) {
      items {
        id
        firstName
        email
        lastName
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const ordersByCustomerByDate = /* GraphQL */ `
  query OrdersByCustomerByDate(
    $customer: String
    $createdAt: ModelStringKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelOrderFilterInput
    $limit: Int
    $nextToken: String
  ) {
    ordersByCustomerByDate(
      customer: $customer
      createdAt: $createdAt
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        customer
        customerId
        status
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const ordersByCustomerByStatusByDate = /* GraphQL */ `
  query OrdersByCustomerByStatusByDate(
    $customer: String
    $statusCreatedAt: ModelOrderByCustomerByStatusByDateCompositeKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelOrderFilterInput
    $limit: Int
    $nextToken: String
  ) {
    ordersByCustomerByStatusByDate(
      customer: $customer
      statusCreatedAt: $statusCreatedAt
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        customer
        customerId
        status
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const listAuthors = /* GraphQL */ `
  query ListAuthors(
    $filter: ModelAuthorFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listAuthors(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        firstName
        lastName
        birthDate
        description
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getAuthor = /* GraphQL */ `
  query GetAuthor($id: ID!) {
    getAuthor(id: $id) {
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
export const listBooks = /* GraphQL */ `
  query ListBooks(
    $filter: ModelBookFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listBooks(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        title
        authorID
        createdAt
        authorName
        publisher
        publishedDate
        language
        description
        category
        totalPages
        isbn
        totalCopies
        status
        updatedAt
      }
      nextToken
    }
  }
`;
export const getBook = /* GraphQL */ `
  query GetBook($id: ID!) {
    getBook(id: $id) {
      id
      title
      authorID
      createdAt
      authorName
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
      image {
        name
        bucket
        region
        key
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
export const booksByCategory = /* GraphQL */ `
  query BooksByCategory(
    $category: String
    $sortDirection: ModelSortDirection
    $filter: ModelBookFilterInput
    $limit: Int
    $nextToken: String
  ) {
    booksByCategory(
      category: $category
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        title
        authorID
        createdAt
        authorName
        publisher
        publishedDate
        language
        description
        category
        totalPages
        isbn
        totalCopies
        status
        updatedAt
      }
      nextToken
    }
  }
`;
