import type { User, WebsiteData } from '../types';

export const initialUsers: User[] = [
  {
    id: 'user-1',
    username: 'admin',
    passwordHash: 'admin', // In a real app, this should be a proper hash
    permissions: ['admin'],
  },
  {
    id: 'user-2',
    username: 'editor',
    passwordHash: 'editor',
    permissions: ['editor'],
  }
];

export const initialWebsiteData: WebsiteData = {
  theme: {
    primaryColor: '#2f4b26',
    secondaryColor: '#f0f4f8',
    cardColor: '#ffffff',
    font: 'roboto',
    appearance: 'light',
  },
  content: {
    home: {
      heroTitle: {
        en: 'Expert Accounting Services',
        ar: 'خدمات محاسبة متخصصة',
      },
      heroSubtitle: {
        en: 'Providing reliable and precise financial solutions to help your business grow.',
        ar: 'نقدم حلولاً مالية موثوقة ودقيقة لمساعدة عملك على النمو.',
      },
      ctaButton: {
        en: 'Explore Our Services',
        ar: 'اكتشف خدماتنا',
      },
    },
    contact: {
      title: {
        en: 'Get in Touch',
        ar: 'تواصل معنا'
      },
      address: {
        en: '123 Business Ave, Finance City, FC 45678',
        ar: '123 شارع الأعمال, مدينة المال, 45678',
      },
      email: 'contact@extremeprecision.com',
      phone: '+1 (555) 123-4567',
      socials: {
        facebook: 'https://facebook.com',
        linkedin: 'https://linkedin.com',
        x: 'https://x.com',
        instagram: 'https://instagram.com'
      }
    },
  },
  services: [
    {
      id: 'service-1',
      title: { en: 'Bookkeeping', ar: 'مسك الدفاتر' },
      brief: { en: 'Accurate and timely bookkeeping services.', ar: 'خدمات مسك دفاتر دقيقة وفي الوقت المناسب.' },
      description: { en: 'We handle all your bookkeeping needs, from recording transactions to reconciling accounts, ensuring your financial records are always up-to-date and accurate.', ar: 'نتولى جميع احتياجات مسك الدفاتر الخاصة بك، بدءًا من تسجيل المعاملات وحتى تسوية الحسابات، مما يضمن أن سجلاتك المالية محدثة ودقيقة دائمًا.' },
      imageUrl: 'https://placehold.co/600x400/5e8b7e/ffffff?text=Bookkeeping',
    },
    {
      id: 'service-2',
      title: { en: 'Tax Preparation', ar: 'إعداد الضرائب' },
      brief: { en: 'Stress-free tax preparation for individuals and businesses.', ar: 'إعداد ضرائب خالٍ من الإجهاد للأفراد والشركات.' },
      description: { en: 'Our experts navigate the complex tax laws to ensure you get the maximum refund possible. We handle federal, state, and local tax returns for all types of entities.', ar: 'يتعامل خبراؤنا مع القوانين الضريبية المعقدة لضمان حصولك على أقصى استرداد ممكن. نحن نتعامل مع الإقرارات الضريبية الفيدرالية والولائية والمحلية لجميع أنواع الكيانات.' },
      imageUrl: 'https://placehold.co/600x400/2f4b26/ffffff?text=Tax+Prep',
    },
     {
      id: 'service-3',
      title: { en: 'Financial Consulting', ar: 'الاستشارات المالية' },
      brief: { en: 'Strategic financial advice to guide your business decisions.', ar: 'نصائح مالية استراتيجية لتوجيه قرارات عملك.' },
      description: { en: 'We provide expert financial consulting to help you make informed decisions. Our services include financial planning, budgeting, forecasting, and risk management to help you achieve your financial goals.', ar: 'نقدم استشارات مالية متخصصة لمساعدتك في اتخاذ قرارات مستنيرة. تشمل خدماتنا التخطيط المالي والميزانية والتنبؤ وإدارة المخاطر لمساعدتك في تحقيق أهدافك المالية.' },
      imageUrl: 'https://placehold.co/600x400/a7c957/ffffff?text=Consulting',
    },
    {
        id: 'service-4',
        title: { en: 'Payroll Services', ar: 'خدمات الرواتب' },
        brief: { en: 'Efficient and compliant payroll processing.', ar: 'معالجة رواتب فعالة ومتوافقة مع القوانين.' },
        description: { en: 'Our payroll services ensure your employees are paid on time, every time. We handle tax withholdings, direct deposits, and compliance with all payroll regulations.', ar: 'تضمن خدمات الرواتب لدينا دفع رواتب موظفيك في الوقت المحدد دائمًا. نحن نتولى الاستقطاعات الضريبية والإيداعات المباشرة والامتثال لجميع لوائح الرواتب.' },
        imageUrl: 'https://placehold.co/600x400/6b9080/ffffff?text=Payroll',
      },
      {
        id: 'service-5',
        title: { en: 'Audit & Assurance', ar: 'التدقيق والتوكيد' },
        brief: { en: 'Independent audits to enhance credibility.', ar: 'عمليات تدقيق مستقلة لتعزيز المصداقية.' },
        description: { en: 'We conduct thorough audits to provide assurance on your financial statements, helping you meet regulatory requirements and gain the trust of investors and stakeholders.', ar: 'نجري عمليات تدقيق شاملة لتوفير تأكيد على بياناتك المالية، مما يساعدك على تلبية المتطلبات التنظيمية وكسب ثقة المستثمرين وأصحاب المصلحة.' },
        imageUrl: 'https://placehold.co/600x400/4e6e58/ffffff?text=Audit',
      },
      {
        id: 'service-6',
        title: { en: 'Business Valuation', ar: 'تقييم الأعمال' },
        brief: { en: 'Objective and credible business valuation services.', ar: 'خدمات تقييم أعمال موضوعية وذات مصداقية.' },
        description: { en: 'Whether for mergers, acquisitions, or internal planning, our valuation experts provide a clear and defensible assessment of your business\'s worth.', ar: 'سواء كان ذلك لعمليات الدمج أو الاستحواذ أو التخطيط الداخلي، يقدم خبراؤنا في التقييم تقييمًا واضحًا وقابلاً للدفاع عن قيمة عملك.' },
        imageUrl: 'https://placehold.co/600x400/8b9d78/ffffff?text=Valuation',
      },
      {
        id: 'service-7',
        title: { en: 'Forensic Accounting', ar: 'المحاسبة القضائية' },
        brief: { en: 'Investigating financial discrepancies and fraud.', ar: 'التحقيق في التناقضات المالية والاحتيال.' },
        description: { en: 'Our forensic accountants are skilled at uncovering financial irregularities. We provide litigation support, fraud investigation, and expert witness services.', ar: 'يتمتع محاسبونا القضائيون بالمهارة في الكشف عن المخالفات المالية. نحن نقدم دعمًا في التقاضي والتحقيق في الاحتيال وخدمات الشهود الخبراء.' },
        imageUrl: 'https://placehold.co/600x400/c7d1b8/000000?text=Forensic',
      },
      {
        id: 'service-8',
        title: { en: 'International Tax', ar: 'الضرائب الدولية' },
        brief: { en: 'Navigating the complexities of global tax.', ar: 'التنقل في تعقيدات الضرائب العالمية.' },
        description: { en: 'For businesses operating across borders, we offer expert guidance on international tax planning, compliance, and transfer pricing to optimize your global tax position.', ar: 'للشركات التي تعمل عبر الحدود، نقدم إرشادات متخصصة حول التخطيط الضريبي الدولي والامتثال وأسعار التحويل لتحسين وضعك الضريبي العالمي.' },
        imageUrl: 'https://placehold.co/600x400/a8bba2/ffffff?text=Global+Tax',
      },
      {
        id: 'service-9',
        title: { en: 'Succession Planning', ar: 'تخطيط التعاقب' },
        brief: { en: 'Securing the future of your business.', ar: 'تأمين مستقبل عملك.' },
        description: { en: 'We help you develop a comprehensive succession plan to ensure a smooth transition of leadership and ownership, protecting the legacy you\'ve built.', ar: 'نساعدك على تطوير خطة تعاقب شاملة لضمان انتقال سلس للقيادة والملكية، وحماية الإرث الذي بنيته.' },
        imageUrl: 'https://placehold.co/600x400/90a184/ffffff?text=Succession',
      },
  ],
  pages: [
    {
        id: 'page-1',
        slug: 'about-us',
        title: { en: 'About Us', ar: 'من نحن' },
        content: { 
            en: '<h1>Our Story</h1><p>Founded in 2010, Extreme Precision has been providing top-notch accounting services to businesses of all sizes. Our mission is to empower our clients with the financial clarity they need to succeed.</p><h2>Our Mission</h2><p>To provide exceptional accounting and financial services, enabling our clients to achieve their business objectives with confidence and clarity.</p><h2>Our Vision</h2><p>To be the most trusted and respected professional services firm recognized by our clients for delivering excellence.</p>',
            ar: '<h1>قصتنا</h1><p>تأسست شركة الدقة القصوى في عام 2010، وهي تقدم خدمات محاسبية عالية الجودة للشركات من جميع الأحجام. مهمتنا هي تمكين عملائنا بالوضوح المالي الذي يحتاجونه للنجاح.</p><h2>مهمتنا</h2><p>تقديم خدمات محاسبية ومالية استثنائية، وتمكين عملائنا من تحقيق أهداف أعمالهم بثقة ووضوح.</p><h2>رؤيتنا</h2><p>أن نكون شركة الخدمات المهنية الأكثر ثقة واحترامًا والمعترف بها من قبل عملائنا لتقديم التميز.</p>'
        },
    },
    {
        id: 'page-2',
        slug: 'contact-us',
        title: { en: 'Contact Us', ar: 'اتصل بنا' },
        content: {
            en: '<p>We would love to hear from you! Reach out via the details below, or fill out the form to send us a message directly.</p>',
            ar: '<p>يسعدنا أن نسمع منك! تواصل معنا عبر التفاصيل أدناه، أو املأ النموذج لإرسال رسالة إلينا مباشرة.</p>'
        },
    }
  ],
};