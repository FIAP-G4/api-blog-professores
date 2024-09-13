import { ITeacher } from "@/entities/models/teacher.interface";
import { IUser } from "@/entities/models/user.interface";

export interface IUserRepository {
    findWithTeacher(userId: number): Promise<(IUser & ITeacher) | undefined>;
    findByUsername(username: string): Promise<IUser | undefined>;
    create(user: IUser): Promise<IUser | undefined>;
}