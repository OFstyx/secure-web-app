# Лабораторная работа №3
> Цель работы: Поиск и устранение XSS уязвимостей.
## Задание 1

1. Список книг и авторов
![Screenshot_203](https://user-images.githubusercontent.com/91325950/146641563-9fb5eeb7-b619-4425-9a17-89493b986fd7.png)


2. Обнаружим уязвимости:

2.1. Reflected XSS

При вводе кода в фильтр выполнится скрипт:

![Screenshot_205](https://user-images.githubusercontent.com/91325950/146641569-e865693e-d5bf-445f-b451-ccea1a7b17d6.png)

2.2. Persisted (Stored) XSS

![Screenshot_206](https://user-images.githubusercontent.com/91325950/146641575-879818cc-9880-46fc-986a-097868224f08.png)

Браузер интерпретирует введенный html, следовательно, внедряем JS:

![Screenshot_209](https://user-images.githubusercontent.com/91325950/146641588-26b63473-55dd-4fed-8db9-0e5b3b8931d2.png)

![Screenshot_210](https://user-images.githubusercontent.com/91325950/146641591-14fe17f7-cb4b-4c90-a759-29a521415c58.png)


2.3. Cookie Injection

Текст над фильтром отображает значение текущей cookie:

![Screenshot_211](https://user-images.githubusercontent.com/91325950/146641596-eefef6ab-ea7d-4f21-8e60-f8a6241b32db.png)

И интерпретирует код:

![Screenshot_212](https://user-images.githubusercontent.com/91325950/146641603-483a16ec-4519-430a-aa15-0e8b73f673b1.png)

2.4. Session hijacking

Мы можем захватит сессию, похитив cookie:

Reflected XSS:
![Screenshot_213](https://user-images.githubusercontent.com/91325950/146641611-ed829ceb-c11d-405d-8c9d-49e7cf47bc47.png)
Persisted (Stored) XSS:
![Screenshot_214](https://user-images.githubusercontent.com/91325950/146641621-d1df8a8b-cd46-433f-a858-97c5a0d9ef0b.png)
Cookie Injection:
![Screenshot_215](https://user-images.githubusercontent.com/91325950/146641637-7c968cbf-d521-40e2-8eb4-c61de02914d6.png)


3. Исправим уязвимости

3.1. Session hijacking
Для устранения уязвимости установим атрибут httpOnly:

![Screenshot_216](https://user-images.githubusercontent.com/91325950/146641655-56143c07-afcc-4e4a-b1fd-b460e2a79f0a.png)

Заметим, что внедренный код все еще выполняется, но у него нет доступа к cookie:

![Screenshot_217](https://user-images.githubusercontent.com/91325950/146641663-42d925f8-7586-436f-9de3-bfbbc2f0b2a1.png)

3.2. Persisted (Stored) XSS:
Включим экранирование в шаблонизаторе pug:

![Screenshot_218](https://user-images.githubusercontent.com/91325950/146641666-b59aae8f-6cf5-4e52-9c61-d78c33361434.png)

Теперь внедренный код не интерпретируется:

![Screenshot_219](https://user-images.githubusercontent.com/91325950/146641680-4751391b-f375-4e5b-9aab-da474ff5eec5.png)

3.3. Reflected XSS & Cookie Injection
Добавим HTTP-заголовок Content-Security-Policy, в котором укажем безопасный источник загрузки скриптов:

![Screenshot_220](https://user-images.githubusercontent.com/91325950/146641684-a8609c9b-ada7-429b-89a5-cdf822f1ee25.png)

Данные уязвимости больше нельзя эксплуатировать:

Reflected XSS
![Screenshot_221](https://user-images.githubusercontent.com/91325950/146641693-128b89da-5d79-4887-9a0b-4763c7f558e8.png)
Cookie Injection
![Screenshot_222](https://user-images.githubusercontent.com/91325950/146641695-02f8c52e-1759-444f-8acc-578491b59d53.png)
