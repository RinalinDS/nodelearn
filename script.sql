CREATE DATABASE BooksDatabase;
USE BooksDatabase;

CREATE TABLE Authors(
    AuthorID INT PRIMARY KEY,
    AuthorName NVARCHAR(100) NOT NULL
);

CREATE TABLE Books(
    BookID INT PRIMARY KEY,
    BookName NVARCHAR(100) NOT NULL,
    PublicationYear INT
);

CREATE TABLE Book_Author(
    BookID INT,
    AuthorID INT,
    PRIMARY KEY (BookID, AuthorID),
    FOREIGN KEY (BookID) REFERENCES Books(BookID),
    FOREIGN KEY (AuthorID) REFERENCES Authors(AuthorID)
);


INSERT INTO Authors (AuthorID, AuthorName) VALUES
(1, 'Александр Солженицын'),
(2, 'Виктор Пелевин'),
(3, 'Борис Акунин'),
(4, 'Сергей Есенин'),
(5, 'Анна Ахматова'),
(6, 'Федор Достоевский'),
(7, 'Антон Чехов'),
(8, 'Михаил Булгаков'),
(9, 'Лев Толстой'),
(10, 'Иван Тургенев');

INSERT INTO Books (BookID, BookName, PublicationYear) VALUES
(1, 'В круге первом', 1968),
(2, 'Чапаев и Пустота', 1996),
(3, 'Азазель', 1998),
(4, 'Анна Снегина', 1925),
(5, 'Белая стая', 1917),
(6, 'Преступление и наказание', 1866),
(7, 'Вишневый сад', 1904),
(8, 'Мастер и Маргарита', 1966),
(9, 'Война и мир', 1869),
(10, 'Отцы и дети', 1862),
(11, 'Книга 2 Солженицына', 1970),
(12, 'Книга 3 Солженицына', 1972),
(13, 'Книга 2 Пелевина', 1998),
(14, 'Книга 3 Пелевина', 2000),
(15, 'Книга 2 Акунина', 2000),
(16, 'Книга 3 Акунина', 2002);

INSERT INTO Book_Author (BookID, AuthorID) VALUES
(1, 1),
(11, 1),
(12, 1),
(2, 2),
(13, 2),
(14, 2),
(3, 3),
(15, 3),
(16, 3),
(4, 4),
(5, 5),
(6, 6),
(7, 7),
(8, 8),
(9, 9),
(10, 10);


-- SELECT с WHERE и ORDER BY
SELECT * FROM Books WHERE PublicationYear > 2005 ORDER BY PublicationYear DESC;

-- SELECT с GROUP BY и COUNT
SELECT AuthorID, COUNT(*) as BooksCount FROM Book_Author GROUP BY AuthorID;

-- SELECT с MAX и MIN
SELECT MAX(PublicationYear), MIN(PublicationYear) FROM Books;

-- SELECT с LIMIT
SELECT * FROM Books ORDER BY PublicationYear DESC LIMIT 1;

-- WHERE и ORDER BY
SELECT * FROM Books WHERE PublicationYear BETWEEN 1900 AND 2000 ORDER BY PublicationYear DESC;

-- GROUP BY и COUNT
SELECT AuthorID, COUNT(*) as NumberOfBooks FROM Book_Author GROUP BY AuthorID HAVING COUNT(*) > 1;

-- Запрос с использованием LIMIT
SELECT * FROM Books ORDER BY PublicationYear DESC LIMIT 3;

-- Запрос с использованием UNION
SELECT BookName AS Name FROM Books
UNION ALL
SELECT AuthorName FROM Authors;

-- JOIN, WHERE и GROUP BY
SELECT Authors.AuthorName, COUNT(*) as NumberOfBooks
FROM Authors
JOIN Book_Author ON Authors.AuthorID = Book_Author.AuthorID
WHERE Authors.AuthorName LIKE '%ов'
GROUP BY Authors.AuthorName;

-- JOIN, WHERE, GROUP BY и HAVING
SELECT Authors.AuthorName, COUNT(*) as NumberOfBooks
FROM Authors
JOIN Book_Author ON Authors.AuthorID = Book_Author.AuthorID
WHERE Authors.AuthorName LIKE '%ов'
GROUP BY Authors.AuthorName
HAVING COUNT(*) > 1;