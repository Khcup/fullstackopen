import { gql } from "@apollo/client";

export const REPOSITORY_DETAILS = gql`
  fragment RepositoryDetails on Repository {
    fullName
    description
    forksCount
    id
    language
    ownerAvatarUrl
    reviewCount
    stargazersCount
    ratingAverage
  }
`;

export const PAGE_DETAILS = gql`
  fragment PageDetails on PageInfo {
    endCursor
    startCursor
    hasNextPage
  }
`;

export const REVIEW_DETAILS = gql`
  fragment ReviewDetails on Review {
    id
    text
    rating
    createdAt
  }
`;
