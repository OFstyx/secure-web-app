# Лабораторная работа №2
> Цель работы: Поиск и устранение SQL Injection.
## Задание 1

1. Список книг и авторов
![Screenshot_194](https://user-images.githubusercontent.com/91325950/146641469-3d62348e-8875-4c26-9492-fe9e13ffccd1.png)


2. Обнаружение sql инъекции
При вводе ') в фильтр, в браузере выводится сообщение об ошибке и запрос к базе данных
![Screenshot_195](https://user-images.githubusercontent.com/91325950/146641488-34c7abd1-164f-45c8-8a8b-5a265142f247.png)

2.1. Обход фильтра
![Screenshot_196](https://user-images.githubusercontent.com/91325950/146641493-634ec23a-ae30-48d6-ad26-add133353579.png)


2.2. Получение данных из таблицы users
![Screenshot_197](https://user-images.githubusercontent.com/91325950/146641502-5c5526ef-a00b-4666-a022-e0a6a1c81d69.png)

2.3. Похищение пароля для пользователя IlonMask
![Screenshot_198](https://user-images.githubusercontent.com/91325950/146641511-03470a2a-1423-4235-a235-68cae3af0992.png)

3. Исправление уязвимости

Уязавимость была исправлена параметризацией запроса:

![Screenshot_199](https://user-images.githubusercontent.com/91325950/146641516-82df764f-fd9a-47f8-bdd8-fbf18383e519.png)

![Screenshot_200](https://user-images.githubusercontent.com/91325950/146641527-096a5e9f-9017-45fc-96d0-f9807f0b5a90.png)

![Screenshot_201](https://user-images.githubusercontent.com/91325950/146641530-2b83eff7-fbc9-4e6a-9ab2-a8122b04bebb.png)

![Screenshot_202](https://user-images.githubusercontent.com/91325950/146641535-b31b60e2-8d8e-484e-bdd7-af612af1e0a5.png)

