/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const addBookmark = /* GraphQL */ `
  mutation AddBookmark($title: String!, $bookmark: String!) {
    addBookmark(title: $title, bookmark: $bookmark) {
      id
      title
      bookmark
    }
  }
`;
export const deleteBookmark = /* GraphQL */ `
  mutation DeleteBookmark($id: String!) {
    deleteBookmark(id: $id)
  }
`;
export const updateBookmark = /* GraphQL */ `
  mutation UpdateBookmark($id: String!, $title: String!, $bookmark: String!) {
    updateBookmark(id: $id, title: $title, bookmark: $bookmark) {
      id
      title
      bookmark
    }
  }
`;
