export const typeDefs = `#graphql
type Game {
    id: ID! # ! = required
    title: String!
    platform: [String!]!
    reviews: [Review!]
}

type Review {
    id: ID!
    rating: Int!
    content: String!
    game: Game!
    author: Author!
}

type Author {
    id: ID!
    name: String!
    verified: Boolean!
    reviews: [Review!]
}

type Query { # Every GraphQL API needs at least 1 Query type
    reviews: [Review]
    review(id: ID!): Review
    games: [Game]
    game(id: ID!): Game
    authors: [Author]
    author(id: ID!): Author
}

type Mutation {
    addGame(game: AddGameInput!): Game
    updateGame(id: ID!, edits: EditGameInput!): Game
    deleteGame(id: ID!): [Game]
}

input AddGameInput {
    title: String!
    platform: [String!]!
}

input EditGameInput {
    title: String
    platform: [String!]
}
`;

// int
// float
// string
// bool
// ID <- sorta like strings but they are considered different by graphql