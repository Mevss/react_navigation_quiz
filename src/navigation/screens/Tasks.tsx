// tasks.ts
export interface Answer {
    content: string;
    isCorrect: boolean;
  }
  
  export interface Question {
    question: string;
    answers: Answer[];
    duration: number;
  }
  
  export interface Task {
    id: string;
    title: string;
    description: string;
    questions: Question[];
  }
  
  export const tasks: Task[] = [
    
    {
      id: 'test-1',
      title: "Test #1", 
      description: "Test z geografii",
      questions: [
        {
          question: "Jaka jest stolica Francji?",
          answers: [
            { content: "PARYŻ", isCorrect: true },
            { content: "MARSYLIA", isCorrect: false },
            { content: "LYON", isCorrect: false },
            { content: "NICEA", isCorrect: false }
          ],
          duration: 20
        }
      ]
    },
    {
      id: 'test-2',
      title: "Test #2",
      description: "Test dotyczący historii starożytnego Rzymu.",
      questions: [
        {
          question: "Który wódz po śmierci Gajusza Mariusza, prowadził wojnę domową z Sullą ?",
          answers: [
            { content: "LUCJUSZ CYNNA", isCorrect: true },
            { content: "JULIUSZ CEZAR", isCorrect: false },
            { content: "LUCJUSZ MURENA", isCorrect: false },
            { content: "MAREK KRASSUS", isCorrect: false }
          ],
          duration: 20
        },
        {
          question: "Które z poniższych miast było stolicą starożytnego Egiptu?",
          answers: [
            { content: "MEMFIS", isCorrect: true },
            { content: "ALEKSANDRIA", isCorrect: false },
            { content: "THEBES", isCorrect: false },
            { content: "RZYM", isCorrect: false }
          ],
          duration: 20
        },
        {
          question: "Kto był pierwszym cesarzem Rzymu?",
          answers: [
            { content: "OCTAWIAN AUGUST", isCorrect: true },
            { content: "CICERO", isCorrect: false },
            { content: "JULIUSZ CEZAR", isCorrect: false },
            { content: "NERO", isCorrect: false }
          ],
          duration: 20
        }
      ]
    },
    {
      id: 'test-3',
      title: "Test #3",
      description: "Test dotyczący historii",
      questions: [
        {
          question: "ttestKtóry wódz po śmierci Gajusza Mariusza, prowadził wojnę domową z Sullą ?",
          answers: [
            { content: "LUCJUSZ CYNNA", isCorrect: true },
            { content: "JULIUSZ CEZAR", isCorrect: false },
            { content: "LUCJUSZ MURENA", isCorrect: false },
            { content: "MAREK KRASSUS", isCorrect: false }
          ],
          duration: 20
        },
        {
          question: "Które z poniższych miast było stolicą starożytnego Egiptu?",
          answers: [
            { content: "MEMFIS", isCorrect: true },
            { content: "ALEKSANDRIA", isCorrect: false },
            { content: "THEBES", isCorrect: false },
            { content: "RZYM", isCorrect: false }
          ],
          duration: 20
        },
        {
          question: "Kto był pierwszym cesarzem Rzymu?",
          answers: [
            { content: "OCTAWIAN AUGUST", isCorrect: true },
            { content: "CICERO", isCorrect: false },
            { content: "JULIUSZ CEZAR", isCorrect: false },
            { content: "NERO", isCorrect: false }
          ],
          duration: 20
        },
        {
          question: "Którdgfe z poniższych miast było stolicą starożytnego Egiptu?",
          answers: [
            { content: "MEMFIS", isCorrect: true },
            { content: "ALEKSANDRIA", isCorrect: false },
            { content: "THEBES", isCorrect: false },
            { content: "RZYM", isCorrect: false }
          ],
          duration: 20
        }
      ]
    },
    {
      id: 'test-4',
      title: "Test #4",
      description: "Test dotsyczący historii starożytnego Rzymu.",
      questions: [
        {
          question: "Który wódz po śmierci Gajusza Mariusza, prowadził wojnę domową z Sullą ?",
          answers: [
            { content: "LUCJUSZ CYNNA", isCorrect: true },
            { content: "JULIUSZ CEZAR", isCorrect: false },
            { content: "LUCJUSZ MURENA", isCorrect: false },
            { content: "MAREK KRASSUS", isCorrect: false }
          ],
          duration: 20
        },
        {
          question: "Które z poniższych miast było stolicą starożytnego Egiptu?",
          answers: [
            { content: "MEMFIS", isCorrect: true },
            { content: "ALEKSANDRIA", isCorrect: false },
            { content: "THEBES", isCorrect: false },
            { content: "RZYM", isCorrect: false }
          ],
          duration: 20
        },
        {
          question: "Kto był pierwszym cesarzem Rzymu?",
          answers: [
            { content: "OCTAWIAN AUGUST", isCorrect: true },
            { content: "CICERO", isCorrect: false },
            { content: "JULIUSZ CEZAR", isCorrect: false },
            { content: "NERO", isCorrect: false }
          ],
          duration: 20
        }
      ]
    },
    {
      id: 'test-5',
      title: "Test #5",
      description: "Test dotyczący historii starożytnego Rzymu.",
      questions: [
        {
          question: "Który wódz po śmierci Gajusza Mariusza, prowadził wojnę domową z Sullą ?",
          answers: [
            { content: "LUCJUSZ CYNNA", isCorrect: true },
            { content: "JULIUSZ CEZAR", isCorrect: false },
            { content: "LUCJUSZ MURENA", isCorrect: false },
            { content: "MAREK KRASSUS", isCorrect: false }
          ],
          duration: 20
        },
        {
          question: "Które z poniższych miast było stolicą starożytnego Egiptu?",
          answers: [
            { content: "MEMFIS", isCorrect: true },
            { content: "ALEKSANDRIA", isCorrect: false },
            { content: "THEBES", isCorrect: false },
            { content: "RZYM", isCorrect: false }
          ],
          duration: 20
        },
        {
          question: "Kto był pierwszym cesarzem Rzymu?",
          answers: [
            { content: "OCTAWIAN AUGUST", isCorrect: true },
            { content: "CICERO", isCorrect: false },
            { content: "JULIUSZ CEZAR", isCorrect: false },
            { content: "NERO", isCorrect: false }
          ],
          duration: 20
        }
      ]
    },
  ];
  
  // Funkcja do pobierania testu po ID
  export const getTaskById = (id: string): Task | undefined => {
    return tasks.find(task => task.id === id);
  };
  
  // Funkcja do pobierania wszystkich dostępnych testów
  export const getAllTasks = (): Task[] => {
    return tasks;
  };