import { Teacher } from "@/entities/teacher.entity";
import { User } from "@/entities/user.entity";
import { MigrationInterface, QueryRunner } from "typeorm";

export class UserPadrao1738694094830 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
            // Obtendo os repositórios das entidades
            const userRepository = queryRunner.manager.getRepository(User);
            const teacherRepository = queryRunner.manager.getRepository(Teacher);

            // Criando o usuário administrador
            const adminUser = userRepository.create({
            email: 'admin@admin.com',
            password: '$2a$08$FPXyZj3r.wkakXYkdOJt..4VXKFW/iPJl3bGw/MDhhn8KLkjItZtW',
            name: 'admin',
            });

            // Salvando no banco de dados
            await userRepository.save(adminUser);

            // Criando o professor vinculado ao usuário criado
            const adminTeacher = teacherRepository.create({
            user: adminUser, // Relacionamento
            status: 1,
            });

            // Salvando no banco de dados
            await teacherRepository.save(adminTeacher);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        const userRepository = queryRunner.manager.getRepository(User);
        const teacherRepository = queryRunner.manager.getRepository(Teacher);
    
        // Buscando o usuário pelo email
        const adminUser = await userRepository.findOne({
          where: { email: 'admin@admin.com' },
        });
    
        if (adminUser) {
          // Removendo o professor vinculado ao usuário
          await teacherRepository.delete({ user: adminUser });
    
          // Removendo o usuário administrador
          await userRepository.delete({ email: 'admin@admin.com' });
        }
    }

}
