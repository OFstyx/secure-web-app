# Лабораторная работа №3
> Цель работы: Поиск и устранение XSS уязвимостей.
## Задание 1

1. Список книг и авторов
![image](https://user-images.githubusercontent.com/82168526/146250673-84ec30dd-8ec2-413f-821d-c114268b0464.png)


2. Обнаружим уязвимости:

2.1. Reflected XSS

При вводе кода в фильтр выполнится скрипт:

![image](https://user-images.githubusercontent.com/82168526/146250711-0c550137-9a09-4b69-a7e0-4dc1c3a68323.png)

2.2. Persisted (Stored) XSS

![image](https://user-images.githubusercontent.com/82168526/146250754-e7447154-f5ac-410f-916b-4a4d174e01df.png)

Браузер интерпретирует введенный html, следовательно, внедряем JS:

![image](https://user-images.githubusercontent.com/82168526/146250785-30cfe791-18a0-4d1d-b9ea-c2e297e01174.png)

![image](https://user-images.githubusercontent.com/82168526/146250796-1f897a5f-c2f6-4ecd-ad97-8b3b50e98130.png)


2.3. Cookie Injection

Текст над фильтром отображает значение текущей cookie:

![image](https://user-images.githubusercontent.com/82168526/146251002-0dde544b-1d89-4acf-8ca8-a57014278f7b.png)

И интерпретирует код:

![image](https://user-images.githubusercontent.com/82168526/146251027-795240be-f356-4b11-b07f-1cbe28babb4f.png)

2.4. Session hijacking

Мы можем захватит сессию, похитив cookie:

Reflected XSS:
![image](https://user-images.githubusercontent.com/82168526/146251051-6a530b65-0913-4511-8ecd-d5a3634de3df.png)
Persisted (Stored) XSS:
![image](https://user-images.githubusercontent.com/82168526/146251085-64388aeb-7fb1-452b-a1d7-f6c72549a920.png)
![image](https://user-images.githubusercontent.com/82168526/146251100-6fc95f45-3cb2-43cd-b387-fd6ef4bd5964.png)
Cookie Injection:
![image](https://user-images.githubusercontent.com/82168526/146251120-e5db4aae-c5e3-416c-bb1d-145555386ca1.png)

3. Исправим уязвимости

3.1. Session hijacking
Для устранения уязвимости установим атрибут httpOnly:

![image](https://user-images.githubusercontent.com/82168526/146251180-524c668e-f388-4c38-865c-8f6a925e8044.png)

Заметим, что внедренный код все еще выполняется, но у него нет доступа к cookie:

![image](https://user-images.githubusercontent.com/82168526/146251196-8ff6ed7b-f559-496f-be3d-336ab6193a5b.png)

3.2. Persisted (Stored) XSS:
Включим экранирование в шаблонизаторе pug:

![image](https://user-images.githubusercontent.com/82168526/146251220-969f1cba-d812-47e6-8845-ad5e6ba996fb.png)

Теперь внедренный код не интерпретируется:

![image](https://user-images.githubusercontent.com/82168526/146251281-a19bf1b3-c403-43fa-811d-43552f92f81d.png)

3.3. Reflected XSS & Cookie Injection
Добавим HTTP-заголовок Content-Security-Policy, в котором укажем безопасный источник загрузки скриптов:

![image](https://user-images.githubusercontent.com/82168526/146251344-e52b63d6-5feb-4e5c-a8d6-4076ce7d6c2b.png)

Данные уязвимости больше нельзя эксплуатировать:

Reflected XSS
![image](https://user-images.githubusercontent.com/82168526/146251362-78927821-0d98-4bde-a2b3-bfcc195db730.png)
Cookie Injection
![image](https://user-images.githubusercontent.com/82168526/146251374-7d91a958-f406-4d81-948d-7b8ef20f153b.png)
