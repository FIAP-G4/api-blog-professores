import { DataSource } from 'typeorm'
import { env } from '@/env'
import { CreateTablesWithConstraints1725488490452 } from './migrations/1725488490452-CreateTablesWithConstraints'
import { Subject } from '@/entities/subject.entity'
import { Tag } from '@/entities/tag.entity'
import { User } from '@/entities/user.entity'
import { Teacher } from '@/entities/teacher.entity'
import { Post } from '@/entities/post.entity'
import { Comment } from '@/entities/comment.entity'
import { AlterCommentsTable1726544526547 } from './migrations/1726544526547-AlterCommentsTable'
import { AlterTableUsersToUniqueUsername1726795708879 } from './migrations/1726795708879-AlterTableUsersToUniqueUsername'
import { AlterTableUsersToChangeUsernameToEmail1727228921260 } from './migrations/1727228921260-AlterTableUsersToChangeUsernameToEmail'
import { DropTeachersUserIdIndex1727742920773 } from './migrations/1727742920773-DropTeachersUserIdIndex'
import { Student } from '@/entities/student.entity'
import { AlterCommentsIdToUUID1728184531106 } from './migrations/1728184531106-AlterCommentsIdToUUID'
import { AddNameColumnToUsers1728226144255 } from './migrations/1728226144255-AddNameColumnToUsers'
import { DropNameColumnFromTeachers1728226361845 } from './migrations/1728226361845-DropNameColumnFromTeachers'
import { DropNameColumnFromStudents1728226454832 } from './migrations/1728226454832-DropNameColumnFromStudents'
import { AlterTeacherSubjectsStatusColumnMigration1728432062988 } from './migrations/1728432062988-AlterTeacherSubjectsStatusColumnMigration'
import { PostViewed } from '@/entities/post-viewed.entity'
import { AddPathImgToPosts1729423314496 } from './migrations/1729423314496-AddPathImgToPosts'
import { UpdatePostsColumns1729717659262 } from './migrations/1729717659262-UpdatePostsColumns'
import { ReatePasswordResetTokens1734048446545 } from './migrations/1734048446545-reatePasswordResetTokens'
import { PasswordResetToken } from '@/entities/password-reset-tokens.entity'
import { UserPadrao1738694094830 } from './migrations/1738694094830-userPadrao'

export const appDataSource = new DataSource({
  type: 'postgres',
  host: env.DATABASE_HOST,
  port: env.DATABASE_PORT,
  username: env.DATABASE_USER,
  password: env.DATABASE_PASSWORD,
  database: env.DATABASE_NAME,
  // entities: ['src/entities/**/*.entity.ts'],
  entities: [
    Subject,
    Tag,
    User,
    Teacher,
    Post,
    Student,
    PostViewed,
    Comment,
    PasswordResetToken,
  ],
  migrations: [
    CreateTablesWithConstraints1725488490452,
    AlterCommentsTable1726544526547,
    AlterTableUsersToUniqueUsername1726795708879,
    AlterTableUsersToChangeUsernameToEmail1727228921260,
    DropTeachersUserIdIndex1727742920773,
    AlterCommentsIdToUUID1728184531106,
    AddNameColumnToUsers1728226144255,
    DropNameColumnFromTeachers1728226361845,
    DropNameColumnFromStudents1728226454832,
    AlterTeacherSubjectsStatusColumnMigration1728432062988,
    AddPathImgToPosts1729423314496,
    UpdatePostsColumns1729717659262,
    ReatePasswordResetTokens1734048446545,
    UserPadrao1738694094830
  ],
  logging: env.NODE_ENV === 'development',
})

appDataSource
  .initialize()
  .then(() => {
    console.log('Database with typeorm connected')
  })
  .catch((error) => {
    console.error(`Error connecting typeorm to the database: ${error}`)
  })
