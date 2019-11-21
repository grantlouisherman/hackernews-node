const { GraphQLServer } = require('graphql-yoga')

let links = [{
    id: 'link-0',
    url: 'www.howtographql.com',
    description: 'Fullstack tutorial for GraphQL'
}]

let idCount = links.length
/*
    The type definitions: GRAPHQL Schema

    Every GraphQL schema has three special root types:
        1. Query
        2. Mutation
        3. Subscription

     Each of the above are root types are called root fields and define API operations
 */


/*
    Resolver: actual implementation of GRAPHQL Schema
 */
const resolvers = {
    Query: {
        info: () => `This is the API THINGY`,
        feed: () => links,
        link:(parent, args) => {
            return links.find(link => link.id === args.id)
        }
    },
    Mutation: {
       post: (parent, args) => {
           const newLink = {
               id: `link-${idCount++}`,
               description: args.description,
               url: args.url,
           }
           links.push(newLink)
           return newLink
       },
        updateLink: (parent, args) => {
           let currId = links.find(link => link.id === args.id)
            if(!currId){
                return { id: 'ID_NOT_FOUND', url: "NOT FOUND", description: "NOT FOUND"}
            }

            const newObj = {...currId, ...args}
            const updateData = newData => {
                for(let i=0;i<links.length;i++){
                    let currLink = links[i]
                    if(currLink.id === args.id){
                        links[i] = newData
                        return
                    }
                }
            }
            updateData(newObj)
            return newObj
        },
        deleteLink: (parent, args) => {
           const idToBeDeleted = links.find(link => link.id === args.id)
            if(!idToBeDeleted){
                return { id: 'ID_NOT_FOUND', url: "NOT FOUND", description: "NOT FOUND"}
            }
            links = links.filter(link => link.id != args.id)
            return idToBeDeleted
        }
    },
}

const server = new GraphQLServer({
    typeDefs: './src/schema.graphql',
    resolvers
})

server.start(() => console.log(`Server is on localhost:4000`))
