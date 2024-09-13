import { TeacherRepository } from "@/repositories/pg/teacher.repository";
import { CreateTeacherUseCase } from "../teacher/create-teacher";


export function makeCreateTeacherUseCase() {
    const teacherRepository = new TeacherRepository();
    const createTeacherUseCase = new CreateTeacherUseCase(teacherRepository);
    return createTeacherUseCase;
}