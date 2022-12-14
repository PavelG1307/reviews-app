import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { SequelizeModule } from '@nestjs/sequelize'
import { getEnvFilePath } from './core/utils'
import { ReviewsModule } from './reviews/reviews.module'
import { Review } from './reviews/models/review'

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: getEnvFilePath()
    }),
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      username: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      models: [Review],
      autoLoadModels: true,
      logging: process.env.NODE_ENV === 'dev' ? console.log : false
    }),
    ReviewsModule
  ]
})
export class AppModule {}
