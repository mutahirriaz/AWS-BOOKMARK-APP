/* tslint:disable */
/* eslint-disable */
//  This file was automatically generated and should not be edited.

export type Bookmark = {
  __typename: "Bookmark",
  id?: string,
  title?: string,
  bookmark?: string,
};

export type AddBookmarkMutationVariables = {
  title?: string,
  bookmark?: string,
};

export type AddBookmarkMutation = {
  addBookmark:  {
    __typename: "Bookmark",
    id: string,
    title: string,
    bookmark: string,
  },
};

export type DeleteBookmarkMutationVariables = {
  id?: string,
};

export type DeleteBookmarkMutation = {
  deleteBookmark: string,
};

export type UpdateBookmarkMutationVariables = {
  id?: string,
  title?: string,
  bookmark?: string,
};

export type UpdateBookmarkMutation = {
  updateBookmark:  {
    __typename: "Bookmark",
    id: string,
    title: string,
    bookmark: string,
  },
};

export type GetBookmarksQuery = {
  getBookmarks?:  Array< {
    __typename: "Bookmark",
    id: string,
    title: string,
    bookmark: string,
  } > | null,
};
