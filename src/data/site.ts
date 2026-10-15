export const site = {
  name: 'Zane Johnson',
  headline: 'I build AI systems that turn messy data into decisions.',
  school: 'Computer Science @ Notre Dame ’29',
  hometown: 'Atlanta, GA',
  availability: 'Open to Summer 2027 · data / analytics / AI engineering',
  summary:
    'I’m a CS sophomore at Notre Dame who ships working software end to end: ingestion pipelines and schemas, the agents and tools on top, and the product people actually use. I build with AI coding agents and own the architecture, the decisions (every project keeps ADRs) and the tests.',
  links: {
    github: { label: 'GitHub', handle: 'QuasiBroom14489', href: 'https://github.com/QuasiBroom14489' },
    linkedin: { label: 'LinkedIn', handle: 'zane-johnson-884a44274', href: 'https://www.linkedin.com/in/zane-johnson-884a44274' },
    email: { label: 'Email', handle: 'zjohnso4@nd.edu', href: 'mailto:zjohnso4@nd.edu' },
    resume: { label: 'Résumé', handle: 'PDF', href: '/ZaneJohnson_Resume.pdf' },
  },
};

export const experience = [
  {
    role: 'Founder & sole engineer',
    org: 'Encore',
    when: 'May 2026 – present',
    where: 'Atlanta, GA (remote)',
    points: [
      'Built a pre-launch web beta of a live-music discovery app covering two cities, with an AI pipeline that turns venue websites into published events.',
    ],
    project: 'encore',
  },
  {
    role: 'Distribution strategy consultant',
    org: 'Bon Sel Dayiti+, University of Notre Dame',
    when: 'Summer 2026',
    where: 'Haiti program, remote',
    points: [
      'Advised the project lead on distributing a fortified salt that fights lymphatic filariasis in Haiti; authored a church-based model (parish wholesale → certified vendors → physical stamp booklets → parish redemption) that works without smartphones.',
      'Led the pivot to a bouillon-cube go-to-market after aligning the factory, partnership and production leads, and delivered the constraint analysis behind it.',
    ],
  },
  {
    role: 'Data Analytics Scholar',
    org: 'Notre Dame Summer Scholars',
    when: 'July 2024',
    where: 'Notre Dame, IN',
    points: ['Cleaned raw datasets and built interactive Tableau dashboards to communicate findings.'],
  },
];

export const education = {
  school: 'University of Notre Dame',
  degree: 'B.S. Computer Science, College of Engineering',
  when: 'Expected May 2029',
  coursework: ['Data Structures', 'Computer Organization', 'Discrete Mathematics', 'Calculus III', 'Generative AI in the Wild'],
  languages: 'English (native) · Spanish (fluent)',
};
