# Лабораторная работа №2
> Цель работы: Поиск и устранение SQL Injection.
## Задание 1

1. Список книг и авторов
![image](https://user-images.githubusercontent.com/82168526/146243993-f962c682-3052-40cb-8008-0940bb3df3c9.png)

2. Обнаружение sql инъекции
При вводе ') в фильтр, в браузере выводится сообщение об ошибке и запрос к базе данных
![image](https://user-images.githubusercontent.com/82168526/146244103-48183326-514a-447f-b4ae-6ecd8ef41887.png)

2.1. Обход фильтра
![image](https://user-images.githubusercontent.com/82168526/146244120-fa631d05-9899-48c1-9cdd-2422fd31aab0.png)


2.2. Получение данных из таблицы users
![image](https://user-images.githubusercontent.com/82168526/146244144-31241a8a-2a14-4488-b617-2621262b4286.png)

2.3. Похищение пароля для пользователя IlonMask
![image](https://user-images.githubusercontent.com/82168526/146244157-80ed99d1-130e-4a12-8a08-a90eb4130b5b.png)

3. Исправление уязвимости

Уязавимость была исправлена параметризацией запроса:

![image](https://user-images.githubusercontent.com/82168526/146245039-fd80ad0e-7de3-4904-b402-c611ed01fde2.png)

![image](https://user-images.githubusercontent.com/82168526/146244180-986ca404-7e3e-482d-ae7d-0f9734d429e9.png)

![image](https://user-images.githubusercontent.com/82168526/146244194-e6aa3b13-c840-4de5-b012-5853587504ef.png)

![image](https://user-images.githubusercontent.com/82168526/146244215-0486c01d-96d4-4d17-ac5d-8cf5256d84ed.png)

![image](https://user-images.githubusercontent.com/82168526/146244227-719d0089-8018-4f45-a777-cf8ca160567d.png)
