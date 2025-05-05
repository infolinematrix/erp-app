import { ExpressAuth, getSession, type ExpressAuthConfig } from '@auth/express';
import type { ProviderType } from '@auth/express/providers';
import Credentials from '@auth/express/providers/credentials';
import GitHub from '@auth/express/providers/github';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { repo, withRemult, type UserInfo } from 'remult';
import bcrypt from 'bcryptjs';
import { User } from '../demo/auth/User.js';
// import { Roles } from '../demo/auth/Roles.js';
// import { UserRole } from 'src/shared/User.entity.js';
// import { UnauthorizedException } from '@nestjs/common';
// import { AuthService } from './services/auth/auth.service.js';

// Configuration for Auth.js
const authConfig: ExpressAuthConfig = {
  providers: [
    Credentials({
      credentials: {
        email: {
          type: 'text', // The input field for username
          placeholder: 'Try Jane or Steve', // Instructional placeholder for demo purposes
        },
        password: {
          type: 'password', // The input field for password
          placeholder: 'Jane123 or Steve123', // Instructional placeholder for demo purposes
        },
      },
      authorize: (credentials) =>
        // This function runs when a user tries to sign in
        withRemult(async () => {
          // The withRemult function provides the current Remult context (e.g., repository, authenticated user, etc.)
          // to any Remult-related operations inside this block. This ensures that `remult` functions such as
          // repository queries or checking user permissions can be executed correctly within the request's context.
          const user = await repo(User).findFirst({
            // Find a user by their name and provider type (credentials-based auth)
            email: credentials.email as string,
            providerType: 'credentials',
          });

          // If a matching user is found and the password is valid
          if (
            user &&
            bcrypt.compareSync(credentials.password as string, user.password)
          ) {
            return {
              id: user.id, // Return the user's ID as part of the session
            };
          }
          return null; // If credentials are invalid, return null
        }),
    }),
    GitHub,
  ],
  callbacks: {
    signIn: (arg) =>
      withRemult(async () => {
        // This callback runs after sign-in
        if (arg.account?.type === 'credentials') return true; // If credentials-based login, allow sign-in
        let user = await repo(User).findOne({
          where: {
            name: '',
            password: '',
            // Find the user by OAuth provider and account ID
            // provider: arg.account?.provider,
            // providerType: arg.account?.type,
            // providerAccountId: arg.account?.providerAccountId,
          },
          // set: {
          //   name: arg.profile?.name || "", // Update the user's name with the OAuth profile name
          // },
        });
        arg.user!.id = user!.id; // Set the user's ID in the session
        return true;
      }),
    session: ({ session, token }) => {
      // Add the user's ID to the session object
      return {
        ...session,
        user: {
          id: token.sub, // Use the token's subject (user ID)
        },
      };
    },
  },
};

// Auth.js middleware for Express
export const auth = ExpressAuth(authConfig);
export type { ProviderType }; // Export ProviderType for use in `User.providerType`

// Helper function to get user information from a request
export async function getUserFromRequest(
  req: Request
): Promise<UserInfo | undefined> {
  const session = await getSession(req, authConfig); // Get the session from the request
  if (!session?.user?.id) return undefined; // If no session or user ID, return undefined
  const user = await repo(User).findId(session.user.id); // Find the user in the database by their session ID
  if (!user) return undefined; // If no user is found, return undefined

  
  const authHeader = req.headers.authorization;
  if (!authHeader?.startsWith('Bearer ')) return undefined;

  const token = authHeader.split(' ')[1];
  const jwtService = new JwtService({ secret: process.env['SESSION_SECRET'] || 'my-secret' });

  try {
    const payload = await jwtService.verifyAsync<{ sub: string }>(token);
    const user = await repo(User).findId(payload.sub, {
      include:[{ Roles: true }, { Permissions: true }, {UserRole: true}], // 👈 Ensure relations are loaded
    });

    if (!user) return undefined;

    //-- Get Roles
    // const roles = user.admin ? ['admin'] : [];
    // if (user.roles) {
    //   roles.push(...user.roles.map(role => role.name));
    // }

    //-- Get Permissions
    // const permissions = user.permissions?.map(p => p.name) ?? [];

    return {
      id: user.id,
      name: user.name,
      
    };
  } catch (error) {
    return undefined;
  }

}

// export async function getUserFromToken(req: Request): Promise<any | undefined> {
//   const token = req.headers.authorization?.split(' ')[1];
//   if (!token) return undefined;

//   const jwtService = new JwtService({ secret: process.env['SESSION_SECRET'] || 'my-secret' });
//   const authService = new AuthService(jwtService);

//   try {
//     const decoded = jwtService.verify(token);
//     // console.log('✅ Decoded Token:', decoded); // Debug JWT payload
//     const user = await authService.getMe(decoded.sub);
//     if (!user) return undefined;
    
//     return {
//       id: user.id,
//       name: user.name,
//       roles: user.userRoles?.map(ur => ur.role?.name).filter(Boolean) ?? [],
//       permissions: [],
//     };


    
    
//     // console.log('✅ User attached to request:', request.user); // Debug user
//     return true;
//   } catch (err:any) {
//     console.error('❌ Invalid or expired token', err.message);
//     throw new UnauthorizedException('Invalid or expired token');
//   }
// }