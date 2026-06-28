/* =====================================================
   AI RECEPTIONIST — i18n Module
   Architecture:
   - translations: flat key map { en: {}, ua: {} }
   - data-i18n="key"            → sets el.textContent
   - data-i18n-placeholder="key" → sets el.placeholder
   - applyTranslations(lang)     → walks all tagged nodes
   - lang switcher button toggles + persists to localStorage
   - chat demo re-queues on lang switch (if not yet started)
   ===================================================== */

// ─────────────────────────────────────────────
// TRANSLATION MAP
// ─────────────────────────────────────────────
// ─────────────────────────────────────────────
// TRANSLATION MAP (Premium Studio Edition)
// ─────────────────────────────────────────────
const translations = {
  en: {
    // NAV
    'nav.problem':   'Inefficiencies',
    'nav.solution':  'Ecosystem Matrix',
    'nav.how':       'Architecture',
    'nav.pricing':   'Solutions & Audit',
    'nav.cta':       'Request Technical Audit',

    // HERO
    'hero.badge':           'Enterprise Automation · LLM Integrations · Custom n8n Architecture',
    'hero.headline.line1':  'Next-Gen AI Agents &',
    'hero.headline.line2':  'Autonomous Workflows',
    'hero.headline.line3':  'for Scalable Businesses',
    'hero.sub':             'We engineer high-end automation ecosystems, bridging LLMs, internal CRM/ERP infrastructure, and communication channels into unified corporate organisms.',
    'hero.cta.trial':       'Request Architecture Audit',
    'hero.cta.demo':        'Watch Live Systems',
    'hero.stat.businesses': 'optimized systems',
    'hero.stat.reply':      'operational accuracy',
    'hero.stat.setup':      'manual error reduction',

    // LOGOS
    'logos.label': 'Architecting solutions for mid-market & enterprise systems',

    // PROBLEMS (Now Focuses on Corporate Routine & Leaks)
    'problems.tag':        'Operational Bottlenecks',
    'problems.title.line1': 'Human errors and fragmented',
    'problems.title.line2': 'processes drain your revenue',
    'problems.sub':        'Modern companies bleed capital due to manual data routing, delayed front-office interactions, and disconnected legacy ledger infrastructure.',
    'problems.card1.title': 'Data Routing Disconnect',
    'problems.card1.text':  'Manual extraction from document photos and text payloads results in critical processing bottlenecks and human data entry failures.',
    'problems.card1.stat':  'Up to 25% errors',
    'problems.card2.title': 'Front-Office Leaks',
    'problems.card2.text':  'Slow response patterns in channels like Telegram and Instagram allow qualified acquisition funnels to vaporize instantly.',
    'problems.card2.stat':  '67% lost pipelines',
    'problems.card3.title': 'Siloed ERP & Core Systems',
    'problems.card3.text':  'Primary database and accounting platforms operate in technical isolation without automated real-time middleware synchronization.',
    'problems.card3.stat':  'Hours of manual sync',
    'problems.card4.title': 'High Maintenance Cost',
    'problems.card4.text':  'Allocating expensive engineering and human resource units to execute repetitive operations, data transfers, and standard customer queues.',
    'problems.card4.stat':  '3.5h/day wasted per unit',

    // SOLUTION (Transformed into 8 High-End Services Matrix)
    'solution.tag':          'Ecosystem Matrix',
    'solution.title.line1':  'Engineered Solutions &',
    'solution.title.line2':  'Core Capabilities',
    'solution.sub':          'We design customized, isolated systems that systematically eradicate routine, execute end-to-end processing, and deploy intelligence.',
    
    // The 8 Core Services
    'solution.card1.title':  '1. Intelligent Omni-Channel Support',
    'solution.card1.text':   'Autonomous conversational layers deployed across Telegram, Instagram, and web modules. Advanced intent classification, dynamic context window tracking, and real-time lead capture via Google Gemini API.',
    'solution.card2.title':  '2. AI Document Processing & OCR',
    'solution.card2.text':   'Custom vision agents parsing invoices, receipts, and acts without static layout templates. High-precision key-value extraction using multimodal LLMs, validated and pushed instantly via webhooks.',
    'solution.card3.title':  '3. Ledger & CRM Synchronization',
    'solution.card3.text':   'Bi-directional synchronization layers connecting automated webhooks with 1C, custom ERP architectures, and leading CRM engines for unified data consistency.',
    'solution.card4.title':  '4. Custom Workflow Automation',
    'solution.card4.text':   'Designing complex node logic arrays within n8n clusters. Tailored JavaScript execution layers to clean, validate, and structure abstract incoming binary data arrays.',
    'solution.card5.title':  '5. B2B Marketing Automations',
    'solution.card5.text':   'Event-driven communication stacks. Programmatic routing of incoming leads based on custom behavioral profiles and real-time triggers.',
    'solution.card6.title':  '6. Voice Synthesis & AI Agents',
    'solution.card6.text':   'Integrating fluid natural language voice nodes into processing models to handle confirmation calls and transactional updates natively.',
    'solution.card7.title':  '7. Business Intelligence Analytics',
    'solution.card7.text':   'Automated data warehouse ingestion. Feeding clean database pipelines into unified analytics layers to enable AI-driven fiscal predictive analysis.',
    'solution.card8.title':  '8. Infrastructure Architecture Audit',
    'solution.card8.text':   'Deep-dive structural mapping of existing operational workflows. Isolating architectural bottlenecks and engineering step-by-step blueprints for automation.',

    // HOW IT WORKS (Now "Architecture Execution")
    'how.tag':          'Architecture Lifecycle',
    'how.title.line1':  'From operational blueprint',
    'how.title.line2':  'to live production',
    'how.step1.title':  '1. Process Audit & Layout',
    'how.step1.text':   'We deeply map your data flows, APIs, and manual touchpoints to isolate optimal integration pathways.',
    'how.step2.title':  '2. Node Logic Engineering',
    'how.step2.text':   'Building reliable backend воркфлоу, provisioning secure context isolation, and engineering optimal LLM prompt parameters.',
    'how.step3.title':  '3. ERP/CRM Bridge Deployment',
    'how.step3.text':   'Establishing secure webhooks, integrating database endpoints (1C/CRM), and validating production pipeline reliability.',
    'how.live':         'Production System: Active Node Network',
    'how.service1':     'Document Extraction Event',
    'how.service1.price': 'Stack: n8n · Gemini',
    'how.service2':     'ERP API Handshake',
    'how.service2.price': 'Stack: Node.js · Webhooks',
    'how.service3':     'Omni-Channel Lead Routing',
    'how.service3.price': 'Stack: JavaScript · API',

    // DEMO
    'demo.tag':           'Interactive Blueprint',
    'demo.title.line1':   'Observe Autonomous Node',
    'demo.title.line2':   'Execution in Real-Time',
    'demo.sub':           'Interact with the responsive interface snippet below to evaluate processing times and context retention capabilities.',
    'demo.feat1':         'Isolated context window mechanics (Length = 2)',
    'demo.feat2':         'Multimodal data array conversion',
    'demo.feat3':         'Sanitized structured JSON output formats',
    'demo.feat4':         'Secure transactional target storage routing',
    'demo.phone.name':    'System Core Agent',
    'demo.phone.status':  'Latency: <2s · Status: Nominal',
    'demo.phone.placeholder': 'Provide data input payload...',

    // SOLUTIONS & PACKAGES (Instead of basic pricing tiers)
    'pricing.tag':          'Solutions Integration',
    'pricing.title.line1':  'Tailored enterprise pricing',
    'pricing.title.line2':  'and strategic models',
    'pricing.sub':          'No pre-made rigid templates. We scale architectures depending on daily operational transaction volumes.',
    'pricing.per':          ' base tier',
    'pricing.cta':          'Initiate Architecture Brief',
    'pricing.popular':      'High Scalability',
    'pricing.starter.name': 'Core Connect',
    'pricing.starter.desc': 'Ideal for specialized automation layers and localized workflows.',
    'pricing.starter.f1':   'Single automated communications channel',
    'pricing.starter.f2':   'Standard LLM agent provisioning',
    'pricing.starter.f3':   'Contextually restricted static FAQs',
    'pricing.starter.f4':   'Webhook target data structure delivery',
    'pricing.starter.f5':   'Standard architecture maintenance support',
    'pricing.starter.f6':   'Basic analytical endpoints',
    'pricing.starter.f7':   'Standard uptime SLA agreement',
    'pricing.pro.name':     'Ecosystem Sync',
    'pricing.pro.desc':     'Engineered for interconnected environments demanding high cross-system consistency.',
    'pricing.pro.f1':       'Omnichannel layer (Telegram, Web, Instagram)',
    'pricing.pro.f2':       'Advanced multimodal data parsers (Gemini)',
    'pricing.pro.f3':       'Custom ledger pipeline routing (1C/CRM integration)',
    'pricing.pro.f4':       'Dynamic session context window arrays',
    'pricing.pro.f5':       'Sanitized programmatic JSON transformations',
    'pricing.pro.f6':       'Comprehensive real-time system dashboards',
    'pricing.pro.f7':       'Priority incident management SLA',
    'pricing.biz.name':     'Custom Enterprise',
    'pricing.biz.desc':     'Full scale digital overhaul providing architectural monopoly and absolute custom codebases.',
    'pricing.biz.f1':       'Unrestricted high-volume node clusters',
    'pricing.biz.f2':       'Isolated neural engine finetuning parameters',
    'pricing.biz.f3':       'Multi-layered ledger, accounting, and ERP hooks',
    'pricing.biz.f4':       'Custom local n8n container provisioning',
    'pricing.biz.f5':       'Dedicated engineering unit oversight',
    'pricing.biz.f6':       '24/7 mission-critical operations security response',
    'pricing.biz.f7':       'Complete source code delivery and ownership',
    'pricing.note':         'All infrastructure systems undergo a comprehensive',
    'pricing.note.trial':   'initial validation audit',
    'pricing.note.card':    'Strict NDA protocol execution prior to deployment.',

    // TESTIMONIALS
    'testimonials.tag':        'Case Deployment Reviews',
    'testimonials.title.line1': 'Validated efficiency from',
    'testimonials.title.line2': 'our active clients',
    'testimonials.t1.text':  '"We routed our abstract financial primary documentation pipelines into their n8n/Gemini infrastructure. Manual invoice parsing errors decreased to zero, saving hundreds of accounting labor hours within weeks."',
    'testimonials.t1.name':  'Alexander V.',
    'testimonials.t1.role':  'Chief Operations Officer, FinTech Core',
    'testimonials.t2.text':  '"Our communication channels faced major drop-offs due to response lag. Deployed agents now resolve 92% of transactional questions instantly, injecting raw scalability into our pipeline management."',
    'testimonials.t2.name':  'Maxim K.',
    'testimonials.t2.role':  'Managing Partner, Nexus Logistics',
    'testimonials.t3.text':  '"Replacing classical rule-based chatbots with semantic LLM processors fundamentally transformed our workflow. System maps with 1C are flawless, maintaining pristine database isolation."',
    'testimonials.t3.name':  'Elena R.',
    'testimonials.t3.role':  'Head of Infrastructure, Retail Systems',
    'testimonials.t4.text':  '"Engineering precision at its best. They completely refactored our asynchronous data webhooks into a highly maintainable, elegant node structure. True enterprise competence."',
    'testimonials.t4.name':  'Dmitry B.',
    'testimonials.t4.role':  'Technical Director, Optima Dev',

    // FINAL CTA
    'cta.badge':             'Secure Engineering · High Availability Architecture',
    'cta.headline.line1':    'Eradicate structural routine.',
    'cta.headline.line2':    'Scale via intelligent nodes',
    'cta.sub':               'Schedule a live structural evaluation session. We will map your current bottlenecks and present a functional architecture proposal.',
    'cta.email.placeholder': 'Enter corporate email domain',
    'cta.email.btn':         'Request Systems Audit',
    'cta.email.note':        'No marketing spam. Only engineering-driven process assessment and architectural analysis.',
    'cta.email.success':     '🎉 Analysis Request Authenticated. An integration engineer will contact your team.',

    // FOOTER
    'footer.tagline':          'Engineering premium autonomous ecosystems and intelligent software bridges for modern digital enterprises.',
    'footer.col.product':      'Ecosystem',
    'footer.col.company':      'Company',
    'footer.col.legal':        'Legal',
    'footer.link.features':    'Capabilities',
    'footer.link.pricing':     'Solutions & Audit',
    'footer.link.how':         'Architecture maps',
    'footer.link.integrations':'Node Adapters',
    'footer.link.about':       'Core Engineering',
    'footer.link.blog':        'Insights',
    'footer.link.careers':     'Systems Engineering',
    'footer.link.contact':     'Secure Channel',
    'footer.link.privacy':     'Data Governance',
    'footer.link.terms':       'SLA Terms',
    'footer.link.cookies':     'Security Parameters',

    // MODAL
    'modal.title':  'Initiate Technical Briefing',
    'modal.sub':    'Provide basic system scope below to customize your deep-dive infrastructure analysis.',
    'modal.name':   'Your name / Technical Role',
    'modal.email':  'Corporate business email',
    'modal.type':   'Core infrastructure (e.g., 1C, amoCRM, Custom Database)',
    'modal.btn':    'Submit Architecture Request →',

    // TOAST / DYNAMIC
    'toast.demo':      "🎉 Briefing request registered. Protocol tracking sequence initialized.",
    'form.sending':    'Processing payload...',
    'form.cta.btn':    'Request Systems Audit',
    'form.demo.btn':   'Submit Architecture Request →',

    // CHAT DEMO CONVERSATION (Corporate Tech Translation)
    'chat.msg.1': 'System trigger: Raw invoice binary image payload received.',
    'chat.msg.2': 'Initializing Multimodal Parser Node... 🤖 Image extracted successfully via Gemini. Running automated data verification layers...',
    'chat.msg.3': 'Verify core transaction variables and clean markdown arrays.',
    'chat.msg.4': 'JavaScript validation node executed. Extracted: { Vendor: "Global Tech Logistics LLC", Invoice_No: "INV-99201", Amount: "14850.00", Currency: "USD", Category: "Infrastructure Scaling" }. Is routing approved? 📊',
    'chat.msg.5': 'Approve target data synchronization.',
    'chat.msg.6': 'Executing REST API Handshake... 🔗 Pushing target data arrays into corporate ledger tables...',
    'chat.msg.7': 'Status update check.',
    'chat.msg.8': 'Success! ✅ Transaction indexed successfully in target ERP database. Context sequence isolated. Memory cache purged. System state: Nominal.',
  },

  ua: {
    // NAV
    'nav.problem':   'Операційні втрати',
    'nav.solution':  'Матриця послуг',
    'nav.how':       'Архітектура систем',
    'nav.pricing':   'Рішення та Аудит',
    'nav.cta':       'Замовити технічний аудит',

    // HERO
    'hero.badge':           'Enterprise Автоматизація · Інтеграція LLM · Кастомна n8n Архітектура',
    'hero.headline.line1':  'ШІ-Агенти нового покоління',
    'hero.headline.line2':  'та автономні воркфлоу',
    'hero.headline.line3':  'для масштабування бізнесу',
    'hero.sub':             'Ми проєктуємо та впроваджуємо високонавантажені екосистеми автоматизації, об’єднуючи нейромережі, CRM/ERP інфраструктуру та канали комунікації в єдиний керований організм.',
    'hero.cta.trial':       'Замовити архітектурний аудит',
    'hero.cta.demo':        'Дивитися живі системи',
    'hero.stat.businesses': 'оптимізованих систем',
    'hero.stat.reply':      'операційна точність',
    'hero.stat.setup':      'зниження людських помилок',

    // LOGOS
    'logos.label': 'Проєктуємо системні рішення для середнього бізнесу та корпорацій',

    // PROBLEMS
    'problems.tag':          'Операційні руйнування',
    'problems.title.line1':  'Людські помилки та хаос',
    'problems.title.line2':  'спалюють ваш прибуток щодня',
    'problems.sub':          'Сучасний бізнес втрачає капітал через ручне перенесення даних, довгі відповіді фронт-офісу та відсутність синхронізації між обліковими системами.',
    'problems.card1.title':  'Розрив у маршрутизації даних',
    'problems.card1.text':   'Ручне витягування даних із фото документів та текстових повідомлень створює критичні затримки та призводить до помилок введення.',
    'problems.card1.stat':   'До 25% помилок у даних',
    'problems.card2.title':  'Витік у фронт-офісі',
    'problems.card2.text':   'Повільна обробка запитів у месенджерах (Telegram, Instagram) змушує гарячі ліди миттєво йти до конкурентів.',
    'problems.card2.stat':   '67% втрачених лідів',
    'problems.card3.title':  'Ізольованість CRM та ERP',
    'problems.card3.text':   'Облікові платформи та бази даних працюють у технічній ізоляції, вимагаючи годин ручної синхронізації щодня.',
    'problems.card3.stat':   'Години ручної звірки',
    'problems.card4.title':  'Висока вартість рутини',
    'problems.card4.text':   'Витрата дорогих інженерних та людських ресурсів на виконання повторюваних операцій, замість масштабування бізнесу.',
    'problems.card4.stat':   '3.5 год/день витрачено впусту',

    // SOLUTION
    'solution.tag':          'Матриця можливостей',
    'solution.title.line1':  'Інженерні рішення та',
    'solution.title.line2':  'інтелектуальні системи',
    'solution.sub':          'Ми розробляємо кастомні, ізольовані системи, які системно ліквідують рутину, автоматизують наскрізну обробку даних та впроваджують ШІ під ключ.',
    
    // The 8 Core Services (UA)
    'solution.card1.title':  '1. Інтелектуальний Omni-Channel Support',
    'solution.card1.text':   'Автономні ШІ-агенти для Telegram, Instagram та веб-інтерфейсів. Гнучка класифікація інтенту, контроль вікон контексту та миттєва кваліфікація лідів через Google Gemini API.',
    'solution.card2.title':  '2. Автоматизація документообігу та OCR',
    'solution.card2.text':   'Кастомні зорові агенти для розпізнавання рахунків, чеків та актів без статичних шаблонів. Точне вилучення ключ-значення мультимодальними LLM із валідацією через вебуки.',
    'solution.card3.title':  '3. Синхронізація облікових систем та CRM',
    'solution.card3.text':   'Двосторонні шари інтеграції, що надійно зв’язують автоматизовані вебхуки з 1С, ERP-системами та CRM-платформами для повної консистентності даних.',
    'solution.card4.title':  '4. Кастомна автоматизація процесів',
    'solution.card4.text':   'Проєктування складних логічних ланцюжків і воркфлоу всередині n8n-кластерів. Написання JS/Node.js скриптів для фільтрації, очищення та структурування абстрактних даних.',
    'solution.card5.title':  '5. AI Lead Generation & Маркетинг-маршрутизація',
    'solution.card5.text':   'Подієво-орієнтовані системи обробки лідів. Програмоване розливання вхідного трафіку на основі поведінкових профілів користувачів у реальному часі.',
    'solution.card6.title':  '6. Голосові ШІ-Агенти нового покоління',
    'solution.card6.text':   'Інтеграція природних мовних вузлів у ланцюжки обробки для автоматизації підтвердження угод, гарячих обдзвонів та сповіщень.',
    'solution.card7.title':  '7. Business Intelligence та ШІ-Аналітика',
    'solution.card7.text':   'Автоматичний збір метрик у сховища даних. Перетворення сирого логування на інтерактивні дашборди з фінансовим прогнозуванням на базі ШІ.',
    'solution.card8.title':  '8. Технологічний аудит та ІТ-Консалтинг',
    'solution.card8.text':   'Глибоке структурне картування діючих процесів компанії. Пошук вузьких місць та розробка покрокової інженерної карти цифрової трансформації.',

    // HOW IT WORKS
    'how.tag':          'Життєвий цикл розробки',
    'how.title.line1':  'Від архітектурної карти',
    'how.title.line2':  'до запуску в production',
    'how.step1.title':  '1. Аудит та моделювання процесу',
    'how.step1.text':   'Ми детально аналізуємо ваші потоки даних, інтерфейси та АРІ для побудови оптимальної інтеграційної карти.',
    'how.step2.title':  '2. Інженерія вузлів логіки',
    'how.step2.text':   'Розгортання стабільних бекенд-воркфлоу, ізоляція контексту безпеки та тонке налаштування систем промптів для LLM.',
    'how.step3.title':  '3. Проєктування мостів ERP/CRM',
    'how.step3.text':   'Створення захищених вебуків, підключення кінцевих точок баз даних (1С/CRM) та комплексне тестування стабільності шлюзів.',
    'how.live':         'Production інфраструктура: Активна мережа вузлів',
    'how.service1':     'Обробка первинного документа',
    'how.service1.price': 'Стек: n8n · Gemini LLM',
    'how.service2':     'Синхронізація з ERP API',
    'how.service2.price': 'Стек: Node.js · Webhooks',
    'how.service3':     'Маршрутизація омніканального ліда',
    'how.service3.price': 'Стек: JavaScript · REST API',

    // DEMO
    'demo.tag':           'Інтерактивний симулятор',
    'demo.title.line1':   'Спостерігайте за автономною',
    'demo.title.line2':   'роботою вузлів логіки',
    'demo.sub':           'Протестуйте інтерфейс симулятора нижче, щоб оцінити швидкість парсингу, валідації даних та утримання контексту ШІ-агентом.',
    'demo.feat1':         'Ізольоване керування вікнами контексту (Length = 2)',
    'demo.feat2':         'Мультимодальна конверсія абстрактних масивів даних',
    'demo.feat3':         'Генерація очищеного структурованого JSON-виводу',
    'demo.feat4':         'Безпечний експорт у цільові сховища даних',
    'demo.phone.name':    'Ядро Системи (Agent Core)',
    'demo.phone.status':  'Затримка: <2с · Стан: Номінальний',
    'demo.phone.placeholder': 'Введіть масив даних для обробки...',

    // PRICING
    'pricing.tag':          'Інтеграційні рішення',
    'pricing.title.line1':  'Преміальні моделі розробки',
    'pricing.title.line2':  'та стратегічний консалтинг',
    'pricing.sub':          'Ми не використовуємо жорсткі шаблони. Архітектура та вартість адаптуються під щоденний обсяг транзакцій та операцій бізнесу.',
    'pricing.per':          ' базовий рівень',
    'pricing.cta':          'Ініціювати архітектурний бриф',
    'pricing.popular':      'Високе масштабування',
    'pricing.starter.name': 'Core Connect',
    'pricing.starter.desc': 'Ідеально для спеціалізованих ізольованих шарів автоматизації та локальних воркфлоу.',
    'pricing.starter.f1':   'Один автоматизований канал комунікації',
    'pricing.starter.f2':   'Стандартне розгортання LLM-агента',
    'pricing.starter.f3':   'Контекстно-обмежена база знань FAQ',
    'pricing.starter.f4':   'Маршрутизація структурованих даних через webhook',
    'pricing.starter.f5':   'Технічна підтримка стабільності інфраструктури',
    'pricing.starter.f6':   'Базові аналітичні кінцеві точки (endpoints)',
    'pricing.starter.f7':   'Стандартний регламент SLA',
    'pricing.pro.name':     'Ecosystem Sync',
    'pricing.pro.desc':     'Проєктується для зв’язаних середовищ, що вимагають високої консистентності даних між системами.',
    'pricing.pro.f1':       'Омніканальний інтерфейс (Telegram, Web, Instagram)',
    'pricing.pro.f2':       'Розширені мультимодальні парсери даних (Gemini)',
    'pricing.pro.f3':       'Кастомна синхронізація з обліковими системами (1С/CRM)',
    'pricing.pro.f4':       'Динамічні масиви сесійних вікон контексту',
    'pricing.pro.f5':       'Програмне очищення та JSON-трансформація виводу',
    'pricing.pro.f6':       'Комплексні дашборди моніторингу систем у реальному часі',
    'pricing.pro.f7':       'Пріоритетне реагування на інциденти за SLA',
    'pricing.biz.name':     'Custom Enterprise',
    'pricing.biz.desc':     'Повна цифрова перебудова бізнес-операцій компанії з передачею ексклюзивних прав на код.',
    'pricing.biz.f1':       'Необмежені високонавантажені кластери нод',
    'pricing.biz.f2':       'Ізольоване донавчання нейромережевих моделей під бізнес',
    'pricing.biz.f3':       'Багаторівневі інтеграційні шлюзи ERP, CRM та бухгалтерії',
    'pricing.biz.f4':       'Розгортання локальних ізольованих контейнерів n8n',
    'pricing.biz.f5':       'Виділена команда інженерів для моніторингу систем',
    'pricing.biz.f6':       'Критична підтримка операцій 24/7 та кібербезпека',
    'pricing.biz.f7':       'Повна передача вихідного коду (Source Code Ownership)',
    'pricing.note':         'Усі інфраструктурні системи проходять обов’язковий',
    'pricing.note.trial':   'первинний технічний аудит',
    'pricing.note.card':    'Підписання суворого протоколу NDA перед початком проєктування.',

    // TESTIMONIALS
    'testimonials.tag':        'Результати впровадження',
    'testimonials.title.line1': 'Досвід лідерів ринку,',
    'testimonials.title.line2': 'що масштабували операції',
    'testimonials.t1.text':  '«Ми перевели обробку сирих фінансових документів на їхню інфраструктуру n8n/Gemini. Помилки ручного парсингу зникли повністю, звільнивши сотні годин роботи бухгалтерів уже за перший місяць.»',
    'testimonials.t1.name':  'Олександр В.',
    'testimonials.t1.role':  'Операційний директор, FinTech Core',
    'testimonials.t2.text':  '«Наші канали продажів втрачали ліди через затримку відповідей. Розгорнуті ШІ-агенти зараз автоматично закривають 92% щоденних транзакційних питань, забезпечивши стабільне масштабування.»',
    'testimonials.t2.name':  'Максим К.',
    'testimonials.t2.role':  'Керуючий партнер, Nexus Logistics',
    'testimonials.t3.text':  '«Заміна класичних застарілих ботів на семантичні LLM-процесори повністю змінила бізнес. Інтеграція з 1С працює бездоганно, підтримуючи абсолютну ізоляцію критичних даних.»',
    'testimonials.t3.name':  'Олена Р.',
    'testimonials.t3.role':  'Директор з інфраструктури, Retail Systems',
    'testimonials.t4.text':  '«Інженерна точність найвищого рівня. Вони повністю рефакторили наші асинхронні вебхуки у відмовостійку, красиву та масштабовану структуру нод. Справжня Enterprise компетенція.»',
    'testimonials.t4.name':  'Дмитро Б.',
    'testimonials.t4.role':  'Технічний директор, Optima Dev',

    // FINAL CTA
    'cta.badge':             'Secure Engineering · High Availability Architecture',
    'cta.headline.line1':    'Ліквідуйте системну рутину.',
    'cta.headline.line2':    'Масштабуйте бізнес через ШІ',
    'cta.sub':               'Запишіться на сесію технічної оцінки процесів. Ми проаналізуємо ваші поточні вузькі місця та підготуємо функціональну карту автоматизації.',
    'cta.email.placeholder': 'Введіть корпоративний email домен',
    'cta.email.btn':         'Замовити технічний аудит',
    'cta.email.note':        'Ніякого спаму. Тільки інженерний аналіз інфраструктури та карта оптимізації бізнес-процесів.',
    'cta.email.success':     '🎉 Запит на аудит авторизовано. Інтеграційний інженер зв’яжеться з вашою командою.',

    // FOOTER
    'footer.tagline':          'Проєктуємо преміальні автономні екосистеми та інтелектуальні програмні шлюзи для сучасного цифрового бізнесу.',
    'footer.col.product':      'Екосистема',
    'footer.col.company':      'Компанія',
    'footer.col.legal':        'Правові норми',
    'footer.link.features':    'Можливості',
    'footer.link.pricing':     'Рішення та Аудит',
    'footer.link.how':         'Карти архітектури',
    'footer.link.integrations':'Системні адаптери',
    'footer.link.about':       'Інженерне ядро',
    'footer.link.blog':        'Технологічні інсайти',
    'footer.link.careers':     'Вакансії (Systems Eng)',
    'footer.link.contact':     'Захищений канал зв’язку',
    'footer.link.privacy':     'Управління даними',
    'footer.link.terms':       'Умови SLA',
    'footer.link.cookies':     'Параметри безпеки',

    // MODAL
    'modal.title':  'Ініціювати технічний брифінг',
    'modal.sub':    'Вкажіть базові параметри інфраструктури для підготовки глибокого аналізу автоматизації.',
    'modal.name':   'Ваше ім’я / Технічна роль',
    'modal.email':  'Корпоративний business email',
    'modal.type':   'Ключові системи (наприклад, 1С, CRM, кастомні БД)',
    'modal.btn':    'Надіслати архітектурний запит →',

    // TOAST / DYNAMIC
    'toast.demo':      "🎉 Запит на брифінг зареєстровано. Запущено трекінг-ідентифікатор протоколу.",
    'form.sending':    'Обробка даних payload...',
    'form.cta.btn':    'Замовити технічний аудит',
    'form.demo.btn':   'Надіслати архітектурний запит →',

    // CHAT DEMO CONVERSATION
    // CHAT DEMO CONVERSATION (Корпоративний приклад)
    'chat.msg.1': 'System trigger: Отримано бінарний файл зображення первинного документа.',
    'chat.msg.2': 'Запуск Multimodal Parser Node... 🤖 Зображення успішно зчитано через Gemini. Запуск шарів автоматичної перевірки даних...',
    'chat.msg.3': 'Перевірити ключові змінні транзакції та очистити масиви markdown.',
    'chat.msg.4': 'JavaScript-вузол валідації виконано. Знайдено: { Постачальник: "Глобал Тек Логістікс", Рахунок: "№ INV-99201", Сума: "14850.00", Валюта: "USD", Категорія: "Масштабування інфраструктури" }. Схвалюєте маршрутизацію? 📊',
    'chat.msg.5': 'Схвалити синхронізацію з цільовою базою даних.',
    'chat.msg.6': 'Виконується REST API Handshake... 🔗 Перенесення структурованих масивів у таблиці обліку корпоративної ERP...',
    'chat.msg.7': 'Перевірити статус виконання.',
    'chat.msg.8': 'Успіх! ✅ Транзакцію проіндексовано в базі даних ERP. Поточну сесію контексту ізольовано. Кеш пам’яті очищено. Стан системи: Номінальний.',
   }
};
// ─────────────────────────────────────────────
// CORE ENGINE
// ─────────────────────────────────────────────

