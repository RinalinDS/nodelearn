import express, {Request, Response} from 'express';

const app = express();
app.use(express.json());

const PORT = 5000;

app.listen(PORT, () => {
  console.log(
    `Server running on ${PORT}.`
  )
});


type BookType = {
  id: number;
  title: string;
  author: string;
}
let numberId = 0

let books: BookType[] = [
  {id: numberId++, title: 'Fan of knives', author: 'Joe'},
  {id: numberId++, title: 'Backstab', author: 'John'},
  {id: numberId++, title: 'Preparation', author: 'Jess'}
]

type RequestPostPutPatchType = {
  title?: string
  author?: string
  id?: string
}

app.get('/books', (req, res) => {
  res.status(200).json({
    books
  });
})

app.post('/books', (req: Request<{}, {}, RequestPostPutPatchType>, res) => {
  const requestBody = req.body

  if (requestBody.title && requestBody.author) {
    const newBook: BookType = {title: requestBody.title, author: requestBody.author, id: numberId++}
    books.push(newBook)
    res.status(201).json({
      book: newBook
    });
    return
  }
  res.status(400).json({
    error: 'You need title and author to be able to create'
  })

})
app.put('/books/:id', (req: Request<{ id: string }, {}, RequestPostPutPatchType>, res) => {
  const {id} = req.params;
  const requestBody = req.body;
  const {title, author} = requestBody;

  const bookIndex = books.findIndex((book) => book.id === +id);

  if (bookIndex !== -1) {
    if (title) {
      books[bookIndex].title = title;
    }
    if (author) {
      books[bookIndex].author = author;
    }

    res.status(200).json({
      book: books[bookIndex],
    });
  } else {
    if (title && author) {
      const newBook: BookType = {title, author, id: numberId++};
      books.push(newBook);
      res.status(201).json({
        book: newBook,
      });
    } else {
      res.status(404).json({
        error: 'Book not found',
      });
    }
  }
});
app.patch('/books/:id', (req: Request<{ id: string }, {}, RequestPostPutPatchType>, res) => {
  const {id} = req.params;
  const requestBody = req.body;
  const {title, author} = requestBody;

  const bookIndex = books.findIndex((book) => book.id === +id);

  if (bookIndex !== -1) {
    if (title) {
      books[bookIndex].title = title;
    }
    if (author) {
      books[bookIndex].author = author;
    }

    res.status(200).json({
      book: books[bookIndex],
    });
  } else {
    res.status(404).json({
      error: 'Book not found',
    });
  }

})
app.delete('/books', (req: Request, res: Response) => {
  const {id} = req.body
  console.log(req.body)
  const book = books.find((book) => book.id === +id)
  if (book) {
    books = books.filter((book) => book.id !== id)
    res.status(204).json({})
    return
  }
  res.status(400).json({error: "No such book"})
})


