import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";

// db
import db from './_db.js';

// types
import  { typeDefs } from './schema.js';

const resolvers = {
    Query: {
        reviews() {
            return db.reviews;
        },
        review(_, args){
            return db.reviews.find((review) => review.id === args.id);
        },
        games() {
            return db.games;
        },
        game(_, args){
            return db.games.find((game) => game.id === args.id);
        },
        authors() {
            return db.authors;
        },
        author(_, args){
            return db.authors.find((author) => author.id === args.id);
        },
    },
    Game: {
        reviews(parent) {
            return db.reviews.filter((review) => review.game_id === parent.id);
        },
    },
    Author: {
        reviews(parent) {
            return db.reviews.filter((review) => review.author_id === parent.id);
        },
    },
    Review: {
        author(parent) {
            return db.authors.find((author) => author.id === parent.author_id);
        },
        game(parent) {
            return db.games.find((game) => game.id === parent.game_id);
        }
    },
    Mutation: {
        deleteGame(_, args) {
            db.games = db.games.filter((game) => game.id !== args.id);

            return db.games;
        },
        addGame(_, args) {
            const game = {
                ...args.game,
                id: Math.floor(Math.random() * 100000).toString()
            };
            db.games.push(game);

            return game;
        },
        updateGame(_, args) {
            db.games = db.games.map((game) => {
                if (game.id === args.id) {
                    return { ...game, ...args.edits };
                }

                return game;
            });

            return db.games.find((game) => game.id === args.id);
        }
    },
};

// Server setup
const server = new ApolloServer({
    // typeDefs -> definitions of types of data
    typeDefs,
    // resolvers
    resolvers
});

const PORT = 4000;
const { url } = await startStandaloneServer(server, {
    listen: { port: PORT }
});

console.log(`Server ready at port ${PORT}`);