/**
 * Look up a translation key for the active language.
 * Falls back to English, then to the key itself.
 */
function t(key) {
  const lang = i18n.currentLang;
  return translations[lang]?.[key] ?? translations.en[key] ?? key;
}

/**
 * Apply all translations to the DOM.
 * Walks [data-i18n] and [data-i18n-placeholder] nodes.
 */
function applyTranslations(lang) {
  // Update <html lang="...">
  document.documentElement.lang = lang;

  // Text content nodes
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    const value = translations[lang]?.[key] ?? translations.en[key];
    if (value !== undefined) el.textContent = value;
  });

  // Placeholder attributes
  document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
    const key = el.getAttribute('data-i18n-placeholder');
    const value = translations[lang]?.[key] ?? translations.en[key];
    if (value !== undefined) el.placeholder = value;
  });

  // Update page title
  document.title = lang === 'ua'
    ? 'Axiom Flow — ШІ-співробітник для вашого бізнесу 24/7'
    : 'Axiom Flow — 24/7 AI Employee for Your Business';

  // Update meta description
  const metaDesc = document.querySelector('meta[name="description"]');
  if (metaDesc) {
    metaDesc.content = lang === 'ua'
      ? 'Axiom Flow автоматично відповідає в Instagram, Telegram та на сайті, записує клієнтів і збирає контакти — цілодобово, без перерв.'
      : 'Axiom Flow automatically replies to Instagram, Telegram and website messages, books appointments, and collects customer contacts — 24/7, without breaks.';
  }
}

