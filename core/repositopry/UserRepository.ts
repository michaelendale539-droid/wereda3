import { PrismaClient, User } from '@prisma/client';
import { UserEntity, UserRole, UserStatus } from '../domain/entities/UserEntity';
import { PaginationOptions, PaginatedResult } from '../domain/repositoryI/BaseRepositoryI';
import { UserRepositoryI, CreateUserInput, UpdateUserInput } from '../domain/repositoryI/UserRepositoryI';

export class UserRepository implements UserRepositoryI {
  private prisma: PrismaClient;

  constructor(prisma: PrismaClient) {
    this.prisma = prisma;
  }

  private toDomainEntity(user: User): UserEntity {
    const role = user.role as unknown as UserRole;

    return {
      id: user.id.toString(),
      email: user.email || '',
      passwordHash: user.passwordHash || '',
      username: user.username || '',
      firstName: user.firstName || '',
      lastName: user.lastName || '',
      role: role,
      status: UserStatus.ACTIVE, // Default status
      lastLogin: user.lastLoginAt || null,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
      posts: [],
      documents: [],
      adminNotes: []
    };
  }

  async create(data: CreateUserInput): Promise<UserEntity> {
    const user = await this.prisma.user.create({
      data: {
        ...data,
        password: data.password, // Make sure to hash the password before saving in production
      },
    });
    return this.toDomainEntity(user);
  }

  async findById(id: number): Promise<UserEntity | null> {
    const user = await this.prisma.user.findUnique({
      where: { id },
    });
    return user ? this.toDomainEntity(user) : null;
  }

  async findAll(): Promise<UserEntity[]> {
    const users = await this.prisma.user.findMany();
    return users.map(user => this.toDomainEntity(user));
  }

  async update(id: number, data: UpdateUserInput): Promise<UserEntity | null> {
    try {
      const updatedUser = await this.prisma.user.update({
        where: { id },
        data: {
          ...data,
          role: data.role as any, // Type assertion for Prisma enum
          updatedAt: new Date(),
        },
      });
      return this.toDomainEntity(updatedUser);
    } catch (error) {
      if (error.code === 'P2025') { // Record not found
        return null;
      }
      throw error;
    }
  }

  async delete(id: number): Promise<boolean> {
    try {
      await this.prisma.user.delete({
        where: { id },
      });
      return true;
    } catch (error) {
      if (error.code === 'P2025') { // Record not found
        return false;
      }
      throw error;
    }
  }

  async findByEmail(email: string): Promise<UserEntity | null> {
    const user = await this.prisma.user.findUnique({
      where: { email },
    });
    return user ? this.toDomainEntity(user) : null;
  }

  async updateLastLogin(userId: number): Promise<void> {
    await this.prisma.user.update({
      where: { id: userId },
      data: {
        lastLogin: new Date(),
      },
    });
  }

  async searchUsers(query: string, options: PaginationOptions = { page: 1, limit: 10 }): Promise<PaginatedResult<UserEntity>> {
    const { page = 1, limit = 10 } = options;
    const skip = (page - 1) * limit;

    const [users, total] = await Promise.all([
      this.prisma.user.findMany({
        where: {
          OR: [
            { email: { contains: query, mode: 'insensitive' } },
            { firstName: { contains: query, mode: 'insensitive' } },
            { lastName: { contains: query, mode: 'insensitive' } },
          ],
        },
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' },
      }),
      this.prisma.user.count({
        where: {
          OR: [
            { email: { contains: query, mode: 'insensitive' } },
            { firstName: { contains: query, mode: 'insensitive' } },
            { lastName: { contains: query, mode: 'insensitive' } },
          ],
        },
      }),
    ]);

    return {
      data: users.map((user: User) => this.toDomainEntity(user)),
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    };
  }

  async getUsersWithPosts(userId: number): Promise<UserEntity | null> {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      include: {
        posts: true,
      },
    });
    return user ? this.toDomainEntity(user) : null;
  }

  async getUsersWithDocuments(userId: number): Promise<UserEntity | null> {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      include: {
        documents: true,
      },
    });
    return user ? this.toDomainEntity(user) : null;
  }

  async getUsersWithAdminNotes(userId: number): Promise<UserEntity | null> {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      include: {
        adminNotes: true,
      },
    });
    return user ? this.toDomainEntity(user) : null;
  }
}