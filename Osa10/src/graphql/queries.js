import { gql } from "@apollo/client";

import { REPOSITORY_DETAILS, PAGE_DETAILS, REVIEW_DETAILS } from "./fragments";

export const GET_REPOSITORY = gql`
  ${REPOSITORY_DETAILS}
  ${PAGE_DETAILS}
  ${REVIEW_DETAILS}
  query Repository($repositoryId: ID!, $first: Int, $after: String) {
    repository(id: $repositoryId) {
      ...RepositoryDetails
      url
      reviews(first: $first, after: $after) {
        edges {
          node {
            ...ReviewDetails
            user {
              id
              username
            }
          }
          cursor
        }
        totalCount
        pageInfo {
          ...PageDetails
        }
      }
    }
  }
`;

export const GET_REPOSITORIES = gql`
  ${REPOSITORY_DETAILS}
  ${PAGE_DETAILS}
  query Repositories(
    $orderBy: AllRepositoriesOrderBy
    $orderDirection: OrderDirection
    $searchKeyword: String
    $first: Int
    $after: String
  ) {
    repositories(
      orderBy: $orderBy
      orderDirection: $orderDirection
      searchKeyword: $searchKeyword
      first: $first
      after: $after
    ) {
      edges {
        node {
          ...RepositoryDetails
        }
        cursor
      }
      totalCount
      pageInfo {
        ...PageDetails
      }
    }
  }
`;

export const GET_LOGGEDIN_USER = gql`
  ${REVIEW_DETAILS}
  query User($includeReviews: Boolean!) {
    me {
      id
      username
      reviews @include(if: $includeReviews) {
        edges {
          node {
            ...ReviewDetails
            repository {
              id
              fullName
            }
          }
        }
      }
    }
  }
`;
