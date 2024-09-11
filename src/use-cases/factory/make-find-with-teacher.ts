import { UserRepository } from "@/repositories/pg/user.repository";
import { FindWithTeacherUseCase } from "../teacher/find-with-teacher";

export function makeFindWithTeacherUseCase() {
    const userRepository = new UserRepository();
    const findWithTeacherUseCase = new FindWithTeacherUseCase(userRepository);
    return findWithTeacherUseCase;
}