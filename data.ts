import type { Mentorship, StudyGroup } from './types';

export const MENTORSHIPS: Mentorship[] = [
  {
    id: 1,
    mentorName: 'Dr. Alice Johnson',
    mentorTitle: 'Engenheira de React Sênior',
    topic: 'Padrões Avançados de React',
    description: 'Aprofunde-se em hooks, contexto e técnicas de otimização de performance em React. Adequado para desenvolvedores de nível intermediário a avançado.',
    date: '25 de Outubro, 2024',
    duration: '90 minutos',
    tags: ['React', 'Frontend', 'Avançado'],
    avatarUrl: 'https://i.pravatar.cc/150?u=alice',
  },
  {
    id: 2,
    mentorName: 'Bob Williams',
    mentorTitle: 'Líder de Design UX/UI',
    topic: 'Usabilidade em Primeiro Lugar: Uma Introdução ao Design',
    description: 'Aprenda os princípios fundamentais do design centrado no usuário e como aplicá-los para criar experiências digitais intuitivas e envolventes.',
    date: '5 de Novembro, 2024',
    duration: '60 minutos',
    tags: ['UX', 'UI', 'Design'],
    avatarUrl: 'https://i.pravatar.cc/150?u=bob',
  },
  {
    id: 3,
    mentorName: 'Charlie Brown',
    mentorTitle: 'Arquiteto de Backend',
    topic: 'Construindo APIs Escaláveis com Node.js',
    description: 'Explore as melhores práticas para projetar, construir e implantar APIs RESTful robustas usando Node.js, Express e PostgreSQL.',
    date: '12 de Novembro, 2024',
    duration: '2 horas',
    tags: ['Backend', 'Node.js', 'API'],
    avatarUrl: 'https://i.pravatar.cc/150?u=charlie',
  },
];

export const STUDY_GROUPS: StudyGroup[] = [
  {
    id: 1,
    name: 'Magos do JavaScript',
    subject: 'JavaScript Avançado',
    description: 'Um grupo dedicado a dominar as partes complexas do JS, incluindo async/await, closures e prototypes.',
    members: 8,
    maxMembers: 10,
    imageUrl: 'https://blog.betrybe.com/wp-content/uploads/2022/12/image-325.png',
    membersList: [
      { id: '1', name: 'Ana Souza', avatarUrl: 'https://i.pravatar.cc/150?u=ana' },
      { id: '2', name: 'Bruno Lima', avatarUrl: 'https://i.pravatar.cc/150?u=bruno' },
      { id: '3', name: 'Carlos Reis', avatarUrl: 'https://i.pravatar.cc/150?u=carlos' },
    ],
    materials: [
      { id: 1, type: 'pdf', title: 'Guia Completo de Closures.pdf', url: '#', sharedBy: 'Ana Souza', sharedAt: '24/10/2024' },
      { id: 2, type: 'link', title: 'Artigo sobre Async/Await', url: '#', sharedBy: 'Bruno Lima', sharedAt: '23/10/2024' },
      { id: 3, type: 'video', title: 'Palestra sobre Prototypes', url: '#', sharedBy: 'Carlos Reis', sharedAt: '22/10/2024' },
    ],
  },
  {
    id: 2,
    name: 'Campeões do CSS',
    subject: 'CSS Moderno & Tailwind',
    description: 'Vamos conquistar Flexbox, Grid e técnicas avançadas de Tailwind CSS juntos para construir layouts bonitos e responsivos.',
    members: 12,
    maxMembers: 15,
    imageUrl: 'https://www.w3docs.com/uploads/media/default/0001/05/6d07a36ebe6d55273b39440f2391f1d7e6d4092a.png',
    membersList: [
      { id: '4', name: 'Daniela Faria', avatarUrl: 'https://i.pravatar.cc/150?u=daniela' },
      { id: '5', name: 'Eduardo Costa', avatarUrl: 'https://i.pravatar.cc/150?u=eduardo' },
    ],
    materials: [
      { id: 4, type: 'pdf', title: 'Guia Completo de Flexbox.pdf', url: '#', sharedBy: 'Daniela Faria', sharedAt: '20/10/2024' },
      { id: 5, type: 'link', title: 'CSS Tricks: A Complete Guide to Grid', url: '#', sharedBy: 'Eduardo Costa', sharedAt: '19/10/2024' },
    ],
  },
  {
    id: 3,
    name: 'Galera das Estruturas de Dados',
    subject: 'Algoritmos & Estruturas de Dados',
    description: 'Preparação para entrevistas técnicas resolvendo problemas em plataformas como LeetCode e HackerRank.',
    members: 5,
    maxMembers: 10,
    imageUrl: 'https://blog.datasafer.com.br/wp-content/uploads/2024/01/Banco-de-dados.webp',
    membersList: [],
    materials: [],
  },
];