// ─────────────────────────────────────────────
// PUBLIC API — exposed to main.js
// ─────────────────────────────────────────────
const i18n = {
  currentLang: 'en',

  /** Read saved language or default to 'en' */
  init() {
    const saved = localStorage.getItem('lang');
    this.currentLang = (saved === 'ua' || saved === 'en') ? saved : 'en';
    applyTranslations(this.currentLang);
    this._updateSwitcherLabel();
  },

  /** Switch language, persist, and re-apply */
  toggle() {
    this.currentLang = this.currentLang === 'en' ? 'ua' : 'en';
    localStorage.setItem('lang', this.currentLang);
    applyTranslations(this.currentLang);
    this._updateSwitcherLabel();
    this._dispatchChange();
  },

  /** Expose t() globally for main.js */
  t,

  _updateSwitcherLabel() {
    const label = document.getElementById('lang-label');
    if (label) label.textContent = this.currentLang === 'en' ? 'UA' : 'EN';
  },

  _dispatchChange() {
    // main.js listens to this to update chat and toast strings
    window.dispatchEvent(new CustomEvent('langchange', { detail: { lang: this.currentLang } }));
  }
};

// ─────────────────────────────────────────────
// INIT — scripts are at end of <body>, DOM is ready
// ─────────────────────────────────────────────
i18n.init();

const _langBtn = document.getElementById('lang-switcher');
if (_langBtn) {
  _langBtn.addEventListener('click', () => i18n.toggle());
}