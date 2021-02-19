/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createAuthor = /* GraphQL */ `
  mutation CreateAuthor(
    $input: CreateAuthorInput!
    $condition: ModelAuthorConditionInput
  ) {
    createAuthor(input: $input, condition: $condition) {
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
export const updateAuthor = /* GraphQL */ `
  mutation UpdateAuthor(
    $input: UpdateAuthorInput!
    $condition: ModelAuthorConditionInput
  ) {
    updateAuthor(input: $input, condition: $condition) {
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
export const deleteAuthor = /* GraphQL */ `
  mutation DeleteAuthor(
    $input: DeleteAuthorInput!
    $condition: ModelAuthorConditionInput
  ) {
    deleteAuthor(input: $input, condition: $condition) {
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
export const createBook = /* GraphQL */ `
  mutation CreateBook(
    $input: CreateBookInput!
    $condition: ModelBookConditionInput
  ) {
    createBook(input: $input, condition: $condition) {
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
export const updateBook = /* GraphQL */ `
  mutation UpdateBook(
    $input: UpdateBookInput!
    $condition: ModelBookConditionInput
  ) {
    updateBook(input: $input, condition: $condition) {
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
export const deleteBook = /* GraphQL */ `
  mutation DeleteBook(
    $input: DeleteBookInput!
    $condition: ModelBookConditionInput
  ) {
    deleteBook(input: $input, condition: $condition) {
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
export const createBookOrder = /* GraphQL */ `
  mutation CreateBookOrder(
    $input: CreateBookOrderInput!
    $condition: ModelBookOrderConditionInput
  ) {
    createBookOrder(input: $input, condition: $condition) {
      id
      book_id
      order_id
      status
      createdAt
      updatedAt
      book {
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
      customer
    }
  }
`;
export const updateBookOrder = /* GraphQL */ `
  mutation UpdateBookOrder(
    $input: UpdateBookOrderInput!
    $condition: ModelBookOrderConditionInput
  ) {
    updateBookOrder(input: $input, condition: $condition) {
      id
      book_id
      order_id
      status
      createdAt
      updatedAt
      book {
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
      customer
    }
  }
`;
export const deleteBookOrder = /* GraphQL */ `
  mutation DeleteBookOrder(
    $input: DeleteBookOrderInput!
    $condition: ModelBookOrderConditionInput
  ) {
    deleteBookOrder(input: $input, condition: $condition) {
      id
      book_id
      order_id
      status
      createdAt
      updatedAt
      book {
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
      customer
    }
  }
`;
export const createOrder = /* GraphQL */ `
  mutation CreateOrder(
    $input: CreateOrderInput!
    $condition: ModelOrderConditionInput
  ) {
    createOrder(input: $input, condition: $condition) {
      id
      customerID
      status
      date
      books {
        nextToken
      }
      createdAt
      updatedAt
      customer
    }
  }
`;
export const updateOrder = /* GraphQL */ `
  mutation UpdateOrder(
    $input: UpdateOrderInput!
    $condition: ModelOrderConditionInput
  ) {
    updateOrder(input: $input, condition: $condition) {
      id
      customerID
      status
      date
      books {
        nextToken
      }
      createdAt
      updatedAt
      customer
    }
  }
`;
export const deleteOrder = /* GraphQL */ `
  mutation DeleteOrder(
    $input: DeleteOrderInput!
    $condition: ModelOrderConditionInput
  ) {
    deleteOrder(input: $input, condition: $condition) {
      id
      customerID
      status
      date
      books {
        nextToken
      }
      createdAt
      updatedAt
      customer
    }
  }
`;
export const createCustomer = /* GraphQL */ `
  mutation CreateCustomer(
    $input: CreateCustomerInput!
    $condition: ModelCustomerConditionInput
  ) {
    createCustomer(input: $input, condition: $condition) {
      id
      firstName
      lastName
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
export const updateCustomer = /* GraphQL */ `
  mutation UpdateCustomer(
    $input: UpdateCustomerInput!
    $condition: ModelCustomerConditionInput
  ) {
    updateCustomer(input: $input, condition: $condition) {
      id
      firstName
      lastName
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
export const deleteCustomer = /* GraphQL */ `
  mutation DeleteCustomer(
    $input: DeleteCustomerInput!
    $condition: ModelCustomerConditionInput
  ) {
    deleteCustomer(input: $input, condition: $condition) {
      id
      firstName
      lastName
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
