# LEARNING-MONO
## https://syntax.fun/

### Данный сайт позволяет пройти тестирование на знание языков программирования/технологий 
### Выбери интересующий тебя раздел, и пройди тестирование на знание

https://user-images.githubusercontent.com/75541723/201732047-05cdc6b7-c800-4ebf-90fb-c7a3e2f61e87.mp4

## Проект представляет собой Single Page Application, так же является монорепозиторием, в процессе разработки ипользовал систему сборки Nx + Nrwl

## Стек технологий используемый в проекте

### FRONTEND
- Vue-TS
- HTML
- CSS

### BACKEND
- Node.js
- PostgreSQL
- Express
- Axios
- Prisma
- Docker
- Nginx

## Запуск:
- Необходимо запустить команду "prisma-generate" и сгенерировать схему Prisma (команда по запуску в корне папки backend в файле project.json)
- Так же нужно создать .env переменную в корне проекта в которую записать следующие строки с своими значениями 

 ```
VITE_SERVER_URL=http://localhost:3030
BUILDKIT_PROGRESS=plain
DATABASE_URL=postgres://****:****@****:5432/prod?schema=learning
CLIENT_URL=http://localhost:3000
 ```


## Планы на будующее:
- [X] CI/CD
- [ ] Добавить анимаций
- [ ] Переписать CSS на SCSS
- [ ] Авторизация
- [ ] Аутентификация
- [ ] Регистрация
- [ ] Прогресс прохождения тестов пользователя
- [ ] Возможность предложить свой вопрос с ответами через форму




