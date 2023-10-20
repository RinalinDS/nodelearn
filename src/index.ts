import express, {Request, Response} from 'express';
import cors from 'cors'


const app = express();
app.use(express.json());
app.use(cors({
  methods: ['GET', 'POST', 'DELETE', 'UPDATE', 'PUT', 'PATCH'],
}));


const PORT = 5000;

app.listen(PORT, () => {
  console.log(
    `Server running on ${PORT}.`
  )
});


type BookType = {
  id: number;
  title: string | null;
  author: string | null;
}
type RequestPostPutPatchType = Partial<BookType>

let numberId = 0

let books: BookType[] = [
  {id: numberId++, title: 'Fan of knives', author: 'Joe'},
  {id: numberId++, title: 'Backstab', author: 'John'},
  {id: numberId++, title: 'Preparation', author: 'Jess'}
]


app.get('/books', (req, res) => {
  res.status(200).json({
    books
  });
})

app.get('/books/:id', (req, res) => {
  const {id} = req.params;
  const book = books.find((book) => book.id === +id);
  if (book) {
    res.status(200).json({
      book
    });
  } else {
    res.status(404).json({
      error: 'Book not found',
    });
  }
})

app.post('/books', (req: Request<{}, {}, RequestPostPutPatchType>, res) => {
  const requestBody = req.body
  const {title, author} = requestBody
  // Но тогда я разрешаю создавать объект с title: null , author: null ?
  if ((requestBody.hasOwnProperty('title') && title !== undefined) && (requestBody.hasOwnProperty('author') && author !== undefined)) {
    const newBook = {title, author, id: numberId++}
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
    if (requestBody.hasOwnProperty('title') && title !== undefined) {
      books[bookIndex].title = title;
    }
    if (requestBody.hasOwnProperty('author') && author !== undefined) {
      books[bookIndex].author = author;
    }

    res.status(200).json({
      book: books[bookIndex],
    });
    return
  } else {
    if ((requestBody.hasOwnProperty('title') && title !== undefined) && (requestBody.hasOwnProperty('author') && author !== undefined)) {
      const newBook: BookType = {id: numberId++, title, author};
      books.push(newBook);
      res.status(201).json({
        book: newBook,
      });
      return
    }
  }
  res.status(404).json({
    error: 'Book not found',
  });

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


