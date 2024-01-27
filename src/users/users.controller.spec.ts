import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { PrismaModule } from '../prisma/prisma.module';
import { CreateUserDto } from './dto/create-user.dto';
describe('UsersController', () => {
  let controller: UsersController;
  let service: UsersService;
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [PrismaModule],
      controllers: [UsersController],
      providers: [UsersService],
    }).compile();

    controller = module.get<UsersController>(UsersController);
    service = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('user test', () => {
    it('should return an array of users', async () => {
      const users = await controller.findAll();

      expect(users).toBeDefined();
    });

    it('should create a user', async () => {
      const createUserDto: CreateUserDto = {
        name: 'John Doe',
        email: 'john@example.com',
        password: 'pass123',
        provider: 'email',
        resetToken: null,
        expiryDate: null,
      };

      const createUserSpy = jest
        .spyOn(service, 'create')
        .mockImplementation(async () => {
          return { id: 1, ...createUserDto };
        });

      const result = await controller.create(createUserDto);

      expect(createUserSpy).toHaveBeenCalledWith(createUserDto);
      expect(result).toEqual({ id: 1, ...createUserDto });
    });

    it('should handle duplicated user', async () => {
      const createUserDto: CreateUserDto = {
        name: 'John Doe',
        email: 'john@example.com',
        password: 'pass123',
        provider: 'email',
        resetToken: null,
        expiryDate: null,
      };

      // Mock the service's findByEmail method to return a user, indicating the email is duplicated
      jest.spyOn(service, 'findUserByEmail').mockImplementation(async () => {
        return { id: 1, ...createUserDto };
      });

      // Mock the service's createUser method
      jest.spyOn(service, 'create');

      // Make the request to the controller
      await expect(controller.create(createUserDto)).rejects.toThrow(
        'User already exists',
      );

      // Assert that the createUser method was not called (since the email is duplicated)
      expect(service.create).not.toHaveBeenCalled();
    });
  });
});
