// Middleware for GraphQL resolvers to check if user is authenticated before resolving
export async function authMiddleware(resolve, source, args, context, info) {
  if (context.authenticated) {
    return resolve(source, args, context, info);
  }
  throw new Error('You must be authorized to make this project');
}