import { Dev } from "@/core/types/developer.interface";

export const environment = {
    production: false,
    apiUrl: 'https://api.movimentoinovatu.com.br'
};
export const keyRecaptcha = {
  production: false,
  key:'6LeMqTgsAAAAAKl1q3ubW-7lD2hN9aPR90RmiHJh'
};

export const desenvolvedores: Dev[] = [
    {
      name: 'Riquelmy Miyasawa',
      role: 'Scrum Master',
      description: 'Gestão de equipe e liderança geral do projeto.',
      photoUrl: 'Riquelmy Miyasawa',
      social: { linkedin: 'https://www.linkedin.com/in/riquelmy-miyasawa-borges/' }
    },
    {
      name: 'Pedro Borges Palma',
      role: 'Co-Scrum Master',
      description: 'Auxilio em gestão de equipe e articulação de resultados.',
      photoUrl: 'Pedro Borges',
      social: { instagram: 'https://www.instagram.com/pedrobp___' }
    },
    {
      name: 'Arthur Gonçalves Reis',
      role: 'Líder Técnico Back-end',
      description: 'Responsável pela gestão da equipe designada, correção de erros e controle de qualidade.',
      photoUrl: 'Arthur Reis',
      social: { linkedin: 'https://www.linkedin.com/in/arthur-gon%C3%A7alves-reis-b5a720371' }
    },
    {
      name: 'Dionatas Tomaz',
      role: 'Líder Técnico Front-end',
      description: 'Responsável pela gestão da equipe designada, correção de erros e controle de qualidade.',
      photoUrl: 'Dionatas Tomaz',
      social: { github: 'https://github.com/dionatas-thomaz' }
    },
    {
      name: 'Isaac Nunes',
      role: 'Líder Téc. Documentação',
      description: 'Preenchimento da documentação, recolhimento de anexos e mídias necessárias.',
      photoUrl: 'Isaac Nunes',
      social: { instagram: 'https://www.instagram.com/isaac_nunes8617/' }
    },
    {
      name: 'Lucas Guirra',
      role: 'Desenvolvedor Front-end',
      description: 'Tela de Ecossistemas e revisão de possíveis erros de estilização no sistema.',
      photoUrl: 'Lucas Guirra',
      social: { github: 'https://github.com/lucas-guirra' }
    },
    {
      name: 'Tainara Pereira Roquete',
      role: 'Desenvolvedora Front-end',
      description: 'Responsável pela implementação e design da Tela de Portal de Notícias.',
      photoUrl: 'Tainara Pereira',
      social: { github: 'https://github.com/tainxra' }
    },
    {
      name: 'Matheus Cruvinel',
      role: 'Desenvolvedor Front-end',
      description: 'Gerenciamento de Types e Services da aplicação.',
      photoUrl: 'Matheus Cruvinel',
      social: {}
    },
    {
      name: 'Matheus Camargos',
      role: 'Desenvolvedor Back-end',
      description: 'Implementação de testes no backend e organização da documentação.',
      photoUrl: 'Matheus Camargos',
      social: { instagram: 'https://www.instagram.com/matheus_camargos__' }
    },
    {
      name: 'Carlos Eduardo Santiago',
      role: 'Desenvolvedor Back-end',
      description: 'Desenvolvimento das funcionalidades do sistema de Notícias.',
      photoUrl: 'Carlos Eduardo',
      social: { github: 'https://github.com/kadu-santiago' }
    },
    {
      name: 'Kauan Santos Silva',
      role: 'Desenvolvedor Backup',
      description: 'Suporte a toda a equipe de acordo com as demandas solicitadas.',
      photoUrl: 'Kauan Santos',
      social: { instagram: 'https://www.instagram.com/kauan.ursino' }
    },
    {
      name: 'Carlos Teixeira',
      role: 'Desenvolvedor Front-end',
      description: 'Desenvolvimento da Tela Homepage e suas funcionalidades.',
      photoUrl: 'Carlos Teixeira',
      social: { github: 'https://github.com/Carlo5-Ed' }
    },
    {
      name: 'Arthur Eduardo Ferreira',
      role: 'Desenvolvedor Back-end',
      description: 'Desenvolvimento das funcionalidades do sistema de Agendamentos.',
      photoUrl: 'Arthur Eduardo',
      social: { github: 'https://github.com/arthurfxd1' }
    },
    {
      name: 'Daniel Gonçalves',
      role: 'Documentação e Testes',
      description: 'Suporte a documentação e execução de testes de uso da plataforma.',
      photoUrl: 'Daniel Reis',
      social: { website: 'https://daniel-goncalves-portfolio-profis-8f02dbdb.base44.app/' }
    },
    {
      name: 'Natália Dias Queiroz',
      role: 'Desenvolvedora Back-end',
      description: 'Desenvolvimento das funcionalidades do sistema de Eventos.',
      photoUrl: 'Natalia Dias',
      social: { linkedin: 'https://www.linkedin.com/in/nat-dias/' }
    },
  ];
