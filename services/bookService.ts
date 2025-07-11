
  import { Book, Review } from '../types';
  
  const generateId = (): string => Math.random().toString(36).substr(2, 9);
  
  const sampleReviews: Review[] = [
    { id: generateId(), reviewerName: "Alice Wonderland", rating: 5, comment: "Absolutely captivating! A must-read.", date: "2023-01-15" },
    { id: generateId(), reviewerName: "Bob The Builder", rating: 4, comment: "Great story, good characters.", date: "2023-02-01" },
    { id: generateId(), reviewerName: "Charlie Brown", rating: 3, comment: "It was okay, dragged a bit in the middle.", date: "2023-03-10" },
    { id: generateId(), reviewerName: "Diana Prince", rating: 5, comment: "An instant classic. Loved every page!", date: "2023-04-05" },
    { id: generateId(), reviewerName: "Edward Scissorhands", rating: 4, comment: "Unique and thought-provoking.", date: "2023-05-20" },
  ];
  
  const mockBooks: Book[] = [
    {
      id: '1',
      title: "The Midnight Library",
      author: "Matt Haig",
      genre: "Fiction",
      descriptionShort: "Between life and death there is a library, and within that library, the shelves go on forever.",
      descriptionFull: "Nora Seed finds herself in the Midnight Library, where she has the chance to undo her regrets and try out different lives. A novel about life, death, and the choices we make.",
      price: 15.99,
      coverImageUrl: "https://picsum.photos/seed/midnightlibrary/400/600",
      rating: 4.5,
      reviews: sampleReviews.slice(0,2),
      isbn: "978-0525559474",
      publisher: "Viking",
      publishedDate: "2020-08-13",
      pages: 304,
      language: "English",
      samplePreviewText: "Chapter 1: The End. Nora Seed decided to die. It was a Tuesday. Or maybe a Wednesday. The days had begun to blur...",
      isFeatured: true,
    },
    {
      id: '2',
      title: "Project Hail Mary",
      author: "Andy Weir",
      genre: "Science Fiction",
      descriptionShort: "An amnesiac astronaut wakes up on a solo mission to save humanity.",
      descriptionFull: "Ryland Grace is the sole survivor on a desperate, last-chance mission—and if he fails, humanity and the earth itself will perish. Except that right now, he doesn't know that. He can't even remember his own name, let alone the nature of his assignment or how to complete it.",
      price: 18.50,
      coverImageUrl: "https://picsum.photos/seed/hailmary/400/600",
      rating: 4.8,
      reviews: sampleReviews.slice(1,3),
      isbn: "978-0593135204",
      publisher: "Ballantine Books",
      publishedDate: "2021-05-04",
      pages: 496,
      language: "English",
      samplePreviewText: "Waking up was a gradual process. First, a dim awareness of existence. Then, pain. Lots of pain...",
      isFeatured: true,
    },
    {
      id: '3',
      title: "The Silent Patient",
      author: "Alex Michaelides",
      genre: "Thriller",
      descriptionShort: "A psychotherapist's obsession with a silent patient who murdered her husband.",
      descriptionFull: "Alicia Berenson’s life is seemingly perfect. A famous painter married to an in-demand fashion photographer, she lives in a grand house with big windows overlooking a park in one of London’s most desirable areas. One evening her husband Gabriel returns home late from a fashion shoot, and Alicia shoots him five times in the face, and then never speaks another word.",
      price: 12.75,
      coverImageUrl: "https://picsum.photos/seed/silentpatient/400/600",
      rating: 4.2,
      reviews: sampleReviews.slice(2,4),
      isbn: "978-1250301697",
      publisher: "Celadon Books",
      publishedDate: "2019-02-05",
      pages: 336,
      language: "English",
      samplePreviewText: "Theo Faber was a psychotherapist, and he knew from the start that Alicia Berenson was a special case...",
      isFeatured: false,
    },
    {
      id: '4',
      title: "Klara and the Sun",
      author: "Kazuo Ishiguro",
      genre: "Fiction",
      descriptionShort: "A story of an Artificial Friend with outstanding observational qualities.",
      descriptionFull: "Klara and the Sun tells the story of Klara, an Artificial Friend with outstanding observational qualities, who, from her place in the store, watches carefully the behavior of those who come in to browse, and of those who pass on the street outside. She remains hopeful that a customer will soon choose her.",
      price: 22.00,
      coverImageUrl: "https://picsum.photos/seed/klarasun/400/600",
      rating: 4.6,
      reviews: sampleReviews.slice(3,5),
      isbn: "978-0593318171",
      publisher: "Knopf",
      publishedDate: "2021-03-02",
      pages: 320,
      language: "English",
      samplePreviewText: "When I was new, the Manager said, 'Klara, you have such a keen eye. You see things others don't.'...",
      isFeatured: true,
    },
    {
      id: '5',
      title: "The Four Winds",
      author: "Kristin Hannah",
      genre: "Historical Fiction",
      descriptionShort: "A powerful American epic about love and heroism and hope, set during the Great Depression.",
      descriptionFull: "Texas, 1921. A time of abundance. The Great War is over, the bounty of the land is plentiful, and America is on the brink of a new and optimistic era. But for Elsa Wolcott, deemed too old to marry in a time when marriage is a woman’s only option, the future seems bleak. Until the night she meets Rafe Martinelli and decides to change the direction of her life.",
      price: 14.99,
      coverImageUrl: "https://picsum.photos/seed/fourwinds/400/600",
      rating: 4.3,
      reviews: sampleReviews.slice(0,1).concat(sampleReviews.slice(4,5)),
      isbn: "978-0312577243",
      publisher: "St. Martin's Press",
      publishedDate: "2021-02-02",
      pages: 464,
      language: "English",
      samplePreviewText: "Dust. It was the only thing Elsa had known for months. It coated everything, a fine, gritty layer...",
      isFeatured: false,
    },
    {
      id: '6',
      title: "Sapiens: A Brief History of Humankind",
      author: "Yuval Noah Harari",
      genre: "Non-Fiction",
      descriptionShort: "A groundbreaking narrative of humanity's creation and evolution.",
      descriptionFull: "Sapiens: A Brief History of Humankind explores the history of humankind from the Stone Age to the present day. Harari focuses on key historical events and developments, such as the Cognitive Revolution, the Agricultural Revolution, the unification of humankind, and the Scientific Revolution.",
      price: 20.00,
      coverImageUrl: "https://picsum.photos/seed/sapiens/400/600",
      rating: 4.9,
      reviews: [sampleReviews[0], sampleReviews[3]],
      isbn: "978-0062316097",
      publisher: "Harper",
      publishedDate: "2015-02-10",
      pages: 464,
      language: "English",
      samplePreviewText: "About 13.5 billion years ago, matter, energy, time and space came into being in what is known as the Big Bang...",
      isFeatured: true,
    },
    {
      id: '7',
      title: "Where the Crawdads Sing",
      author: "Delia Owens",
      genre: "Mystery",
      descriptionShort: "A heartbreaking coming-of-age story and a surprising tale of possible murder.",
      descriptionFull: "For years, rumors of the 'Marsh Girl' have haunted Barkley Cove, a quiet town on the North Carolina coast. So in late 1969, when handsome Chase Andrews is found dead, the locals immediately suspect Kya Clark, the so-called Marsh Girl. But Kya is not what they say.",
      price: 10.80,
      coverImageUrl: "https://picsum.photos/seed/crawdads/400/600",
      rating: 4.7,
      reviews: [sampleReviews[1], sampleReviews[4]],
      isbn: "978-0735219090",
      publisher: "G.P. Putnam's Sons",
      publishedDate: "2018-08-14",
      pages: 384,
      language: "English",
      samplePreviewText: "The morning burned so August-hot, the marsh's moist breath hung the oaks and pines with fog...",
      isFeatured: false,
    },
    {
      id: '8',
      title: "Atomic Habits",
      author: "James Clear",
      genre: "Self-Help",
      descriptionShort: "An easy & proven way to build good habits & break bad ones.",
      descriptionFull: "No matter your goals, Atomic Habits offers a proven framework for improving--every day. James Clear, one of the world's leading experts on habit formation, reveals practical strategies that will teach you exactly how to form good habits, break bad ones, and master the tiny behaviors that lead to remarkable results.",
      price: 16.20,
      coverImageUrl: "https://picsum.photos/seed/atomichabits/400/600",
      rating: 4.9,
      reviews: [sampleReviews[3], sampleReviews[0]],
      isbn: "978-0735211292",
      publisher: "Avery",
      publishedDate: "2018-10-16",
      pages: 320,
      language: "English",
      samplePreviewText: "An atomic habit is a little habit that is part of a larger system. Just as atoms are the building blocks of molecules, atomic habits are the building blocks of remarkable results.",
      isFeatured: true,
    },
     {
      id: '9',
      title: "Dune",
      author: "Frank Herbert",
      genre: "Science Fiction",
      descriptionShort: "A desert planet, a colossal sandworm, and a prophecy of a messiah.",
      descriptionFull: "Set on the desert planet Arrakis, Dune is the story of the boy Paul Atreides, heir to a noble family tasked with ruling an inhospitable world where the only thing of value is the 'spice' melange, a drug capable of extending life and enhancing consciousness. ",
      price: 13.50,
      coverImageUrl: "https://picsum.photos/seed/dune/400/600",
      rating: 4.8,
      reviews: sampleReviews.slice(0,3),
      isbn: "978-0441172719",
      publisher: "Chilton Books",
      publishedDate: "1965-08-01",
      pages: 412,
      language: "English",
      samplePreviewText: "A beginning is the time for taking the most delicate care that the balances are correct. This every sister of the Bene Gesserit knows.",
      isFeatured: false,
    },
    {
      id: '10',
      title: "The Vanishing Half",
      author: "Brit Bennett",
      genre: "Fiction",
      descriptionShort: "Twin sisters, inseparable as children, choose to live in two very different worlds.",
      descriptionFull: "The Vignes twin sisters will always be identical. But after growing up together in a small, southern black community and running away at age sixteen, it's not just the shape of their daily lives that is different as adults, it's everything: their families, their communities, their racial identities.",
      price: 17.55,
      coverImageUrl: "https://picsum.photos/seed/vanishinghalf/400/600",
      rating: 4.4,
      reviews: sampleReviews.slice(2,5),
      isbn: "978-0525536291",
      publisher: "Riverhead Books",
      publishedDate: "2020-06-02",
      pages: 352,
      language: "English",
      samplePreviewText: "The Vignes twins were identical. But they were not the same.",
      isFeatured: true,
    },
    {
      id: '11',
      title: "Educated: A Memoir",
      author: "Tara Westover",
      genre: "Biography",
      descriptionShort: "A young woman's struggle for education against all odds.",
      descriptionFull: "Tara Westover was seventeen the first time she set foot in a classroom. Born to survivalists in the mountains of Idaho, she prepared for the end of the world by stockpiling home-canned peaches and sleeping with her 'head-for-the-hills bag'.",
      price: 15.30,
      coverImageUrl: "https://picsum.photos/seed/educated/400/600",
      rating: 4.7,
      reviews: [sampleReviews[4], sampleReviews[1]],
      isbn: "978-0399590504",
      publisher: "Random House",
      publishedDate: "2018-02-20",
      pages: 352,
      language: "English",
      samplePreviewText: "I'm standing on the red railway car that sits abandoned next to the barn. The wind soars, whipping my hair across my face and pushing a chill down the open neck of my shirt.",
      isFeatured: false,
    },
    {
      id: '12',
      title: "The Song of Achilles",
      author: "Madeline Miller",
      genre: "Historical Fiction",
      descriptionShort: "A retelling of the Trojan War through the eyes of Patroclus.",
      descriptionFull: "Greece in the age of heroes. Patroclus, an awkward young prince, has been exiled to the court of King Peleus and his perfect son Achilles. Despite their differences, Achilles befriends the shamed prince, and as they grow into young men skilled in the arts of war and medicine, their bond blossoms into something deeper.",
      price: 11.89,
      coverImageUrl: "https://picsum.photos/seed/achilles/400/600",
      rating: 4.6,
      reviews: [sampleReviews[0], sampleReviews[2]],
      isbn: "978-0062060624",
      publisher: "Ecco",
      publishedDate: "2012-03-06",
      pages: 416,
      language: "English",
      samplePreviewText: "My father was a king and the son of kings. He was a short man, as most of us were, and built like a bull, all shoulders.",
      isFeatured: true,
    }
  ];
  
  export const getAllBooks = async (): Promise<Book[]> => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));
    return mockBooks;
  };
  
  export const getBookById = async (id: string): Promise<Book | undefined> => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 300));
    return mockBooks.find(book => book.id === id);
  };
  
  export const getFeaturedBooks = async (): Promise<Book[]> => {
    await new Promise(resolve => setTimeout(resolve, 400));
    return mockBooks.filter(book => book.isFeatured);
  };
  
      